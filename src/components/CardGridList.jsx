import { $bigCard } from '../stores/Cards';
import CardImage from './CardImage';
import QuickCardDetails from './QuickCardDetails';

const CardGridList = (props) => {

    return (
        <div class={'grid gap-1 pt-0 mx-auto round '}
        //  + (props.singleCol != true ? ' md:grid-cols-2 lg:grid-cols-2' : null)}
        >
            <For each={props.cards}>
                {(card) =>
                <div
                  class={'p-2 col rounded-md hov_accent hover:cursor-pointer '}
                    onClick={(e) => {
                        // deepcopy because stores return a proxy for each field of the object which updated the card on the list as well as the big card.
                        // I don't fully understand it, but it has to do with how solidjs tracks reactivity.
                        let deepCopy = JSON.parse(JSON.stringify(card));
                        $bigCard.set(deepCopy);
                        props.handleCardClick != undefined ?
                        props.handleCardClick() : null;
                    }}
                >
                    <div class='h-32 flex justify-start transition duration-300 bg-surface_200'>
                        {card['small'] != undefined ?
                            <CardImage imageUrl={card['small'][0]} growOnHover={true} />
                            : ""
                        }
                        <QuickCardDetails cardJSON={card} />
                    </div>
                </div>
                }
            </For>
        </div>
    );
};

export default CardGridList;