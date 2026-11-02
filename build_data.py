"""Compile the Siege Engineers AoE2 tech tree into one file the page can filter."""

from __future__ import annotations

import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / "cache"
OUT = ROOT / "web" / "data" / "tree.json"
RAW = "https://raw.githubusercontent.com/SiegeEngineers/aoe2techtree/master"
AGES = [
    {"id": 1, "name": "Dark Age", "stringId": 4201},
    {"id": 2, "name": "Feudal Age", "stringId": 4202},
    {"id": 3, "name": "Castle Age", "stringId": 4203},
    {"id": 4, "name": "Imperial Age", "stringId": 4204},
]
LOCALES = ("en", "ru", "pl")
TAG = re.compile(r"<[^>]+>")
UNIQUE_TYPES = {
    "UniqueUnit",
    "UniqueTech",
    "UniqueBuilding",
    "RegionalUnit",
    "RegionalTech",
    "RegionalBuilding",
}
FIELD = {"Unit": "units", "Tech": "techs", "Building": "buildings"}
STATS = {}


def download(url: str, dest: Path) -> bytes:
    if dest.exists() and dest.stat().st_size > 100:
        return dest.read_bytes()
    dest.parent.mkdir(parents=True, exist_ok=True)
    last_error = None
    for attempt in range(4):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "aoe2-tech-tree"})
            with urllib.request.urlopen(request, timeout=90) as response:
                payload = response.read()
            if not payload:
                raise RuntimeError(f"empty response for {url}")
            dest.write_bytes(payload)
            return payload
        except Exception as error:  # noqa: BLE001 - retry network failures
            last_error = error
            time.sleep(1 + attempt)
    raise RuntimeError(f"failed to download {url}: {last_error}")


def load_json(url: str, dest: Path):
    return json.loads(download(url, dest).decode("utf-8-sig"))


def clean(value) -> str:
    text = TAG.sub("", str(value or ""))
    text = text.replace("\\n", " ").replace("\n", " ").replace("\r", " ")
    return " ".join(text.split())


def raw_string(strings: dict, string_id) -> str:
    if string_id is None:
        return ""
    value = strings.get(str(string_id), strings.get(string_id))
    if isinstance(value, dict):
        value = value.get("string") or value.get("text") or value.get("name") or ""
    return str(value or "")


def string_value(strings: dict, string_id) -> str:
    return clean(raw_string(strings, string_id))


def use_type_of(item: dict) -> str:
    prefix = str(item.get("id", "")).split("_")[0]
    if prefix in FIELD:
        return prefix
    raw = item.get("use_type") or ""
    if raw in FIELD:
        return raw
    return "Unit"


def kind_of(node_type: str, use: str) -> str:
    if node_type.startswith("Unique"):
        return "unique"
    if node_type.startswith("Regional"):
        return "regional"
    if use == "Tech":
        return "tech"
    if use == "Building":
        return "building"
    return "unit"


