const FIELD = { Unit: "units", Tech: "techs", Building: "buildings" };
const HIDDEN_BUILDINGS = new Set([598, 72, 792]);
const UI = {
  en: {
    pageTitle: "AoE2 DE tech tree filter",
    title: "AoE2 DE tech tree",
    intro: "Select units, technologies, or buildings. Civilizations that lack any of them turn red and move to the bottom.",
    language: "Language",
    search: "Find a technology, unit, or building",
    found: (count) => `${count} found`,
    clear: "Clear",
    remove: (name) => `Remove ${name}`,
    unit: "Unit",
    tech: "Technology",
    building: "Building",
    unique: "Unique",
    regional: "Regional",
    regionalGroup: "Regional",
    selected: "Selected",
    owned: "This civilization has it",
    dimmed: "None of the remaining civilizations",
    allied: "Added civilization",
    addCiv: (name) => `Add ${name}`,
    removeCiv: (name) => `Remove ${name}`,
    showing: (name) => `${name} is highlighted on the tree`,
    civs: "Civilizations",
    count: (shown, total) => `${shown} of ${total}`,
    empty: "No civilization has every selected item.",
    uniques: "Unique and regional",
    uniquesNote: "Items that do not fit the shared building grid. A unique technology or unit leaves only the civilization that has it.",
    loading: "Loading the tech tree…",
    error: "The tech tree data did not load. From the web folder, run: py -3 -m http.server",
    cost: "Cost",
    food: "Food",
    wood: "Wood",
    gold: "Gold",
    stone: "Stone",
    hp: "HP",
    attack: "Attack",
    vsBuildings: "vs buildings",
    vsRanged: "vs ranged soldiers",
    vsRangedNoSkirm: "vs ranged, except skirmishers",
    vsSkirmishers: "vs skirmishers",
    vsInfantry: "vs infantry",
    vsSiege: "vs siege",
    vsCavalry: "vs cavalry",
    vsCamels: "vs camels",
    vsRams: "vs rams",
    bonusDamage: "Bonus damage",
    passThrough: "pass through",
    fromCavalry: "from cavalry",
    armor: "Armor",
    range: "Range",
    speed: "Speed",
    reload: "Reload",
    los: "Sight",
    garrison: "Garrison",
    train: "Train",
    research: "Research",
    civSheetEmpty: "Select a civilization to see its bonuses and unique technologies.",
    credit: "Tech data from the Siege Engineers AoE2 tech tree (MIT). Game icons © Hidden Path Entertainment, Forgotten Empires, SkyBox Labs, and Ensemble Studios.",
  },
  ru: {
    pageTitle: "Дерево технологий AoE2 DE",
    title: "Дерево технологий AoE2 DE",
    intro: "Выберите юнитов, технологии или здания. Цивилизации, у которых этого нет, станут красными и уйдут вниз списка.",
    language: "Язык",
    search: "Найти технологию, юнита или здание",
    found: (count) => `найдено: ${count}`,
    clear: "Сбросить",
    remove: (name) => `Убрать ${name}`,
    unit: "Юнит",
    tech: "Технология",
    building: "Здание",
    unique: "Уникальное",
    regional: "Региональное",
    regionalGroup: "Региональные",
    selected: "Выбрано",
    owned: "Есть у этой цивилизации",
    dimmed: "Нет ни у одной из оставшихся цивилизаций",
    allied: "Добавленная цивилизация",
    addCiv: (name) => `Добавить: ${name}`,
    removeCiv: (name) => `Убрать: ${name}`,
    showing: (name) => `${name}: подсвечено на дереве`,
    civs: "Цивилизации",
    count: (shown, total) => `${shown} из ${total}`,
    empty: "Ни одна цивилизация не имеет всех выбранных пунктов.",
    uniques: "Уникальные и региональные",
    uniquesNote: "То, что не поместилось в общую сетку зданий. Уникальная технология или юнит оставляет только ту цивилизацию, у которой они есть.",
    loading: "Загрузка дерева технологий…",
    error: "Не удалось загрузить дерево технологий. В папке web выполните: py -3 -m http.server",
    cost: "Цена",
    food: "Еда",
    wood: "Дерево",
    gold: "Золото",
    stone: "Камень",
    hp: "ОЗ",
    attack: "Атака",
    vsBuildings: "против зданий",
    vsRanged: "против стрелков",
    vsRangedNoSkirm: "против стрелков, кроме застрельщиков",
    vsSkirmishers: "против застрельщиков",
    vsInfantry: "против пехоты",
    vsSiege: "против осадных",
    vsCavalry: "против кавалерии",
    vsCamels: "против верблюдов",
    vsRams: "против таранов",
    bonusDamage: "Бонусный урон",
    passThrough: "сквозной урон",
    fromCavalry: "от кавалерии",
    armor: "Броня",
    range: "Дальность",
    speed: "Скорость",
    reload: "Перезарядка",
    los: "Обзор",
    garrison: "Гарнизон",
    train: "Обучение",
    research: "Изучение",
    civSheetEmpty: "Выберите цивилизацию, чтобы увидеть бонусы и уникальные технологии.",
    credit: "Данные дерева технологий Siege Engineers (MIT). Значки игры © Hidden Path Entertainment, Forgotten Empires, SkyBox Labs и Ensemble Studios.",
  },
  pl: {
    pageTitle: "Drzewko technologii AoE2 DE",
    title: "Drzewko technologii AoE2 DE",
    intro: "Wybierz jednostki, technologie albo budynki. Cywilizacje, które ich nie mają, staną się czerwone i przesuną się na dół listy.",
    language: "Język",
    search: "Znajdź technologię, jednostkę albo budynek",
    found: (count) => `znaleziono: ${count}`,
    clear: "Wyczyść",
    remove: (name) => `Usuń ${name}`,
    unit: "Jednostka",
    tech: "Technologia",
    building: "Budynek",
    unique: "Unikalne",
    regional: "Regionalne",
    regionalGroup: "Regionalne",
    selected: "Wybrane",
    owned: "Ma to ta cywilizacja",
    dimmed: "Brak u pozostałych cywilizacji",
    allied: "Dodana cywilizacja",
    addCiv: (name) => `Dodaj: ${name}`,
    removeCiv: (name) => `Usuń: ${name}`,
    showing: (name) => `${name}: podświetlone na drzewku`,
    civs: "Cywilizacje",
    count: (shown, total) => `${shown} z ${total}`,
    empty: "Żadna cywilizacja nie ma wszystkich wybranych elementów.",
    uniques: "Unikalne i regionalne",
    uniquesNote: "Elementy, które nie mieszczą się we wspólnej siatce budynków. Unikalna technologia albo jednostka zostawia tylko cywilizację, która ją posiada.",
    loading: "Wczytywanie drzewka technologii…",
    error: "Nie udało się wczytać drzewka technologii. W folderze web uruchom: py -3 -m http.server",
    cost: "Koszt",
    food: "Żywność",
    wood: "Drewno",
    gold: "Złoto",
    stone: "Kamień",
    hp: "PŻ",
    attack: "Atak",
    vsBuildings: "przeciw budynkom",
    vsRanged: "przeciw strzelcom",
    vsRangedNoSkirm: "przeciw strzelcom, bez oszczepników",
    vsSkirmishers: "przeciw oszczepnikom",
    vsInfantry: "przeciw piechocie",
    vsSiege: "przeciw machinom",
    vsCavalry: "przeciw kawalerii",
    vsCamels: "przeciw wielbłądom",
    vsRams: "przeciw taranom",
    bonusDamage: "Obrażenia dodatkowe",
    passThrough: "przebijanie",
    fromCavalry: "od kawalerii",
    armor: "Pancerz",
    range: "Zasięg",
    speed: "Szybkość",
    reload: "Przeładowanie",
    los: "Widok",
    garrison: "Garnizon",
    train: "Szkolenie",
    research: "Badanie",
    civSheetEmpty: "Wybierz cywilizację, aby zobaczyć bonusy i unikalne technologie.",
    credit: "Dane drzewka technologii Siege Engineers (MIT). Ikony gry © Hidden Path Entertainment, Forgotten Empires, SkyBox Labs i Ensemble Studios.",
  },
};

