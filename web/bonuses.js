/* Innate civilization stat changes. Base numbers stay in the normal color; the difference is shown in green. */
const TAGS = {
  infantry: [74, 75, 77, 473, 567, 93, 358, 359, 1786, 1787, 1788, 751, 752, 753, 2550, 2588, 2552, 2554, 41, 759, 555, 761, 281, 531, 232, 534, 692, 694, 291, 560, 25, 554, 725, 726, 879, 881, 882, 1016, 1018, 1013, 1015, 1123, 1125, 1741, 1743, 1735, 1737, 1701, 1703, 1660, 1658, 1661, 1659, 1699, 1793, 1811, 1901, 1903, 1974, 1959, 1961, 1920, 1922, 2562, 2564, 2582, 2584, 2586, 2587, 2705, 2706, 2703, 2704, 2711, 2712, 2708, 2709, 1747, 1749],
  barracks: [74, 75, 77, 473, 567, 93, 358, 359, 1786, 1787, 1788, 751, 752, 753, 2550, 2588, 2552, 2554, 1901, 1903],
  footArcher: [4, 24, 492, 763, 765, 8, 530, 73, 559, 1129, 1131, 1800, 1802, 1968, 1970, 2579, 2581],
  skirmisher: [7, 6, 1155],
  cavArcher: [39, 474, 11, 561, 1231, 1260, 1233, 1007, 1009, 873, 875, 1126, 1128, 1010, 1012],
  cavalry: [448, 546, 441, 1707, 38, 283, 569, 1813, 329, 330, 207, 1132, 1134, 1744, 1370, 1372, 40, 553, 876, 878, 886, 755, 887, 757, 1234, 1236, 1228, 1230, 1655, 1657, 1254, 1225, 1255, 1227, 1803, 1805, 1790, 1792, 1751, 1753, 1944, 1946, 1949, 1951, 239, 558, 869, 871, 2569, 2571, 282, 556],
  scout: [448, 546, 441, 1707],
  knight: [38, 283, 569, 1813],
  cavArcherLine: [39, 474],
  stable: [448, 546, 441, 1707, 38, 283, 569, 1813, 329, 330, 207, 1132, 1134, 1744, 1374, 1370, 1372, 1944, 1946],
  steppe: [1370, 1372],
  camel: [329, 330, 207, 282, 556],
  warship: [539, 21, 442, 1103, 529, 532, 1104, 527, 528, 420, 691, 250, 533, 831, 832, 1004, 1006, 1750, 1795, 1302, 1948, 2626, 2627, 2628],
  galley: [539, 21, 442],
  fishing: [13],
  gunpowder: [5, 36, 771, 773, 420, 691, 46, 557, 1001, 1003, 1704, 1706, 1911],
  siege: [280, 550, 588, 279, 542, 1258, 422, 548, 36, 331, 1942],
  mangonel: [280, 550, 588],
  tower: [79, 234, 235],
  elephant: [1132, 1134, 1744, 1746, 1120, 1122, 873, 875, 239, 558],
  elephantArcher: [873, 875],
  scorpion: [279, 542],
  eco: [83, 13, 128, 17],
  ship: [539, 21, 442, 1103, 529, 532, 1104, 527, 528, 420, 691, 250, 533, 831, 832, 1004, 1006, 1750, 1795, 1302, 1948, 2626, 2627, 2628, 13, 545, 17, 2633],
};

const TAG_SETS = Object.fromEntries(Object.entries(TAGS).map(([tag, ids]) => [tag, new Set(ids)]));

