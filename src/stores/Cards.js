import { atom, deepMap, listenKeys, map } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent';

export const $tempCards = atom([]);
export const $searchbarFocused = atom(false);
export const $bigCard = deepMap({});
// listenKeys($bigCard, ['id',], () =>
// {
//     // console.log($bigCard.get());
// })
export const $slideCards = atom([]);

export const $bigCardUrl = atom('');
// export const setTheCard = (card) =>
// {
//     theCard.set(card);
//     console.log(card);
//     console.log(theCard.get());
// }

export const $cardsILove = atom([{
    "scryfall_id": [
      "599234de-4bbc-4c9b-84a2-c426e64597ff"
    ],
    "cmc": [
      "3.0"
    ],
    "name": [
      "Field-Tested Frying Pan"
    ],
    "name_search": "Field-Tested Frying Pan",
    "type_line": [
      "Artifact — Equipment"
    ],
    "artist_ids": [
      "ae717001-28ec-46e3-a07e-f16b6deaf9e2"
    ],
    "small": [
      "https://cards.scryfall.io/small/front/5/9/599234de-4bbc-4c9b-84a2-c426e64597ff.jpg?1695448351"
    ],
    "normal": [
      "https://cards.scryfall.io/normal/front/5/9/599234de-4bbc-4c9b-84a2-c426e64597ff.jpg?1695448351"
    ],
    "large": [
      "https://cards.scryfall.io/large/front/5/9/599234de-4bbc-4c9b-84a2-c426e64597ff.jpg?1695448351"
    ],
    "id": "Field-Tested Frying Pan_599234de-4bbc-4c9b-84a2-c426e64597ff",
    "standard": "not_legal",
    "oldschool": "not_legal",
    "historicbrawl": "not_legal",
    "historic": "not_legal",
    "legacy": "legal",
    "paupercommander": "not_legal",
    "oathbreaker": "legal",
    "artist": "Nino Is",
    "gladiator": "not_legal",
    "alchemy": "not_legal",
    "pioneer": "not_legal",
    "commander": "legal",
    "modern": "not_legal",
    "pauper": "not_legal",
    "premodern": "not_legal",
    "_version_": 1786960399623520300,
    "future": "not_legal",
    "vintage": "legal",
    "duel": "legal",
    "explorer": "not_legal",
    "predh": "not_legal",
    "image_status": "lowres",
    "brawl": "not_legal",
    "penny": "not_legal",
    "color_identity": [
      "W"
    ],
    "colors": [
      "W"
    ],
    "mana_cost": [
      "{2}{W}"
    ],
    "oracle_text": [
      "When Field-Tested Frying Pan enters the battlefield, create a Food token, then create a 1/1 white Halfling creature token and attach Field-Tested Frying Pan to it.\nEquipped creature has \"Whenever you gain life, this creature gets +X/+X until end of turn, where X is the amount of life you gained.\"\nEquip {2}"
    ],
    "png": [
      "https://cards.scryfall.io/png/front/5/9/599234de-4bbc-4c9b-84a2-c426e64597ff.png?1695448351"
    ],
    "art_crop": [
      "https://cards.scryfall.io/art_crop/front/5/9/599234de-4bbc-4c9b-84a2-c426e64597ff.jpg?1695448351"
    ],
    "border_crop": [
      "https://cards.scryfall.io/border_crop/front/5/9/599234de-4bbc-4c9b-84a2-c426e64597ff.jpg?1695448351"
    ]
  }, {
    "scryfall_id": [
      "5c1f3f52-cb9b-4b2a-bb02-6175897ae76e"
    ],
    "cmc": [
      "3.0"
    ],
    "color_identity": [
      "G"
    ],
    "colors": [
      "G"
    ],
    "mana_cost": [
      "{1}{G}{G}"
    ],
    "name": [
      "Our Market Research Shows That Players Like Really Long Card Names So We Made this Card to Have the Absolute Longest Card Name Ever Elemental"
    ],
    "name_search": "Our Market Research Shows That Players Like Really Long Card Names So We Made this Card to Have the Absolute Longest Card Name Ever Elemental",
    "oracle_text": [
      "Art rampage 2 (Whenever this creature becomes blocked by a creature, it gets +2/+2 for each creature in the blocker's art beyond the first.)"
    ],
    "power": [
      "2"
    ],
    "toughness": [
      "2"
    ],
    "type_line": [
      "Creature — Elemental"
    ],
    "artist_ids": [
      "020f967b-0d2f-4166-aabe-901dba8bc7ec"
    ],
    "flavor_text": [
      "Just call it OMRSTPLRLCNSWMTCTHTALCNEE for short."
    ],
    "small": [
      "https://cards.scryfall.io/small/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.jpg?1562488399"
    ],
    "normal": [
      "https://cards.scryfall.io/normal/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.jpg?1562488399"
    ],
    "large": [
      "https://cards.scryfall.io/large/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.jpg?1562488399"
    ],
    "png": [
      "https://cards.scryfall.io/png/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.png?1562488399"
    ],
    "art_crop": [
      "https://cards.scryfall.io/art_crop/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.jpg?1562488399"
    ],
    "border_crop": [
      "https://cards.scryfall.io/border_crop/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.jpg?1562488399"
    ],
    "id": "Our Market Research Shows That Players Like Really Long Card Names So We Made this Card to Have the Absolute Longest Card Name Ever Elemental_5c1f3f52-cb9b-4b2a-bb02-6175897ae76e",
    "standard": "not_legal",
    "oldschool": "not_legal",
    "historicbrawl": "not_legal",
    "historic": "not_legal",
    "legacy": "not_legal",
    "paupercommander": "not_legal",
    "oathbreaker": "not_legal",
    "artist": "Greg Hildebrandt",
    "gladiator": "not_legal",
    "alchemy": "not_legal",
    "pioneer": "not_legal",
    "commander": "not_legal",
    "modern": "not_legal",
    "pauper": "not_legal",
    "premodern": "not_legal",
    "_version_": 1786960400262103000,
    "future": "not_legal",
    "vintage": "not_legal",
    "duel": "not_legal",
    "explorer": "not_legal",
    "predh": "not_legal",
    "image_status": "highres_scan",
    "brawl": "not_legal",
    "penny": "not_legal"
  },]);