const state = { selected: [], focusedCiv: null, alliedCivs: [], query: "", lastMatch: "", lang: "en" };
let data = null;
const byKey = new Map();

function text(key) {
  const pack = UI[state.lang] || UI.en;
  return pack[key];
}

function lookupString(id) {
  if (!id || !data) return "";
  const key = String(id);
  const local = data.strings[state.lang] && data.strings[state.lang][key];
  if (local) return local;
  return (data.strings.en && data.strings.en[key]) || "";
}

function displayName(entity) {
  return lookupString(entity && entity.stringId) || (entity && entity.name) || "";
}

function plainText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/‹[^›]*›/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function techEffectLines(node) {
  if (!node || node.useType !== "Tech" || !node.helpId) return [];
  const parts = lookupString(node.helpId)
    .split(/<br\s*\/?>/i)
    .map(plainText)
    .filter(Boolean);
  if (parts.length > 1) parts.shift();
  return parts;
}

function parseCivHelp(html) {
  const blocks = [];
  let current = { title: "", lines: [] };
  for (const chunk of String(html || "").split(/<br\s*\/?>/i)) {
    const headerMatch = chunk.match(/<b>(.*?)<\/b>/i);
    const plain = plainText(chunk);
    if (!plain) continue;
    if (headerMatch) {
      if (current.title || current.lines.length) blocks.push(current);
      const title = plainText(headerMatch[1]).replace(/:\s*$/, "");
      current = { title, lines: [] };
      const rest = plain.replace(title, "").replace(/^:\s*/, "").trim();
      if (rest) current.lines.push(rest);
      continue;
    }
    const bullet = plain.match(/^[•·]\s*(.*)$/);
    if (bullet) {
      current.lines.push(bullet[1]);
      continue;
    }
    if (current.lines.length) {
      const previous = current.lines[current.lines.length - 1];
      const glue = /[/\-–—]$/.test(previous) ? "" : " ";
      current.lines[current.lines.length - 1] = `${previous}${glue}${plain}`;
    } else current.lines.push(plain);
  }
  if (current.title || current.lines.length) blocks.push(current);
  return blocks;
}