const BONUSES = {
  Vikings: [
    { tag: "infantry", stat: "hp", mul: 0.2, minAge: 2 },
    { tag: "warship", stat: "cost", mulByAge: { 2: -0.15, 3: -0.15, 4: -0.2 } },
  ],
  Franks: [
    { tag: "cavalry", stat: "hp", mul: 0.2 },
  ],
  Britons: [
    { tag: "footArcher", stat: "range", addByAge: { 3: 1, 4: 2 } },
  ],
  Byzantines: [
    { tag: "building", stat: "hp", mulByAge: { 1: 0.1, 2: 0.2, 3: 0.3, 4: 0.4 } },
    { tag: "skirmisher", stat: "cost", mul: -0.25 },
    { tag: "spearman", stat: "cost", mul: -0.25 },
    { tag: "camel", stat: "cost", mul: -0.25 },
  ],
  Celts: [
    { tag: "infantry", stat: "speed", mul: 0.15 },
    { tag: "siege", stat: "reload", rate: 1.25 },
  ],
  Japanese: [
    { tag: "infantry", stat: "reload", rate: 1.33 },
    { tag: "fishing", stat: "hp", mul: 1 },
    { tag: "fishing", stat: "pierce", add: 2 },
  ],
  Mongols: [
    { tag: "cavArcher", stat: "reload", rate: 1.25 },
    { tag: "scout", stat: "hp", mul: 0.3 },
    { tag: "steppe", stat: "hp", mul: 0.3 },
    { tag: "siege", stat: "speed", mul: 0.5 },
  ],
  Teutons: [
    { tag: "infantry", stat: "melee", addByAge: { 3: 1, 4: 2 } },
    { tag: "cavalry", stat: "melee", addByAge: { 3: 1, 4: 2 } },
    { tag: "cavArcher", stat: "melee", addByAge: { 3: 1, 4: 2 } },
  ],
  Turks: [
    { tag: "gunpowder", stat: "hp", mul: 0.25 },
    { tag: "scout", stat: "pierce", add: 1 },
  ],
  Aztecs: [
    { tag: "military", stat: "train", mul: -0.15 },
  ],
  Mayans: [
    { tag: "footArcher", stat: "cost", mulByAge: { 2: -0.1, 3: -0.2, 4: -0.3 } },
  ],
  Huns: [
    { tag: "cavArcher", stat: "cost", mulByAge: { 3: -0.1, 4: -0.2 } },
  ],
  Saracens: [
    { tag: "galley", stat: "reload", rate: 1.25 },
    { ids: [545], stat: "hp", mul: 1 },
  ],
  Persians: [
    { ids: [109, 45], stat: "hp", mul: 1 },
    { tag: "knight", stat: "vs", vs: "vsRanged", add: 2 },
  ],
  Vietnamese: [
    { tag: "footArcher", stat: "hp", mul: 0.2 },
    { tag: "skirmisher", stat: "hp", mul: 0.2 },
  ],
  Malians: [
    { tag: "infantry", stat: "pierce", addByAge: { 1: 1, 2: 2, 3: 3, 4: 4 } },
  ],
  Koreans: [
    { tag: "mangonel", stat: "range", add: 1 },
    { tag: "tower", stat: "range", add: 2 },
  ],
  Romans: [
    { tag: "galley", stat: "melee", add: 1 },
    { tag: "galley", stat: "pierce", add: 1 },
  ],
  Lithuanians: [
    { tag: "spearman", stat: "speed", mul: 0.1 },
    { tag: "skirmisher", stat: "speed", mul: 0.1 },
  ],
  Cumans: [
    { tag: "cavalry", stat: "speed", mulByAge: { 2: 0.05, 3: 0.1, 4: 0.15 } },
    { tag: "cavArcher", stat: "speed", mulByAge: { 2: 0.05, 3: 0.1, 4: 0.15 } },
  ],
  Dravidians: [
    { tag: "skirmisher", stat: "reload", rate: 1.25 },
    { tag: "elephantArcher", stat: "reload", rate: 1.25 },
  ],
  Armenians: [
    { tag: "infantry", stat: "los", add: 2 },
  ],
  Britons: [
    { tag: "footArcher", stat: "range", addByAge: { 3: 1, 4: 2 } },
    { buildingId: 87, stat: "train", rate: 1.1 },
  ],
  Celts: [
    { tag: "infantry", stat: "speed", mulByAge: { 1: 0.05, 2: 0.1, 3: 0.15, 4: 0.2 } },
    { tag: "siege", stat: "reload", rate: 1.25 },
    { buildingId: 49, stat: "train", rate: 1.2 },
  ],
  Cumans: [
    { tag: "cavalry", stat: "speed", mulByAge: { 2: 0.05, 3: 0.1, 4: 0.15 } },
    { tag: "cavArcher", stat: "speed", mulByAge: { 2: 0.05, 3: 0.1, 4: 0.15 } },
    { ids: [72], stat: "hp", mul: 0.33 },
  ],
  Danes: [
    { tag: "siege", stat: "los", add: 2 },
  ],
  Franks: [
    { tag: "cavalry", stat: "hp", mul: 0.2, minAge: 2 },
    { ids: [38, 283, 569, 1813], stat: "los", add: 2 },
  ],
  Goths: [
    { buildingId: 12, stat: "train", rate: 1.2 },
    { tag: "infantry", stat: "vs", vs: "vsBuildings", addByAge: { 2: 1, 3: 2, 4: 3 } },
  ],
  Gurjaras: [
    { tag: "camel", stat: "train", rate: 1.25 },
    { tag: "elephant", stat: "train", rate: 1.25 },
    { tag: "cavalry", stat: "bonusPct", addByAge: { 2: 20, 3: 30, 4: 40 } },
    { tag: "cavArcher", stat: "bonusPct", addByAge: { 2: 20, 3: 30, 4: 40 } },
  ],
  Huns: [
    { tag: "cavArcher", stat: "cost", mulByAge: { 3: -0.1, 4: -0.2 } },
    { buildingId: 101, stat: "train", rate: 1.2 },
  ],
  Japanese: [
    { tag: "infantry", stat: "reload", rate: 1.33, minAge: 2 },
    { tag: "fishing", stat: "hp", mul: 1 },
    { tag: "fishing", stat: "pierce", add: 2 },
    { tag: "galley", stat: "los", add: 4 },
    { tag: "cavArcherLine", stat: "vs", vs: "vsRangedNoSkirm", add: 2 },
  ],
  Jurchens: [
    { tag: "gunpowder", stat: "los", add: 2 },
  ],
  Khmer: [
    { tag: "scorpion", stat: "range", add: 1 },
    { tag: "scorpion", stat: "los", add: 1 },
  ],
  Koreans: [
    { tag: "mangonel", stat: "range", add: 1 },
    { tag: "tower", stat: "range", add: 2 },
    { ids: [83], stat: "los", add: 3 },
  ],
  Lithuanians: [
    { tag: "spearman", stat: "speed", mul: 0.1 },
    { tag: "skirmisher", stat: "speed", mul: 0.1 },
    { buildingIds: [104, 1806], stat: "train", rate: 1.2 },
    { buildingIds: [104, 1806], stat: "research", rate: 1.2 },
  ],
  Magyars: [
    { tag: "cavArcher", stat: "train", rate: 1.25 },
  ],
  Malay: [
    { ids: [45], stat: "los", add: 6 },
  ],
  Malians: [
    { tag: "barracks", stat: "pierce", addByAge: { 2: 1, 3: 2, 4: 3 } },
    { buildingId: 209, stat: "research", rate: 1.8 },
  ],
  Mapuche: [
    { tag: "spearman", stat: "los", add: 2 },
    { tag: "skirmisher", stat: "los", add: 2 },
  ],
  Mayans: [
    { tag: "footArcher", stat: "cost", mulByAge: { 2: -0.1, 3: -0.2, 4: -0.3 } },
    { ids: [117, 155, 487, 72, 792], stat: "cost", mul: -0.5 },
  ],
  Mongols: [
    { tag: "cavArcher", stat: "reload", rate: 1.25 },
    { tag: "scout", stat: "hp", mulByAge: { 3: 0.2, 4: 0.3 } },
    { tag: "steppe", stat: "hp", mulByAge: { 3: 0.2, 4: 0.3 } },
    { tag: "siege", stat: "speed", mul: 0.5 },
    { tag: "scout", stat: "los", add: 2 },
  ],
  Bulgarians: [
    { buildingId: 103, stat: "research", rate: 1.8 },
  ],
  Bohemians: [
    { buildingId: 84, stat: "research", rate: 1.8 },
    { ids: [128], stat: "train", rate: 1.8 },
    { tag: "spearman", stat: "bonusPct", add: 25 },
  ],
  Bengalis: [
    { tag: "cavalry", stat: "vs", vs: "vsSkirmishers", add: 2 },
  ],
  Hindustanis: [
    { tag: "scout", stat: "vs", vs: "vsBuildings", add: 2 },
    { tag: "camel", stat: "vs", vs: "vsBuildings", add: 2 },
  ],
  Poles: [
    { tag: "scout", stat: "vs", vs: "vsRanged", add: 1 },
  ],
  Khitans: [
    { tag: "infantry", stat: "vs", vs: "vsRanged", add: 2 },
  ],
  Wei: [
    { tag: "cavalry", stat: "vs", vs: "vsSiege", add: 2 },
  ],
  Varangians: [
    { tag: "knight", stat: "vs", vs: "vsInfantry", add: 1 },
  ],
  Saracens: [
    { tag: "galley", stat: "reload", rate: 1.25 },
    { ids: [545], stat: "hp", mul: 1 },
    { tag: "footArcher", stat: "vs", vs: "vsBuildings", add: 2 },
    { tag: "skirmisher", stat: "vs", vs: "vsBuildings", add: 2 },
  ],
  Portuguese: [
    { tag: "tech", stat: "research", rate: 1.25, exclude: [101, 102, 103] },
  ],
  Shu: [
    { tag: "footArcher", stat: "los", add: 2 },
  ],
  Sicilians: [
    { ids: [545], stat: "los", add: 5 },
    { ids: [545], stat: "cost", mul: -0.5 },
  ],
  Tatars: [
    { tag: "cavArcher", stat: "los", add: 2 },
  ],
  Turks: [
    { tag: "gunpowder", stat: "hp", mul: 0.25 },
    { tag: "scout", stat: "pierce", add: 1 },
    { tag: "gunpowder", stat: "train", rate: 1.25 },
  ],
  Vikings: [
    { tag: "infantry", stat: "hp", mul: 0.2, minAge: 2 },
    { tag: "warship", stat: "cost", mulByAge: { 2: -0.15, 3: -0.15, 4: -0.2 } },
    { ids: [45], stat: "cost", mul: -0.15 },
  ],
};

