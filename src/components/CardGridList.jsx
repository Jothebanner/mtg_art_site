import { $bigCard } from '../stores/Cards';
import CardImage from './CardImage';
import { $selectedCard } from './PrettyMuchTheIndexPage.jsx';
import QuickCardDetails from './QuickCardDetails';

const CardGridList = (props) => {

    return (
        <div class={'grid grid-flow-row grid-cols-9 bg-surface_200 justify-items-center justify-center gap-1 pt-0 mx-auto round '}
        //  + (props.singleCol != true ? ' md:grid-cols-2 lg:grid-cols-2' : null)}
        >
            <For each={props.cards}>
                {(card) =>
                    <div
                        class={'rounded-md hov_accent hover:cursor-pointer '}
                        onClick={(e) => {
                            let deepCopy = JSON.parse(JSON.stringify(card));
                            $selectedCard.set(deepCopy.card_id);

                            console.log(deepCopy.card_id);

                            window.history.pushState({ deepCopy }, '', '/?card=' + deepCopy.card_id.id);


                            props.handleCardClick != undefined ?
                                props.handleCardClick() : null;
                        }}
                    >
                        <div class="p-1 bg-surface_200">
                            <div class='transition duration-300 bg-surface_200 max-w-28'>
                                {card['card_id']['image_uris']['normal'] != undefined ?
                                    <CardImage imageUrl={card['card_id']['image_uris']['normal']} growOnHover={true} />
                                    : ""
                                }
                                <div class='hover:flex'>
                                    <QuickCardDetails cardJSON={card} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </For>
        </div>
    );
};

export default CardGridList;