function fold(value) {
  return value.toLocaleLowerCase(state.lang);
}

function compareNames(a, b) {
  return a.localeCompare(b, state.lang);
}

function civHas(civ, node) {
  return civ[FIELD[node.useType]].has(node.nodeId);
}

// A team bonus or team unique technology that lets allies train a unit.
const TEAM_UNITS = [
  { civ: "Vietnamese", ids: [1155] },
  { civ: "Italians", ids: [882] },
  { civ: "Berbers", ids: [1010, 1012] },
  { civ: "Cumans", ids: [1233, 1260] },
];

function grantedByTeam(node) {
  if (!node || !state.focusedCiv) return false;
  const present = new Set([state.focusedCiv, ...state.alliedCivs]);
  return TEAM_UNITS.some((grant) => present.has(grant.civ) && grant.ids.includes(node.nodeId));
}

function register(node) {
  if (!byKey.has(node.key)) byKey.set(node.key, node);
}

function gameIcon(node) {
  if (node.pictureIndex === undefined || node.pictureIndex === null) return iconElement(node);
  const img = document.createElement("img");
  img.className = "node-icon";
  img.alt = "";
  img.src = `img/${node.useType}/${node.pictureIndex}.png`;
  img.addEventListener("error", () => {
    if (img.isConnected) img.replaceWith(iconElement(node));
  });
  return img;
}

function nodeButton(node) {
  register(node);
  const button = document.createElement("button");
  button.type = "button";
  button.className = `node ${node.kind}`;
  button.dataset.key = node.key;
  const label = displayName(node);
  button.dataset.name = label;
  button.setAttribute("aria-label", label);
  button.setAttribute("aria-pressed", "false");
  button.appendChild(gameIcon(node));
  const name = document.createElement("span");
  name.className = "node-name";
  name.textContent = label;
  button.appendChild(name);
  return button;
}