function addBonus(civ, rules) {
  BONUSES[civ] = (BONUSES[civ] || []).concat(rules);
}

const AGES = [101, 102, 103];
const ECO_BUILDINGS = [68, 562, 584];
const FORTIFICATIONS = [117, 155, 487, 72, 792, 79, 234, 235, 236, 82, 1665];
const ARCHER_BLACKSMITH = [199, 200, 201, 211, 212, 219];
const SIEGE_FORT_TECHS = [50, 51, 194, 140, 64, 322, 380, 608, 377, 93, 379];

addBonus("Goths", [
  { ids: [22], stat: "research", set: 0 },
  { tag: "infantry", stat: "cost", mulByAge: { 1: -0.15, 2: -0.2, 3: -0.25, 4: -0.3 } },
]);
addBonus("Italians", [
  { ids: AGES, stat: "cost", mul: -0.15 },
  { tag: "footArcher", stat: "melee", add: 1 },
  { tag: "footArcher", stat: "pierce", add: 1 },
  { ids: [882], stat: "melee", add: 1 },
  { ids: [882], stat: "pierce", add: 1 },
  { buildingIds: [45, 209], use: "Tech", stat: "cost", mul: -0.25 },
  { tag: "gunpowder", stat: "cost", mul: -0.2 },
  { ids: [13], stat: "cost", mul: -0.15 },
]);
addBonus("Britons", [
  { ids: [109], stat: "cost", resource: "wood", mul: -0.5 },
]);
addBonus("Byzantines", [
  { ids: [8, 280], stat: "cost", set: 0 },
  { ids: [103], stat: "cost", mul: -0.33 },
  { ids: [529, 532, 1795], stat: "reload", rate: 1.25 },
]);
addBonus("Vikings", [
  { ids: [213, 249], stat: "cost", set: 0 },
]);
addBonus("Franks", [
  { buildingId: 68, use: "Tech", stat: "cost", set: 0 },
  { ids: [82], stat: "cost", mulByAge: { 3: -0.15, 4: -0.25 } },
]);
addBonus("Burmese", [
  { buildingId: 562, use: "Tech", stat: "cost", set: 0 },
  { tag: "infantry", stat: "attack", addByAge: { 2: 1, 3: 2, 4: 3 } },
  { ids: [1132, 1134], stat: "melee", add: 1 },
  { ids: [1132, 1134], stat: "pierce", add: 1 },
  { buildingId: 104, use: "Tech", stat: "cost", mul: -0.5 },
]);
addBonus("Bulgarians", [
  { buildingIds: [103, 49], use: "Tech", stat: "cost", resource: "food", mul: -0.5 },
  { ids: [109], stat: "cost", resource: "stone", mul: -0.5 },
]);
addBonus("Bohemians", [
  { buildingId: 584, use: "Tech", stat: "cost", set: 0 },
  { ids: [103, 209], stat: "cost", resource: "wood", add: -100 },
]);
addBonus("Burgundians", [
  { buildingIds: ECO_BUILDINGS, use: "Tech", stat: "cost", resource: "food", mul: -0.4 },
  { ids: [22, 213, 249, 8, 280], stat: "cost", resource: "food", mul: -0.4 },
  { buildingId: 101, use: "Tech", stat: "cost", mul: -0.5 },
  { tag: "gunpowder", stat: "attack", mul: 0.25 },
]);
addBonus("Chinese", [
  { tag: "tech", stat: "cost", mulByAge: { 2: -0.05, 3: -0.1, 4: -0.15 } },
  { ids: [109], stat: "los", add: 7 },
  { ids: [1901, 1903, 529, 532], stat: "speed", mulByAge: { 3: 0.05, 4: 0.1 } },
]);
addBonus("Cumans", [
  { ids: [87, 101], stat: "cost", resource: "wood", add: -75 },
]);
addBonus("Berbers", [
  { ids: [83], stat: "speed", mulByAge: { 1: 0.05, 2: 0.1, 3: 0.1, 4: 0.1 } },
  { tag: "stable", stat: "cost", mulByAge: { 3: -0.15, 4: -0.2 } },
  { tag: "ship", stat: "speed", mul: 0.1 },
]);
addBonus("Danes", [
  { buildingIds: [12, 49], use: "Tech", stat: "cost", resource: "gold", mul: -0.66 },
  { ids: [2703, 2704, 250, 533], stat: "speed", mul: 0.1 },
]);
addBonus("Dravidians", [
  { buildingId: 12, use: "Tech", stat: "cost", mul: -0.5 },
  { tag: "siege", stat: "cost", resource: "wood", mul: -0.33 },
]);
addBonus("Ethiopians", [
  { tag: "footArcher", stat: "reload", rate: 1.18 },
]);
addBonus("Hindustanis", [
  { ids: [83], stat: "cost", mulByAge: { 1: -0.08, 2: -0.13, 3: -0.18, 4: -0.23 } },
  { tag: "camel", stat: "reload", rate: 1.2 },
  { tag: "gunpowder", stat: "melee", add: 1 },
  { tag: "gunpowder", stat: "pierce", add: 1 },
]);
addBonus("Incas", [
  { tag: "building", stat: "cost", resource: "stone", mul: -0.15 },
  { tag: "military", stat: "cost", resource: "food", mulByAge: { 1: -0.15, 2: -0.2, 3: -0.25, 4: -0.3 } },
]);
addBonus("Japanese", [
  { ids: ECO_BUILDINGS, stat: "cost", mul: -0.5 },
]);
addBonus("Jurchens", [
  { tag: "cavalry", stat: "reload", rate: 1.25, minAge: 2 },
  { tag: "cavArcher", stat: "reload", rate: 1.25, minAge: 2 },
  { ids: [1901, 1903], stat: "reload", rate: 1.25, minAge: 2 },
  { ids: SIEGE_FORT_TECHS, stat: "cost", resource: "wood", mul: -0.75 },
  { ids: SIEGE_FORT_TECHS, stat: "research", rate: 2 },
]);
addBonus("Khitans", [
  { tag: "skirmisher", stat: "train", rate: 1.15 },
  { tag: "spearman", stat: "train", rate: 1.15 },
  { tag: "scout", stat: "train", rate: 1.15 },
]);
addBonus("Khmer", [
  { ids: [1132, 1134], stat: "speed", mul: 0.1 },
]);
addBonus("Koreans", [
  { tag: "infantry", stat: "cost", resource: "wood", mul: -0.5 },
  { tag: "footArcher", stat: "cost", resource: "wood", mul: -0.5 },
  { tag: "skirmisher", stat: "cost", resource: "wood", mul: -0.5 },
  { tag: "cavArcher", stat: "cost", resource: "wood", mul: -0.5 },
  { tag: "warship", stat: "cost", resource: "wood", mul: -0.2 },
  { ids: [211, 212, 219, 140, 64], stat: "cost", set: 0 },
]);
addBonus("Magyars", [
  { tag: "scout", stat: "cost", mul: -0.15 },
  { ids: [67, 68, 75], stat: "cost", set: 0 },
]);
addBonus("Malay", [
  { ids: AGES, stat: "research", rate: 1.66 },
  { ids: [74, 76, 77], stat: "cost", set: 0 },
  { ids: [1132, 1134], stat: "cost", mulByAge: { 3: -0.25, 4: -0.35 } },
  { ids: [199], stat: "cost", mul: -0.33 },
]);
addBonus("Malians", [
  { tag: "building", stat: "cost", resource: "wood", mul: -0.15 },
]);
addBonus("Mapuche", [
  { tag: "infantry", stat: "hp", addByAge: { 2: 5, 3: 10, 4: 15 } },
  { tag: "skirmisher", stat: "hp", addByAge: { 2: 5, 3: 10, 4: 15 } },
  { ids: [185], stat: "hp", addByAge: { 2: 5, 3: 10, 4: 15 } },
]);
addBonus("Muisca", [
  { ids: AGES, stat: "cost", resource: "gold", mul: -0.5 },
  { ids: [2556], stat: "cost", mul: -0.33 },
  { ids: [2552, 2554], stat: "melee", addByAge: { 2: 1, 3: 2, 4: 3 } },
  { buildingId: 87, use: "Unit", stat: "melee", addByAge: { 2: 1, 3: 2, 4: 3 } },
  { ids: [48, 15], stat: "cost", set: 0 },
]);
addBonus("Persians", [
  { buildingIds: [109, 45], use: "Unit", stat: "train", rateByAge: { 1: 1.05, 2: 1.1, 3: 1.15, 4: 1.2 } },
]);
addBonus("Poles", [
  { ids: [435], stat: "cost", resource: "food", mul: -0.5 },
]);
addBonus("Portuguese", [
  { use: "Unit", stat: "cost", resource: "gold", mul: -0.2 },
  { tag: "ship", stat: "hp", mulByAge: { 2: 0.1, 3: 0.15, 4: 0.2 } },
]);
addBonus("Romans", [
  { tag: "scorpion", stat: "cost", resource: "gold", mul: -0.5 },
  { ids: [1795], stat: "melee", add: 1 },
  { ids: [1795], stat: "pierce", add: 1 },
]);
addBonus("Saracens", [
  { ids: [84], stat: "cost", resource: "wood", add: -100 },
  { tag: "camel", stat: "hp", mul: 0.25 },
]);
addBonus("Shu", [
  { buildingId: 87, use: "Tech", stat: "cost", mul: -0.25 },
  { ids: ARCHER_BLACKSMITH, stat: "cost", mul: -0.25 },
  { tag: "siege", stat: "speed", mulByAge: { 3: 0.1, 4: 0.15 } },
  { ids: [420, 691, 1795, 2633, 1948], stat: "speed", mulByAge: { 3: 0.1, 4: 0.15 } },
]);
addBonus("Sicilians", [
  { ids: FORTIFICATIONS, stat: "train", rate: 1.5 },
  { ids: [109], stat: "train", rate: 2 },
]);
addBonus("Slavs", [
  { ids: [602, 875], stat: "cost", set: 0 },
  { buildingId: 49, use: "Unit", stat: "cost", mul: -0.15 },
  { ids: [125], stat: "speed", mul: 0.2 },
]);
addBonus("Spanish", [
  { buildingId: 103, use: "Tech", stat: "cost", resource: "gold", set: 0 },
  { tag: "gunpowder", stat: "reload", rate: 1.18 },
]);
addBonus("Tatars", [
  { ids: [437, 436], stat: "cost", set: 0 },
]);
addBonus("Teutons", [
  { ids: [50], stat: "cost", mul: -0.4 },
  { ids: [109], stat: "garrison", add: 10 },
  { tag: "tower", stat: "garrison", add: 5 },
  { ids: [322, 441], stat: "cost", set: 0 },
]);
addBonus("Tupi", [
  { buildingIds: [87, 12], use: "Tech", stat: "cost", resource: "food", mul: -0.5 },
]);
addBonus("Turks", [
  { ids: [47], stat: "cost", set: 0 },
  { ids: [64], stat: "cost", mul: -0.5 },
]);
addBonus("Varangians", [
  { ids: [2703, 2704], stat: "reload", rate: 1.25 },
  { ids: [250, 533, 2633], stat: "reload", rate: 1.15 },
]);
addBonus("Vietnamese", [
  { buildingIds: ECO_BUILDINGS, use: "Tech", stat: "cost", resource: "wood", set: 0 },
  { ids: [22, 213, 249, 8, 280], stat: "cost", resource: "wood", set: 0 },
  { buildingIds: ECO_BUILDINGS, use: "Tech", stat: "research", rate: 2 },
  { ids: [22, 213, 249, 8, 280], stat: "research", rate: 2 },
  { ids: [315], stat: "cost", set: 0 },
]);
addBonus("Wei", [
  { ids: [1944, 1946, 1952], stat: "hp", mulByAge: { 3: 0.2, 4: 0.3 } },
  { ids: [1942, 1948], stat: "cost", mul: -0.25 },
]);
addBonus("Wu", [
  { ids: [1974], stat: "attack", add: 2 },
  { ids: [1944, 1946], stat: "attack", add: 2, minAge: 4 },
  { ids: [374, 375], stat: "cost", set: 0 },
]);
addBonus("Bengalis", [
  { ids: [125], stat: "melee", add: 3 },
  { ids: [125], stat: "pierce", add: 3 },
]);
addBonus("Armenians", [
  { ids: [1808], stat: "cost", mul: -0.25 },
]);
addBonus("Saxons", [
  { ids: [250, 533, 2633], stat: "hp", mul: 0.2 },
]);