def age_of(item: dict) -> int:
    try:
        age = int(item.get("age_id") or 0)
    except (TypeError, ValueError):
        age = 0
    if age in (1, 2, 3, 4):
        return age
    try:
        row = int(item.get("row") or 0)
    except (TypeError, ValueError):
        row = 0
    return min(4, max(1, row // 2 + 1))


def as_int_set(values) -> set[int]:
    result = set()
    for value in values or []:
        try:
            result.add(int(value))
        except (TypeError, ValueError):
            continue
    return result


def meta_from(item: dict) -> dict:
    use = use_type_of(item)
    node_id = int(item["node_id"])
    node_type = item.get("node_type") or ""
    meta = {
        "key": f"{use}:{node_id}",
        "nodeId": node_id,
        "useType": use,
        "kind": kind_of(node_type, use),
        "nodeType": node_type,
        "name": clean(item.get("name")) or f"{use} {node_id}",
        "stringId": int(item["name_string_id"]) if item.get("name_string_id") is not None else None,
        "pictureIndex": int(item["picture_index"]) if item.get("picture_index") is not None else None,
        "age": age_of(item),
        "buildingId": int(item["building_id"]) if item.get("building_id") is not None else None,
    }
    if use == "Tech" and item.get("help_string_id") is not None:
        meta["helpId"] = int(item["help_string_id"]) - 79000
    stats = compact_stats(use, node_id)
    if stats:
        meta["stats"] = stats
    return meta


def compact_stats(use: str, node_id: int) -> dict | None:
    table = STATS.get(use) or {}
    item = table.get(str(node_id))
    if not isinstance(item, dict):
        return None
    stats = {}
    cost = {}
    for resource, amount in (item.get("Cost") or {}).items():
        try:
            value = int(amount)
        except (TypeError, ValueError):
            continue
        if value:
            cost[resource.lower()] = value
    if cost:
        stats["cost"] = cost
    numeric = (
        ("HP", "hp"),
        ("Attack", "attack"),
        ("MeleeArmor", "melee"),
        ("PierceArmor", "pierce"),
        ("Range", "range"),
        ("Speed", "speed"),
        ("LineOfSight", "los"),
        ("ReloadTime", "reload"),
        ("AccuracyPercent", "accuracy"),
        ("TrainTime", "train"),
        ("ResearchTime", "research"),
        ("GarrisonCapacity", "garrison"),
    )
    for source, dest in numeric:
        if source not in item or item[source] in (None, ""):
            continue
        try:
            value = float(item[source])
        except (TypeError, ValueError):
            continue
        if dest in {"attack", "range", "speed", "reload", "garrison", "train", "research"} and value <= 0:
            continue
        if dest == "accuracy" and (value <= 0 or value >= 100 or stats.get("range", 0) <= 0):
            continue
        stats[dest] = int(value) if dest not in {"speed", "reload"} and value == int(value) else value
    if not stats.get("attack"):
        stats.pop("range", None)
        stats.pop("reload", None)
        stats.pop("accuracy", None)
    return stats or None


def normalize_grid(grid) -> list[list]:
    rows = []
    width = 0
    for row in grid or []:
        cells = list(row or [])
        width = max(width, len(cells))
        rows.append(cells)
    for row in rows:
        if len(row) < width:
            row.extend([None] * (width - len(row)))
    return rows


def ensure_cell(grid: list[list], row_index: int, col_index: int) -> None:
    width = max([col_index + 1, *[len(row) for row in grid], 1])
    while len(grid) <= row_index:
        grid.append([None] * width)
    for row in grid:
        if len(row) < width:
            row.extend([None] * (width - len(row)))


def blank_column(building: dict) -> dict:
    return {
        "buildingId": int(building["node_id"]),
        "grid": normalize_grid(building.get("grid")),
        "extras": [],
    }


def prefer_building(current: dict | None, candidate: dict) -> dict:
    if current is None:
        return candidate
    current_missing = current.get("node_status") == "NotAvailable"
    candidate_missing = candidate.get("node_status") == "NotAvailable"
    if current_missing and not candidate_missing:
        return candidate
    return current


def owners_of(meta: dict, civs: list[dict]) -> list[str]:
    field = FIELD[meta["useType"]]
    return [civ["name"] for civ in civs if meta["nodeId"] in civ[field]]


def owner_keys(meta: dict, civs: list[dict]) -> list[str]:
    field = FIELD[meta["useType"]]
    return [civ["key"] for civ in civs if meta["nodeId"] in civ[field]]


def group_key(keys: list[str]) -> str:
    if len(keys) == 1:
        return keys[0]
    return "Regional"


def string_ids(columns: list[dict], groups: list[dict], civs: list[dict]) -> tuple[set[int], set[int]]:
    found = {age["stringId"] for age in AGES}
    help_ids = set()

    def add(node: dict) -> None:
        if node.get("stringId"):
            found.add(int(node["stringId"]))
        for field in ("helpId", "helpStringId"):
            if node.get(field):
                found.add(int(node[field]))
                help_ids.add(int(node[field]))

    for civ in civs:
        add(civ)
    for column in columns:
        add(column["building"])
        for node in [*column["cells"], *column["extras"]]:
            add(node)
    for group in groups:
        for node in group["items"]:
            add(node)
    return found, help_ids


def localized_strings(locale_tables: dict, ids: set[int], help_ids: set[int]) -> dict:
    english = locale_tables["en"]
    output = {}
    for code, table in locale_tables.items():
        picked = {}
        for string_id in sorted(ids):
            read = raw_string if string_id in help_ids else string_value
            text = read(table, string_id) or read(english, string_id)
            if text:
                picked[str(string_id)] = text
        output[code] = picked
    return output


def main() -> None:
    data = load_json(f"{RAW}/data/data.json", CACHE / "data.json")
    locale_tables = {
        code: load_json(
            f"{RAW}/data/locales/{code}/strings.json",
            CACHE / "locales" / code / "strings.json",
        )
        for code in LOCALES
    }
    strings = locale_tables["en"]
    global STATS
    STATS = data.get("data") or {}
    civ_raw = data.get("civs") or {}
    if not isinstance(civ_raw, dict) or not civ_raw:
        raise SystemExit(f"unexpected data.json shape, top keys: {list(data)[:12]}")

    civs = []
    for key, entry in civ_raw.items():
        if not isinstance(entry, dict):
            continue
        name = string_value(strings, entry.get("name_string_id")) or clean(key)
        civs.append(
            {
                "key": key,
                "name": name,
                "stringId": int(entry["name_string_id"]) if entry.get("name_string_id") is not None else None,
                "helpStringId": int(entry["help_string_id"]) if entry.get("help_string_id") is not None else None,
                "units": as_int_set(entry.get("Unit")),
                "techs": as_int_set(entry.get("Tech")),
                "buildings": as_int_set(entry.get("Building")),
            }
        )
    civs.sort(key=lambda civ: civ["name"].casefold())
    print(f"civilizations in data.json: {len(civs)}")

    def fetch_tree(civ: dict):
        filename = f"{civ['key'].upper()}.json"
        dest = CACHE / "trees" / filename
        try:
            tree = load_json(f"{RAW}/data/trees/{filename}", dest)
        except Exception as error:  # noqa: BLE001
            return civ["key"], None, str(error)
        return civ["key"], tree, None

    trees = {}
    missing = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(fetch_tree, civ) for civ in civs]
        for future in as_completed(futures):
            key, tree, error = future.result()
            if tree is None:
                missing.append(f"{key}: {error}")
            else:
                trees[key] = tree
    if missing:
        print("missing tree files:")
        for line in missing:
            print(" ", line)
    if "Britons" not in trees:
        raise SystemExit("Britons tree is required as the shared layout")
    print(f"tree files: {len(trees)}")

    items_by_id = {}
    buildings_by_id = {}
    for tree in trees.values():
        for building in tree.get("buildings") or []:
            buildings_by_id[int(building["node_id"])] = meta_from(building)
            for row in building.get("grid") or []:
                for cell in row or []:
                    if cell:
                        items_by_id.setdefault(cell, None)
        for item in tree.get("units_techs") or []:
            items_by_id[item["id"]] = meta_from(item)
        for building in tree.get("buildings") or []:
            buildings_by_id[int(building["node_id"])] = meta_from(building)

    unresolved = [item_id for item_id, meta in items_by_id.items() if meta is None]
    if unresolved:
        print(f"grid ids without metadata: {len(unresolved)}")

    base_ids = {int(building["node_id"]) for building in trees["Britons"].get("buildings") or []}
    columns = []
    column_by_id = {}
    placed_ids = set()
    used_keys = set()

    def mark_grid(column: dict) -> None:
        for row in column["grid"]:
            for cell in row:
                if cell:
                    placed_ids.add(cell)

    for building in trees["Britons"].get("buildings") or []:
        column = blank_column(building)
        columns.append(column)
        column_by_id[column["buildingId"]] = column
        mark_grid(column)

    incoming = {}
    for civ_key in sorted(trees):
        if civ_key == "Britons":
            continue
        for building in trees[civ_key].get("buildings") or []:
            building_id = int(building["node_id"])
            if building_id in base_ids or building_id in column_by_id:
                column = column_by_id.get(building_id)
                if column is None:
                    continue
                for row_index, row in enumerate(building.get("grid") or []):
                    for col_index, cell in enumerate(row or []):
                        if not cell or cell in placed_ids:
                            continue
                        ensure_cell(column["grid"], row_index, col_index)
                        if column["grid"][row_index][col_index] is None:
                            column["grid"][row_index][col_index] = cell
                            placed_ids.add(cell)
            else:
                incoming[building_id] = prefer_building(incoming.get(building_id), building)

    for building_id in sorted(incoming, key=lambda bid: buildings_by_id.get(bid, {}).get("name", "")):
        column = blank_column(incoming[building_id])
        columns.append(column)
        column_by_id[building_id] = column
        mark_grid(column)

    overflow = []
    for item_id, meta in items_by_id.items():
        if not meta or item_id in placed_ids:
            continue
        overflow.append(meta)

    def take(meta: dict | None) -> dict | None:
        if not meta or meta["key"] in used_keys:
            return None
        used_keys.add(meta["key"])
        return meta

    public_columns = []
    for column in columns:
        building = take(buildings_by_id.get(column["buildingId"]))
        if building is None:
            continue
        cells = []
        width = max((len(row) for row in column["grid"]), default=0)
        for row_index, row in enumerate(column["grid"]):
            for col_index, cell in enumerate(row):
                meta = take(items_by_id.get(cell) if cell else None)
                if meta is None:
                    continue
                cells.append({**meta, "row": row_index, "col": col_index})
        public_columns.append(
            {
                "building": building,
                "cols": width,
                "cells": cells,
                "extras": [],
            }
        )

    # These are trained at a shared building, but that grid slot is already
    # taken. Keep them on the building instead of the unique list.
    def attach_to(building_id: int, item_ids: tuple[str, ...]) -> None:
        column = next((item for item in public_columns if item["building"]["nodeId"] == building_id), None)
        if column is None:
            return
        for item_id in item_ids:
            meta = take(items_by_id.get(item_id))
            if meta is not None:
                column["extras"].append(meta)

    attach_to(12, ("Unit_2588_12", "Unit_2552_12", "Unit_2554_12", "Unit_1699_12", "Unit_882_12"))
    attach_to(87, ("Unit_1155_87", "Unit_1010_87", "Unit_1012_87"))

    unique_items = []
    for meta in overflow:
        kept = take(meta)
        if kept is None:
            continue
        if kept["nodeType"] in UNIQUE_TYPES or kept["kind"] in {"unique", "regional"}:
            unique_items.append({**kept, "group": group_key(owner_keys(kept, civs))})
            continue
        host = next((column for column in public_columns if column["building"]["nodeId"] == kept.get("buildingId")), None)
        if host is None:
            unique_items.append({**kept, "group": group_key(owner_keys(kept, civs))})
        else:
            host["extras"].append(kept)

    named_with_content = {column["building"]["name"] for column in public_columns if column["cells"] or column["extras"]}
    public_columns = [
        column
        for column in public_columns
        if column["cells"]
        or column["extras"]
        or column["building"]["name"] not in named_with_content
        or len(owners_of(column["building"], civs)) != len(civs)
    ]

    groups = {}
    for item in unique_items:
        groups.setdefault(item["group"], []).append(item)
    for items in groups.values():
        items.sort(key=lambda item: (item["age"], item["name"].casefold()))

    name_by_key = {civ["key"]: civ["name"] for civ in civs}

    def group_sort(key: str):
        if key == "Regional":
            return (False, "")
        return (True, name_by_key.get(key, key).casefold())

    unique_groups = [{"key": key, "items": groups[key]} for key in sorted(groups, key=group_sort)]
    string_set, help_ids = string_ids(public_columns, unique_groups, civs)
    strings_out = localized_strings(locale_tables, string_set, help_ids)

    payload = {
        "source": {
            "name": "SiegeEngineers/aoe2techtree",
            "url": "https://github.com/SiegeEngineers/aoe2techtree",
            "license": "MIT",
        },
        "ages": AGES,
        "strings": strings_out,
        "civs": [
            {
                "key": civ["key"],
                "name": civ["name"],
                "stringId": civ["stringId"],
                "helpStringId": civ["helpStringId"],
                "units": sorted(civ["units"]),
                "techs": sorted(civ["techs"]),
                "buildings": sorted(civ["buildings"]),
            }
            for civ in civs
        ],
        "columns": public_columns,
        "uniqueGroups": unique_groups,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    node_count = sum(1 + len(column["cells"]) + len(column["extras"]) for column in public_columns)
    node_count += sum(len(group["items"]) for group in unique_groups)
    print(f"columns: {len(public_columns)}")
    print("column order:", ", ".join(column["building"]["name"] for column in public_columns))
    print(f"unique groups: {len(unique_groups)}")
    print(f"selectable nodes: {node_count}")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")

    def find_exact(name: str):
        found = []
        for column in public_columns:
            for node in [column["building"], *column["cells"], *column["extras"]]:
                if node["name"].casefold() == name.casefold():
                    found.append(node)
        for group in unique_groups:
            for node in group["items"]:
                if node["name"].casefold() == name.casefold():
                    found.append(node)
        return found

    def who(node: dict) -> list[str]:
        return owners_of(node, civs)

    paladin = find_exact("Paladin")
    if not paladin:
        raise SystemExit("Paladin was not found in the compiled tree")
    paladin_civs = who(paladin[0])
    print(f"Paladin civs: {len(paladin_civs)}")
    print("  Britons", "Britons" in paladin_civs, "Franks", "Franks" in paladin_civs)
    if "Britons" in paladin_civs or "Franks" not in paladin_civs:
        raise SystemExit("Paladin availability does not match Britons/Franks")

    unique_tech = None
    for group in unique_groups:
        if group["key"] == "Regional":
            continue
        for item in group["items"]:
            if item["useType"] == "Tech" and item["kind"] == "unique" and len(who(item)) == 1:
                unique_tech = item
                break
        if unique_tech:
            break
    if unique_tech is None:
        raise SystemExit("no single-civilization unique technology was found")
    print(f"unique tech check: {unique_tech['name']} -> {who(unique_tech)[0]}")

    if len(civs) < 50:
        raise SystemExit(f"expected the current civilization roster, found {len(civs)}")

    def translated(code: str, string_id) -> str:
        return strings_out[code].get(str(string_id), "")

    ru_paladin = translated("ru", paladin[0]["stringId"])
    pl_paladin = translated("pl", paladin[0]["stringId"])
    britons = next(civ for civ in civs if civ["key"] == "Britons")
    print(f"Paladin ru/pl: {ru_paladin} / {pl_paladin}")
    print(f"Britons ru/pl: {translated('ru', britons['stringId'])} / {translated('pl', britons['stringId'])}")
    if not any("а" <= char.lower() <= "я" or char.lower() == "ё" for char in ru_paladin):
        raise SystemExit("Russian names were not loaded")
    if pl_paladin.casefold() == "paladin":
        raise SystemExit("Polish names were not loaded")


if __name__ == "__main__":
    main()