function renderAgeCell(column, age) {
  const cell = document.createElement("div");
  cell.className = `age-cell age-${age.id}`;
  const items = column.cells.filter((item) => item.age === age.id);
  const extras = column.extras.filter((item) => item.age === age.id);
  if (items.length || extras.length) {
    const grid = document.createElement("div");
    grid.className = "age-items";
    const usedColumns = new Set(items.map((item) => item.col)).size;
    if (items.length > 5 && usedColumns > 5) {
      const ordered = [...items].sort((a, b) => a.row - b.row || a.col - b.col);
      const rowSize = Math.ceil(ordered.length / 2);
      grid.style.gridTemplateColumns = `repeat(${rowSize}, 50px)`;
      ordered.forEach((item, index) => {
        const button = nodeButton(item);
        button.style.gridColumn = String((index % rowSize) + 1);
        button.style.gridRow = String(Math.floor(index / rowSize) + 1);
        grid.appendChild(button);
      });
    } else {
      const cols = items.length ? Math.max(...items.map((item) => item.col)) + 1 : 1;
      grid.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
      const rows = [...new Set(items.map((item) => item.row))].sort((a, b) => a - b);
      const rowIndex = new Map(rows.map((row, index) => [row, index + 1]));
      for (const item of items) {
        const button = nodeButton(item);
        button.style.gridColumn = String(item.col + 1);
        button.style.gridRow = String(rowIndex.get(item.row));
        grid.appendChild(button);
      }
    }
    cell.appendChild(grid);
    if (extras.length) {
      const extraRow = document.createElement("div");
      extraRow.className = "extras";
      for (const item of extras) extraRow.appendChild(nodeButton(item));
      cell.appendChild(extraRow);
    }
  }
  return cell;
}

function renderTree() {
  const tree = document.getElementById("tree");
  tree.replaceChildren();
  tree.style.gridTemplateColumns = `200px repeat(${data.ages.length}, max-content) minmax(300px, 1fr)`;

  const corner = document.createElement("div");
  corner.className = "corner";
  tree.appendChild(corner);

  for (const age of data.ages) {
    const label = document.createElement("div");
    label.className = `age-label age-${age.id}`;
    label.textContent = displayName(age);
    tree.appendChild(label);
  }

  for (const column of data.columns) {
    if (HIDDEN_BUILDINGS.has(column.building.nodeId)) continue;
    const head = document.createElement("div");
    head.className = "building-head";
    head.appendChild(nodeButton(column.building));
    tree.appendChild(head);
    for (const age of data.ages) tree.appendChild(renderAgeCell(column, age));
  }
  const visibleBuildings = data.columns.filter((column) => !HIDDEN_BUILDINGS.has(column.building.nodeId)).length;
  const sheet = document.createElement("aside");
  sheet.id = "civ-sheet";
  sheet.className = "civ-sheet";
  sheet.style.gridColumn = String(data.ages.length + 2);
  sheet.style.gridRow = `1 / span ${visibleBuildings + 1}`;
  tree.appendChild(sheet);
  tree.hidden = false;
  renderCivSheet();
  fitCivSheet();
}

function fitCivSheet() {
  const body = document.querySelector(".civ-sheet-body");
  const scroller = document.getElementById("tree-scroll");
  if (!body || !scroller) return;
  body.style.maxHeight = `${Math.max(180, scroller.clientHeight - 8)}px`;
}

function renderCivSheet() {
  const sheet = document.getElementById("civ-sheet");
  if (!sheet) return;
  sheet.replaceChildren();
  const body = document.createElement("div");
  body.className = "civ-sheet-body";
  sheet.appendChild(body);
  const civ = focusedCivilization();
  if (!civ) {
    const empty = document.createElement("p");
    empty.className = "civ-sheet-empty";
    empty.textContent = text("civSheetEmpty");
    body.appendChild(empty);
    fitCivSheet();
    return;
  }
  const title = document.createElement("h2");
  title.textContent = displayName(civ);
  body.appendChild(title);
  appendCivHelp(body, civ);
  for (const key of state.alliedCivs) {
    const ally = data.civs.find((item) => item.key === key);
    if (!ally) continue;
    const block = document.createElement("div");
    block.className = "civ-sheet-ally";
    const allyTitle = document.createElement("h2");
    allyTitle.textContent = displayName(ally);
    block.appendChild(allyTitle);
    appendCivHelp(block, ally);
    body.appendChild(block);
  }
  fitCivSheet();
}

function appendCivHelp(body, civ) {
  for (const block of parseCivHelp(lookupString(civ.helpStringId))) {
    const lines = block.lines.slice();
    if (block.title) {
      const heading = document.createElement("h3");
      heading.textContent = block.title;
      body.appendChild(heading);
    } else if (lines.length) {
      const lead = document.createElement("p");
      lead.className = "civ-sheet-lead";
      lead.textContent = lines.shift();
      body.appendChild(lead);
    }
    if (!lines.length) continue;
    const uniqueTech = /tech|техн|technolog/i.test(block.title);
    const list = document.createElement("ul");
    for (const line of lines) {
      const item = document.createElement("li");
      const effect = uniqueTech && line.match(/^(.*?)\s*(\(.*\))\s*$/);
      if (effect) {
        item.append(document.createTextNode(`${effect[1]} `));
        const value = document.createElement("span");
        value.className = "civ-unique-value";
        value.textContent = effect[2];
        item.appendChild(value);
      } else {
        item.textContent = line;
      }
      list.appendChild(item);
    }
    body.appendChild(list);
  }
}