const MILITIA = [74, 75, 77, 473, 567];
const SPEAR = [93, 358, 359, 1786, 1787, 1788];
const EAGLE = [751, 752, 753];
const U = true;

addBonus("Goths", [
  { unique: U, buildingId: 12, use: "Unit", stat: "train", rate: 2 },
]);
addBonus("Franks", [
  { unique: U, ids: [2700], stat: "cost", resource: "gold", mul: -0.4 },
  { unique: U, buildingId: 101, use: "Unit", stat: "train", rate: 1.4 },
]);
addBonus("Britons", [
  { unique: U, tag: "footArcher", stat: "range", add: 1 },
  { unique: U, tag: "skirmisher", stat: "range", add: 1 },
  { unique: U, tag: "tower", stat: "attack", add: 2 },
]);
addBonus("Aztecs", [
  { unique: U, tag: "skirmisher", stat: "attack", add: 1 },
  { unique: U, tag: "skirmisher", stat: "range", add: 1 },
  { unique: U, tag: "infantry", stat: "attack", add: 4 },
]);
addBonus("Armenians", [
  { unique: U, tag: "galley", stat: "range", add: 1 },
  { unique: U, ids: [1795], stat: "range", add: 1 },
  { unique: U, tag: "infantry", exclude: SPEAR, stat: "hp", add: 30 },
]);
addBonus("Bengalis", [
  { unique: U, tag: "elephant", stat: "reload", rate: 1.2 },
  { unique: U, ids: [1759, 1761], stat: "reload", rate: 1.2 },
]);
addBonus("Bohemians", [
  { unique: U, tag: "gunpowder", stat: "speed", mul: 0.1 },
  { unique: U, stat: "shift", from: "gold", to: "food", ids: [125] },
  { unique: U, stat: "shift", from: "gold", to: "food", buildingId: 104, use: "Tech" },
]);
addBonus("Bulgarians", [
  { unique: U, tag: "cavalry", stat: "reload", rate: 1.33 },
  { unique: U, ids: MILITIA, stat: "melee", add: 5 },
]);
addBonus("Burmese", [
  { unique: U, tag: "cavalry", stat: "vs", vs: "vsRanged", add: 4 },
  { unique: U, ids: [1132, 1134], stat: "melee", add: 1 },
  { unique: U, ids: [1132, 1134], stat: "pierce", add: 1 },
]);
addBonus("Byzantines", [
  { unique: U, ids: [1103, 529, 532], stat: "range", add: 1 },
]);
addBonus("Celts", [
  { unique: U, ids: [82], stat: "reload", rate: 1.33 },
  { unique: U, tag: "tower", stat: "reload", rate: 1.33 },
  { unique: U, tag: "siege", stat: "hp", mul: 0.4 },
]);
addBonus("Chinese", [
  { unique: U, ids: [117, 155, 487, 79, 234, 235, 236], stat: "hp", mul: 0.3 },
  { unique: U, tag: "scorpion", stat: "attack", mul: 0.25 },
  { unique: U, ids: [1904, 1907, 1948], stat: "attack", mul: 0.25 },
]);
addBonus("Cumans", [
  { unique: U, tag: "scout", stat: "train", rate: 2 },
  { unique: U, tag: "steppe", stat: "train", rate: 2 },
  { unique: U, tag: "cavArcher", stat: "train", rate: 2 },
]);
addBonus("Danes", [
  { unique: U, tag: "mangonel", stat: "range", add: 1 },
  { unique: U, ids: [2633], stat: "range", add: 1 },
  { unique: U, tag: "siege", stat: "vs", vs: "vsBuildings", add: 40, pct: true },
  { unique: U, ids: [420, 691, 1795, 2633, 1948], stat: "vs", vs: "vsBuildings", add: 40, pct: true },
]);
addBonus("Gurjaras", [
  { unique: U, tag: "military", stat: "cost", resource: "food", mul: -0.25 },
  { unique: U, tag: "camel", stat: "melee", add: 4 },
  { unique: U, tag: "elephantArcher", stat: "melee", add: 4 },
]);
addBonus("Hindustanis", [
  { unique: U, ids: [5], stat: "range", add: 2 },
]);
addBonus("Incas", [
  { unique: U, ids: [185], stat: "attack", add: 1 },
  { unique: U, ids: [879, 881, 185, 2552, 2554], stat: "melee", add: 1 },
  { unique: U, ids: [879, 881, 185, 2552, 2554], stat: "pierce", add: 1 },
]);
addBonus("Italians", [
  { unique: U, ids: [128, 17], stat: "cost", mul: -0.5 },
]);
addBonus("Khmer", [
  { unique: U, ids: [1132, 1134], stat: "attack", add: 3 },
]);
addBonus("Koreans", [
  { unique: U, tag: "tower", stat: "range", add: 2 },
  { unique: U, ids: [1904, 1907, 831, 832], stat: "range", add: 1 },
]);
addBonus("Lithuanians", [
  { unique: U, ids: [109], stat: "range", add: 3 },
  { unique: U, tag: "spearman", stat: "pierce", add: 2 },
  { unique: U, tag: "skirmisher", stat: "pierce", add: 2 },
]);
addBonus("Magyars", [
  { unique: U, stat: "shift", from: "gold", to: "food", ids: [869, 871] },
  { unique: U, tag: "cavArcher", stat: "attack", add: 1 },
  { unique: U, tag: "cavArcher", stat: "range", add: 1 },
]);
addBonus("Malay", [
  { unique: U, stat: "shift", from: "gold", to: "food", ids: MILITIA },
]);
addBonus("Malians", [
  { unique: U, tag: "cavalry", stat: "attack", add: 5 },
]);
addBonus("Mayans", [
  { unique: U, ids: EAGLE, stat: "hp", add: 40 },
]);
addBonus("Mongols", [
  { unique: U, buildingId: 49, use: "Unit", stat: "speed", mul: 0.5 },
]);
addBonus("Muisca", [
  { unique: U, tag: "footArcher", stat: "speed", mul: 0.15 },
  { unique: U, ids: [2552, 2554], stat: "speed", mul: 0.15 },
  { unique: U, ids: [185], stat: "range", add: 1 },
  { unique: U, ids: [185], stat: "train", rate: 1.5 },
]);
addBonus("Persians", [
  { unique: U, stat: "shift", from: "gold", to: "wood", tag: "footArcher" },
  { unique: U, ids: [82], stat: "attack", add: 4 },
  { unique: U, ids: [82], stat: "vs", vs: "vsRams", add: 3 },
  { unique: U, ids: [82], stat: "vs", vs: "vsInfantry", add: 3 },
]);
addBonus("Poles", [
  { unique: U, tag: "knight", stat: "cost", resource: "gold", mul: -0.6 },
]);
addBonus("Portuguese", [
  { unique: U, tag: "ship", stat: "train", rate: 1.33 },
]);
addBonus("Romans", [
  { unique: U, tag: "scorpion", stat: "reload", rate: 1.33 },
  { unique: U, tag: "galley", stat: "attack", add: 2 },
  { unique: U, ids: MILITIA, stat: "train", rate: 1.5 },
  { unique: U, tag: "knight", stat: "train", rate: 1.5 },
  { unique: U, ids: [1790, 1792], stat: "train", rate: 1.5 },
]);
addBonus("Saracens", [
  { unique: U, ids: [331], stat: "attack", mul: 0.15 },
  { unique: U, tag: "mangonel", stat: "attack", mul: 0.15 },
]);
addBonus("Spanish", [
  { unique: U, ids: [775], stat: "range", add: 1 },
  { unique: U, ids: [83], stat: "hp", add: 40 },
  { unique: U, ids: [83], stat: "attack", add: 6 },
  { unique: U, ids: [83], stat: "melee", add: 2 },
  { unique: U, ids: [83], stat: "pierce", add: 2 },
]);
addBonus("Tatars", [
  { unique: U, tag: "scout", stat: "melee", add: 1 },
  { unique: U, tag: "scout", stat: "pierce", add: 1 },
  { unique: U, tag: "steppe", stat: "melee", add: 1 },
  { unique: U, tag: "steppe", stat: "pierce", add: 1 },
  { unique: U, tag: "cavArcher", stat: "melee", add: 1 },
  { unique: U, tag: "cavArcher", stat: "pierce", add: 1 },
  { unique: U, ids: [331], stat: "range", add: 2 },
]);
addBonus("Teutons", [
  { unique: U, tag: "siege", stat: "melee", add: 4 },
  { unique: U, ids: [82], stat: "range", add: 3 },
]);
addBonus("Tupi", [
  { unique: U, ids: [2552, 2554, 185], stat: "reload", rate: 1.25 },
]);
addBonus("Turks", [
  { unique: U, tag: "cavArcher", stat: "hp", add: 20 },
  { unique: U, ids: [236, 36, 420, 691], stat: "range", add: 2 },
]);
addBonus("Vikings", [
  { unique: U, tag: "infantry", stat: "vs", vs: "vsCavalry", add: 5 },
  { unique: U, tag: "infantry", stat: "vs", vs: "vsCamels", add: 4 },
  { unique: U, tag: "footArcher", stat: "attack", add: 1 },
  { unique: U, ids: [250, 533], stat: "attack", add: 1 },
]);
addBonus("Vietnamese", [
  { unique: U, ids: [1132, 1134], stat: "hp", add: 100 },
]);
addBonus("Wei", [
  { unique: U, tag: "cavalry", stat: "melee", add: 4 },
  { unique: U, tag: "cavArcher", stat: "melee", add: 4 },
]);
addBonus("Slavs", [
  { unique: U, stat: "shift", from: "stone", to: "wood", portion: 0.4, ids: [82, 79, 234, 235] },
]);
addBonus("Sicilians", [
  { unique: U, tag: "knight", stat: "melee", add: 1 },
  { unique: U, tag: "knight", stat: "pierce", add: 2 },
]);
addBonus("Mapuche", [
  { unique: U, ids: [2569, 2571, 2566, 2568], stat: "cost", mul: -0.15 },
  { unique: U, ids: [2569, 2571, 185, 7, 6, 1155], stat: "note", label: "passThrough" },
]);
addBonus("Georgians", [
  { unique: U, ids: [79, 234, 235, 82, 1806], stat: "attack", add: 2 },
  { unique: U, ids: [79, 234, 235], stat: "note", label: "passThrough" },
]);
addBonus("Berbers", [
  { unique: U, buildingId: 82, use: "Unit", stat: "train", rate: 1.25 },
  { unique: U, buildingId: 82, use: "Tech", stat: "research", rate: 1.25 },
]);
addBonus("Saxons", [
  { unique: U, ids: [125], stat: "train", rate: 1.33 },
]);
addBonus("Italians", [
  { unique: U, ids: [5], stat: "note", label: "passThrough", text: "+15%" },
]);
addBonus("Ethiopians", [
  { unique: U, ids: [1016, 1018, 329, 330, 207], stat: "note", label: "fromCavalry", text: "−3" },
]);

