import { Index, untrack } from 'solid-js';
import { $bigCard, $slideCards, $tempCards } from '../stores/Cards';
import CardImage from './CardImage';
import QuickCardDetails from './QuickCardDetails';
import { useStore } from '@nanostores/solid';
import { $selectedCard } from './PrettyMuchTheIndexPage.jsx';

const CardStackedVerticalList = (props) => {

    // console.log(cards);
    const _selectedCard = useStore($selectedCard);

    return (
        <div class={'grid grid-cols-1 gap-1 pt-0 mx-auto round ' + (props.singleCol != true ? ' md:grid-cols-2 lg:grid-cols-2' : null)}>
            <For each={props.cards}>
                {(card) =>
                <div 
                // href={'/card/' + (card['scryfall_id'] + '').replaceAll('/', '\/')} 
                  class={'p-2 col rounded-md hov_accent hover:cursor-pointer ' + 
                (_selectedCard()['id'] != undefined && _selectedCard()['id'] == card['id'] ? ' accent' :  'bg-surface_200')}
                    onClick={(e) => {
                        // deepcopy because stores return a proxy for each field of the object which updated the card on the list as well as the big card.
                        // I don't fully understand it, but it has to do with how solidjs tracks reactivity.
                        let deepCopy = JSON.parse(JSON.stringify(card));
                        $selectedCard.set(deepCopy);
                        props.handleCardClick != undefined ?
                        props.handleCardClick() : null;
                    }}
                >
                    <div class='h-20 flex justify-start transition duration-300 bg-surface_200'>
                        {card['small'] != undefined ?
                            <CardImage imageUrl={card['small'][0]} growOnHover={true} />
                            : ""
                        }
                        {/* {console.log(card())} */}
                        <QuickCardDetails cardJSON={card} />
                    </div>
                </div>
                }
            </For>
        </div>
    );
};

export default CardStackedVerticalList;