function groupTitle(group) {
  if (group.key === "Regional") return text("regionalGroup");
  const civ = data.civs.find((item) => item.key === group.key);
  return civ ? displayName(civ) : group.key;
}

function renderUniques() {
  const section = document.getElementById("uniques");
  section.replaceChildren();
  const heading = document.createElement("h2");
  heading.textContent = text("uniques");
  const note = document.createElement("p");
  note.className = "section-note";
  note.textContent = text("uniquesNote");
  section.appendChild(heading);
  section.appendChild(note);
  const groups = document.createElement("div");
  groups.className = "unique-groups";
  const ordered = [...data.uniqueGroups].sort((a, b) => {
    if ((a.key === "Regional") !== (b.key === "Regional")) return a.key === "Regional" ? -1 : 1;
    return compareNames(groupTitle(a), groupTitle(b));
  });
  const ageById = new Map(data.ages.map((age) => [age.id, age]));
  const placedNames = new Set();
  for (const column of data.columns) {
    if (HIDDEN_BUILDINGS.has(column.building.nodeId)) continue;
    for (const node of [column.building, ...column.cells, ...column.extras]) placedNames.add(node.name);
  }
  for (const group of ordered) {
    const card = document.createElement("article");
    card.className = "unique-group";
    const title = document.createElement("h3");
    title.textContent = groupTitle(group);
    card.appendChild(title);
    const cards = document.createElement("div");
    cards.className = "cards";
    const seenIcons = new Set();
    const items = [...group.items]
      .sort((a, b) => a.age - b.age || compareNames(displayName(a), displayName(b)))
      .filter((item) => {
        if (placedNames.has(item.name)) return false;
        const icon = `${item.useType}:${item.pictureIndex}`;
        if (item.pictureIndex != null && seenIcons.has(icon)) return false;
        seenIcons.add(icon);
        return true;
      });
    if (!items.length) continue;
    for (const item of items) {
      const button = nodeButton(item);
      const tag = document.createElement("span");
      tag.className = "age-tag";
      tag.textContent = ageById.has(item.age) ? displayName(ageById.get(item.age)) : "";
      button.appendChild(tag);
      cards.appendChild(button);
    }
    card.appendChild(cards);
    groups.appendChild(card);
  }
  section.appendChild(groups);
  section.hidden = false;
}

function renderCivs(remaining) {
  const list = document.getElementById("civ-list");
  const count = document.getElementById("civ-count");
  list.replaceChildren();
  count.textContent = text("count")(remaining.length, data.civs.length);
  const have = new Set(remaining.map((civ) => civ.key));
  const byName = (a, b) => compareNames(displayName(a), displayName(b));
  const matching = [...remaining].sort(byName);
  const missing = data.civs.filter((civ) => !have.has(civ.key)).sort(byName);
  if (!matching.length) {
    const note = document.createElement("li");
    note.className = "empty-note";
    note.textContent = text("empty");
    list.appendChild(note);
  }
  for (const civ of [...matching, ...missing]) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "civ-button";
    button.dataset.civ = civ.key;
    button.textContent = displayName(civ);
    const focused = state.focusedCiv === civ.key;
    const excluded = !have.has(civ.key);
    const allied = state.alliedCivs.includes(civ.key);
    button.classList.toggle("is-focused", focused);
    button.classList.toggle("is-allied", allied);
    button.classList.toggle("is-missing", excluded);
    button.setAttribute("aria-pressed", focused ? "true" : "false");
    item.appendChild(button);
    if (state.focusedCiv && !focused) {
      const add = document.createElement("button");
      add.type = "button";
      add.className = "civ-add";
      add.dataset.civ = civ.key;
      add.classList.toggle("is-allied", allied);
      add.textContent = allied ? "×" : "+";
      add.setAttribute("aria-label", text(allied ? "removeCiv" : "addCiv")(displayName(civ)));
      add.setAttribute("aria-pressed", allied ? "true" : "false");
      item.appendChild(add);
    }
    list.appendChild(item);
  }
}