TAGS.spearman = [93, 358, 359, 1786, 1787, 1788];
TAG_SETS.spearman = new Set(TAGS.spearman);

function tagsOf(node) {
  const tags = new Set();
  if (!node) return tags;
  if (node.useType === "Building") tags.add("building");
  if (node.useType === "Tech") tags.add("tech");
  if (node.useType === "Unit" && !TAG_SETS.eco.has(node.nodeId)) tags.add("military");
  for (const [tag, ids] of Object.entries(TAG_SETS)) {
    if (ids.has(node.nodeId)) tags.add(tag);
  }
  return tags;
}

function matchingRules(civKey, node, stat, resource) {
  const rules = BONUSES[civKey] || [];
  const tags = tagsOf(node);
  return rules.filter((rule) => {
    if (rule.stat !== stat) return false;
    if (rule.use && node.useType !== rule.use) return false;
    if (rule.tag && !tags.has(rule.tag)) return false;
    if (rule.ids && !rule.ids.includes(node.nodeId)) return false;
    if (rule.exclude && rule.exclude.includes(node.nodeId)) return false;
    if (rule.buildingId && node.buildingId !== rule.buildingId) return false;
    if (rule.buildingIds && !rule.buildingIds.includes(node.buildingId)) return false;
    if (rule.resource && rule.resource !== resource) return false;
    if (rule.minAge && node.age < rule.minAge) return false;
    const ageHit = (rule.mulByAge && rule.mulByAge[node.age] !== undefined)
      || (rule.addByAge && rule.addByAge[node.age] !== undefined)
      || (rule.rateByAge && rule.rateByAge[node.age] !== undefined);
    const scalar = rule.mul || rule.add || rule.rate || rule.set !== undefined;
    if ((rule.mulByAge || rule.addByAge || rule.rateByAge) && !ageHit && !scalar) return false;
    return true;
  });
}

