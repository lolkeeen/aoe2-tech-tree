# AoE2 DE tech tree filter

A local page for learning the Age of Empires II: Definitive Edition tech tree. It shows the standard roster of 56 civilizations in English, Russian, and Polish. The page is free and noncommercial. It is not affiliated with Microsoft.

Open it through a local web server. Opening the HTML file directly will not load the tree.

## Run

From the `web` folder:

```
py -3 -m http.server 8765
```

Then open [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

On Windows, use `py -3`. The `python` command is often missing from PATH.

## How to use it

The language menu is in the header. The choice is remembered in this browser. Switching language clears the search box. Civilization names and the unique groups sort in the active language. Game names come from the official locale strings. The rest of the page chrome is translated.

**Filter the tree.** Click a unit, technology, or building. Civilizations that do not have it turn red and move to the bottom of the list. The count stays “matching of total”. Click more items to stack the filter. Click a selected item again, or the × on its chip, to remove it. Clear restores all 56 civilizations. Items that none of the remaining civilizations have stay on the tree, faded.

**Pick a civilization.** Click its name. Everything that civilization has is highlighted, and everything it lacks fades. Click the same name to clear the pick. Click another name to switch. A civilization that the current filter has already turned red can still be picked.

**Add civilizations.** After one civilization is picked, each other name has a **+**. Adding a civilization turns its name gold and stacks its bonuses on top of the picked one. Press **×** to remove it. Clearing the picked civilization clears the added ones too.

The sheet to the right of the Imperial Age column shows the picked civilization’s official help text: the type line, bonus bullets, unique unit, unique technologies, and team bonus. Each added civilization is written there in gold. Unique-technology effects in the picked civilization’s sheet are purple.

Hover an icon for its name. A technology also shows what it does. Units and buildings show cost, hit points, attack, armor, range, speed, reload, train or research time, sight, and garrison when the game data has that number.

Outpost, Palisade Wall, and Palisade Gate are not on the tree.

## Stat colors

The first number is the base value from the game data.

| Color | Meaning |
| --- | --- |
| Green | The picked civilization’s own bonus, including its team bonus. Team bonuses are applied even for a 1v1. |
| Purple | A unique technology, treated as already researched. The number is calculated on top of the green bonus. |
| Gold | Bonuses from civilizations you added with **+**, including their unique technologies. |

A line can show all three. Goth Man-at-Arms train time is **21 −3 −9**: 21 is the base, the green −3 is the team barracks bonus, and the purple −9 is Perfusion.

“Works N% faster” divides the time by `1 + N/100`. A 100% faster barracks cuts the remaining train time in half. Cost discounts can apply to one resource. A technology that replaces one resource cost with another moves that cost and shows the move in purple, or in gold when it comes from an added civilization.

Bonus damage is its own line, such as “vs buildings +1”. Effects that are not a number on the card stay as text on the civilization sheet. That includes extra arrows, blast radius, trample, regeneration, poison, conversion, population space, resource trickle, and “available one age earlier”. Generic blacksmith, university, and monastery upgrades are not folded into the unit card.

## Units an ally can share

Adding one of these civilizations makes a unit the picked civilization does not own appear in the building that trains it. The icon gets a gold outline.

| Civilization | What appears | Where |
| --- | --- | --- |
| Vietnamese | Imperial Skirmisher | Archery Range, Imperial Age |
| Italians | Condottiero | Barracks, Imperial Age |
| Berbers | Genitour and Elite Genitour | Archery Range |
| Cumans | Elite Kipchak | Castle |

The Cuman unit comes from the unique technology Cuman Mercenaries, which lets every team member train Elite Kipchaks. The other three are team bonuses. No other civilization bonus adds a trainable unit to allies.

## Rebuild the data

`web/data/tree.json` is generated. Do not edit it by hand.

```
py -3 build_data.py
```

The script reads `cache/`. That cache is the Siege Engineers tech-tree data and the English, Russian, and Polish locale strings. If a cache file is missing, the script downloads it. The page itself only needs `web/`.

## Project files

| Path | Role |
| --- | --- |
| `web/index.html` | Page |
| `web/app.js` | Tree, filter, civilization list, tooltips, languages |
| `web/bonuses.js` | Civilization and unique-technology stat rules |
| `web/style.css` | Layout and the green, purple, and gold stat colors |
| `web/icons.js` | Fallback icons if a game image is missing |
| `web/img/` | In-game icons, `img/{Unit,Tech,Building}/{pictureIndex}.png` |
| `web/data/tree.json` | Compiled tree, names, and help text |
| `build_data.py` | Builds `tree.json` from the cache |
| `cache/` | Source data and locale strings |

Buildings are rows and the four ages are columns. Inside an age cell, each column is an upgrade line. A cell with more than five icons and more than five columns splits into two rows.

## Credits and usage rules

Tech availability and names come from the [Siege Engineers AoE2 tech tree](https://github.com/SiegeEngineers/aoe2techtree) (MIT).

Game icons are © Hidden Path Entertainment, Forgotten Empires, SkyBox Labs, and Ensemble Studios. Age of Empires II © Microsoft Corporation. This project was created under Microsoft's [Game Content Usage Rules](https://www.xbox.com/en-US/developers/rules) using assets from Age of Empires II, and it is not endorsed by or affiliated with Microsoft.