function focusedCivilization() {
  if (!state.focusedCiv) return null;
  return data.civs.find((item) => item.key === state.focusedCiv) || null;
}

function toggleCiv(key) {
  if (state.focusedCiv === key) {
    state.focusedCiv = null;
    state.alliedCivs = [];
  } else {
    state.focusedCiv = key;
    state.alliedCivs = state.alliedCivs.filter((item) => item !== key);
  }
  applySelection();
}

function toggleAlly(key) {
  if (!state.focusedCiv || key === state.focusedCiv) {
    toggleCiv(key);
    return;
  }
  const index = state.alliedCivs.indexOf(key);
  if (index === -1) state.alliedCivs.push(key);
  else state.alliedCivs.splice(index, 1);
  applySelection();
}

function renderChips() {
  const chips = document.getElementById("chips");
  chips.replaceChildren();
  for (const key of state.selected) {
    const node = byKey.get(key);
    const name = node ? displayName(node) : key;
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.append(document.createTextNode(name));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", text("remove")(name));
    remove.addEventListener("click", () => toggle(key));
    chip.appendChild(remove);
    chips.appendChild(chip);
  }
  document.getElementById("clear").disabled = state.selected.length === 0;
}

function applySelection() {
  const remaining = data.civs.filter((civ) => state.selected.every((key) => civHas(civ, byKey.get(key))));
  const focused = focusedCivilization();
  const selected = new Set(state.selected);
  document.querySelectorAll(".node").forEach((element) => {
    const node = byKey.get(element.dataset.key);
    const isSelected = selected.has(element.dataset.key);
    const native = focused ? civHas(focused, node) : false;
    const granted = !native && grantedByTeam(node);
    const owned = native || granted;
    const available = remaining.some((civ) => civHas(civ, node));
    element.classList.toggle("is-selected", isSelected);
    element.classList.toggle("is-owned", native);
    element.classList.toggle("is-team", granted);
    element.classList.toggle("is-dimmed", focused ? !isSelected && !owned : !isSelected && !available);
    element.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  const focusNote = document.getElementById("civ-focus");
  focusNote.replaceChildren();
  if (focused) {
    focusNote.hidden = false;
    focusNote.append(document.createTextNode(text("showing")(displayName(focused))));
    const allies = state.alliedCivs
      .map((key) => data.civs.find((item) => item.key === key))
      .filter(Boolean);
    if (allies.length) {
      const extra = document.createElement("span");
      extra.className = "ally-names";
      extra.textContent = ` + ${allies.map((civ) => displayName(civ)).join(", ")}`;
      focusNote.appendChild(extra);
    }
  } else {
    focusNote.hidden = true;
  }
  renderCivs(remaining);
  renderChips();
  renderCivSheet();
}

function toggle(key) {
  const index = state.selected.indexOf(key);
  if (index === -1) state.selected.push(key);
  else state.selected.splice(index, 1);
  applySelection();
}

function applySearch() {
  const query = fold(state.query.trim());
  let first = null;
  let count = 0;
  document.querySelectorAll(".node").forEach((element) => {
    const hit = query.length > 0 && fold(element.dataset.name).includes(query);
    element.classList.toggle("is-match", hit);
    if (hit) {
      count += 1;
      if (!first) first = element;
    }
  });
  const counter = document.getElementById("search-count");
  counter.textContent = query ? text("found")(count) : "";
  const matchKey = first ? first.dataset.key : "";
  if (first && matchKey !== state.lastMatch) {
    first.scrollIntoView({ block: "center", inline: "center" });
  }
  state.lastMatch = matchKey;
}

function applyChrome() {
  document.documentElement.lang = state.lang;
  document.title = text("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = text(element.dataset.i18nPlaceholder);
  });
  const select = document.getElementById("lang");
  if (select.value !== state.lang) select.value = state.lang;
}

function storedLang() {
  try {
    return localStorage.getItem("aoe2-lang");
  } catch (error) {
    return null;
  }
}

function initialLang() {
  const stored = storedLang();
  if (stored && UI[stored]) return stored;
  const browser = (navigator.language || "").toLowerCase();
  if (browser.startsWith("ru")) return "ru";
  if (browser.startsWith("pl")) return "pl";
  return "en";
}

function setLang(lang) {
  state.lang = UI[lang] ? lang : "en";
  try {
    localStorage.setItem("aoe2-lang", state.lang);
  } catch (error) {
    // The page still switches language for this visit.
  }
  applyChrome();
  if (!data) return;
  state.query = "";
  state.lastMatch = "";
  const search = document.getElementById("search");
  if (search) search.value = "";
  renderTree();
  renderUniques();
  applySelection();
  applySearch();
}

function formatStat(stat, value) {
  if (stat === "speed" || stat === "reload") {
    const rounded = Math.round(Number(value) * 100) / 100;
    return String(rounded);
  }
  return String(Math.round(Number(value)));
}

function formatDelta(stat, delta) {
  if (!delta) return "";
  return `${delta > 0 ? "+" : "−"}${formatStat(stat, Math.abs(delta))}`;
}

function appendDelta(parent, stat, delta, className) {
  const extra = formatDelta(stat, delta);
  if (!extra) return;
  const bonus = document.createElement("span");
  bonus.className = className;
  bonus.textContent = extra;
  parent.appendChild(document.createTextNode(" "));
  parent.appendChild(bonus);
}

function tipRow(label, baseText, delta, stat, unique, ally) {
  const row = document.createElement("div");
  row.className = "tip-row";
  const name = document.createElement("span");
  name.className = "tip-label";
  name.textContent = label;
  const value = document.createElement("span");
  value.className = "tip-base";
  value.textContent = baseText;
  appendDelta(value, stat, delta, "tip-bonus");
  appendDelta(value, stat, unique, "tip-unique");
  appendDelta(value, stat, ally, "tip-ally");
  row.append(name, value);
  return row;
}

function appendBonusLines(tip, node) {
  for (const line of bonusAgainst(state.focusedCiv, node, state.alliedCivs)) {
    const row = document.createElement("div");
    row.className = "tip-row";
    const tone = line.ally ? "tip-ally" : (line.unique ? "tip-unique" : "tip-bonus");
    const name = document.createElement("span");
    name.className = line.text ? "tip-label" : tone;
    name.textContent = text(line.label);
    row.appendChild(name);
    if (line.text) {
      const value = document.createElement("span");
      value.className = tone;
      value.textContent = line.text;
      row.appendChild(value);
    }
    tip.appendChild(row);
  }
}

function appendStats(tip, node) {
  const stats = node.stats;
  if (!stats) return;
  const civ = state.focusedCiv;
  const allies = state.alliedCivs;
  if (stats.cost) {
    const costs = adjustedCost(civ, node, stats.cost, allies);
    for (const resource of ["food", "wood", "gold", "stone"]) {
      const part = costs[resource];
      if (!part || (!part.base && !part.delta && !part.unique && !part.ally)) continue;
      tip.appendChild(tipRow(text(resource), formatStat("cost", part.base), part.delta, "cost", part.unique, part.ally));
    }
  }
  const fields = node.useType === "Building"
    ? ["hp", "attack", "range", "garrison", "los", "train"]
    : node.useType === "Tech"
      ? ["research"]
      : ["hp", "attack", "range", "los", "speed", "reload", "train"];
  let showedAttack = false;
  for (const field of fields) {
    if (stats[field] === undefined) continue;
    const adjusted = adjustedStat(civ, node, field, stats[field], undefined, allies);
    tip.appendChild(tipRow(text(field), formatStat(field, adjusted.base), adjusted.delta, field, adjusted.unique, adjusted.ally));
    if (field === "attack") {
      appendBonusLines(tip, node);
      showedAttack = true;
    }
  }
  if (!showedAttack) appendBonusLines(tip, node);
  if (stats.melee !== undefined || stats.pierce !== undefined) {
    const melee = adjustedStat(civ, node, "melee", stats.melee || 0, undefined, allies);
    const pierce = adjustedStat(civ, node, "pierce", stats.pierce || 0, undefined, allies);
    const row = document.createElement("div");
    row.className = "tip-row";
    const name = document.createElement("span");
    name.className = "tip-label";
    name.textContent = text("armor");
    const value = document.createElement("span");
    value.className = "tip-base";
    value.appendChild(document.createTextNode(formatStat("melee", melee.base)));
    appendDelta(value, "melee", melee.delta, "tip-bonus");
    appendDelta(value, "melee", melee.unique, "tip-unique");
    appendDelta(value, "melee", melee.ally, "tip-ally");
    value.appendChild(document.createTextNode(" / "));
    value.appendChild(document.createTextNode(formatStat("pierce", pierce.base)));
    appendDelta(value, "pierce", pierce.delta, "tip-bonus");
    appendDelta(value, "pierce", pierce.unique, "tip-unique");
    appendDelta(value, "pierce", pierce.ally, "tip-ally");
    row.append(name, value);
    tip.appendChild(row);
  }
}

function placeTooltip(button) {
  const tip = document.getElementById("tooltip");
  tip.hidden = false;
  const rect = button.getBoundingClientRect();
  const below = rect.top - tip.offsetHeight - 8 < 8;
  tip.classList.toggle("is-below", below);
  const half = tip.offsetWidth / 2;
  const left = Math.min(window.innerWidth - half - 8, Math.max(half + 8, rect.left + rect.width / 2));
  tip.style.left = `${left}px`;
  tip.style.top = below ? `${rect.bottom + 8}px` : `${rect.top - 8}px`;
}

function showTooltip(button) {
  const tip = document.getElementById("tooltip");
  if (!button) {
    tip.hidden = true;
    return;
  }
  tip.replaceChildren();
  const title = document.createElement("div");
  title.className = "tip-name";
  const age = button.querySelector(".age-tag");
  title.textContent = age && age.textContent ? `${button.dataset.name} · ${age.textContent}` : (button.dataset.name || "");
  tip.appendChild(title);
  const node = byKey.get(button.dataset.key);
  if (node) {
    for (const line of techEffectLines(node)) {
      const effect = document.createElement("div");
      effect.className = "tip-effect";
      effect.textContent = line;
      tip.appendChild(effect);
    }
    appendStats(tip, node);
  }
  placeTooltip(button);
}

function hideTooltip() {
  document.getElementById("tooltip").hidden = true;
}

function bindTooltip() {
  const scroller = document.getElementById("tree-scroll");
  scroller.addEventListener("pointerover", (event) => {
    const button = event.target.closest(".node");
    if (button) showTooltip(button);
  });
  scroller.addEventListener("pointerout", (event) => {
    const button = event.target.closest(".node");
    if (!button) return;
    const next = event.relatedTarget && event.relatedTarget.closest && event.relatedTarget.closest(".node");
    if (!next) hideTooltip();
  });
  scroller.addEventListener("focusin", (event) => {
    const button = event.target.closest(".node");
    if (button) showTooltip(button);
  });
  scroller.addEventListener("focusout", hideTooltip);
  scroller.addEventListener("scroll", hideTooltip, true);
}

function showError(message) {
  const status = document.getElementById("status");
  status.hidden = false;
  status.textContent = message;
}

async function main() {
  state.lang = initialLang();
  applyChrome();
  try {
    const response = await fetch("data/tree.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (error) {
    showError(text("error"));
    return;
  }
  for (const civ of data.civs) {
    civ.units = new Set(civ.units);
    civ.techs = new Set(civ.techs);
    civ.buildings = new Set(civ.buildings);
  }
  document.getElementById("status").hidden = true;
  bindTooltip();
  renderTree();
  renderUniques();
  document.getElementById("civ-list").addEventListener("click", (event) => {
    const add = event.target.closest(".civ-add");
    if (add) {
      toggleAlly(add.dataset.civ);
      return;
    }
    const button = event.target.closest(".civ-button");
    if (!button) return;
    toggleCiv(button.dataset.civ);
  });
  document.getElementById("tree-scroll").addEventListener("click", (event) => {
    const button = event.target.closest(".node");
    if (!button) return;
    toggle(button.dataset.key);
  });
  document.getElementById("clear").addEventListener("click", () => {
    state.selected = [];
    applySelection();
  });
  document.getElementById("search").addEventListener("input", (event) => {
    state.query = event.target.value;
    applySearch();
  });
  document.getElementById("search").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.target.value = "";
      state.query = "";
      applySearch();
    }
  });
  document.getElementById("lang").addEventListener("change", (event) => {
    setLang(event.target.value);
  });
  window.addEventListener("resize", fitCivSheet);
  applySelection();
}

main();