function roundStat(stat, value) {
  if (stat === "speed" || stat === "reload") return Math.round(value * 100) / 100;
  return Math.round(value);
}

function applyRule(value, rule, node, stat) {
  const mul = rule.mulByAge ? rule.mulByAge[node.age] : rule.mul;
  if (mul) value *= 1 + mul;
  const add = rule.addByAge ? rule.addByAge[node.age] || 0 : rule.add || 0;
  if (add) value += add;
  const rate = rule.rateByAge ? rule.rateByAge[node.age] : rule.rate;
  if (rate) value /= rate;
  if (rule.set !== undefined) value = rule.set;
  if (stat === "cost" || stat === "research" || stat === "train") value = Math.max(0, value);
  return roundStat(stat, value);
}

function applyCivRules(value, rules, node, stat) {
  for (const rule of rules) {
    if (!rule.unique) value = applyRule(value, rule, node, stat);
  }
  for (const rule of rules) {
    if (rule.unique) value = applyRule(value, rule, node, stat);
  }
  return value;
}

function adjustedStat(civKey, node, stat, base, resource, allyKeys) {
  const roundedBase = roundStat(stat, Number(base));
  const empty = { base: roundedBase, delta: 0, unique: 0, ally: 0 };
  if ((!civKey && !(allyKeys || []).length) || base === undefined || base === null) return empty;
  let value = Number(base);
  if (civKey) value = applyCivRules(value, matchingRules(civKey, node, stat, resource), node, stat);
  const afterPrimary = roundStat(stat, value);
  const afterCiv = civKey
    ? roundStat(stat, applyCivRules(Number(base), matchingRules(civKey, node, stat, resource).filter((rule) => !rule.unique), node, stat))
    : roundedBase;
  value = afterPrimary;
  for (const ally of allyKeys || []) {
    if (!ally || ally === civKey) continue;
    value = applyCivRules(value, matchingRules(ally, node, stat, resource), node, stat);
  }
  const finalRounded = roundStat(stat, value);
  return {
    base: roundedBase,
    delta: roundStat(stat, afterCiv - roundedBase),
    unique: roundStat(stat, afterPrimary - afterCiv),
    ally: roundStat(stat, finalRounded - afterPrimary),
  };
}

