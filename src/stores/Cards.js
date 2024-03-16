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