function shiftCost(result, rules, field) {
  for (const rule of rules) {
    const from = result[rule.from];
    if (!from) continue;
    const current = from.base + from.delta + from.unique + from.ally;
    const portion = rule.portion === undefined ? 1 : rule.portion;
    const moved = roundStat("cost", current * portion);
    if (!moved) continue;
    from[field] -= moved;
    if (!result[rule.to]) result[rule.to] = { base: 0, delta: 0, unique: 0, ally: 0 };
    result[rule.to][field] += moved;
  }
}

function adjustedCost(civKey, node, cost, allyKeys) {
  const result = {};
  for (const [resource, amount] of Object.entries(cost || {})) {
    result[resource] = adjustedStat(civKey, node, "cost", amount, resource, allyKeys);
  }
  if (civKey) shiftCost(result, matchingRules(civKey, node, "shift"), "unique");
  for (const ally of allyKeys || []) {
    if (!ally || ally === civKey) continue;
    shiftCost(result, matchingRules(ally, node, "shift"), "ally");
  }
  return result;
}

function bonusLinesFor(civKey, node, ally) {
  const lines = [];
  for (const stat of ["vs", "bonusPct"]) {
    for (const rule of matchingRules(civKey, node, stat)) {
      const amount = rule.addByAge ? rule.addByAge[node.age] || 0 : rule.add || 0;
      if (!amount) continue;
      lines.push({
        label: stat === "bonusPct" ? "bonusDamage" : rule.vs,
        text: stat === "bonusPct" || rule.pct ? `+${amount}%` : `+${amount}`,
        unique: Boolean(rule.unique) && !ally,
        ally,
      });
    }
  }
  for (const rule of matchingRules(civKey, node, "note")) {
    lines.push({
      label: rule.label,
      text: rule.text || "",
      unique: Boolean(rule.unique) && !ally,
      ally,
    });
  }
  return lines;
}

function bonusAgainst(civKey, node, allyKeys) {
  if (!node) return [];
  const lines = civKey ? bonusLinesFor(civKey, node, false) : [];
  for (const ally of allyKeys || []) {
    if (!ally || ally === civKey) continue;
    lines.push(...bonusLinesFor(ally, node, true));
  }
  return lines;
}
