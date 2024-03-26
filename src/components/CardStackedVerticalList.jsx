import CardImage from './CardImage';
import QuickCardDetails from './QuickCardDetails';
import { useStore } from '@nanostores/solid';
import { $selectedCard } from './PrettyMuchTheIndexPage.jsx';

const CardStackedVerticalList = (props) => {

    // console.log(cards);
    const _selectedCard = useStore($selectedCard);

    const requestCard = async (id) => {

        let cardData;
        try {
            const res = await fetch("https://" + 'staging.jothebanner.dev/card/id/' + id + '.json');
            console.log(res);
            if (res.status == 404) {
                console.log("404 card not found") // maybe send user to a 404 page or something
            }
            else {
                cardData = await res.json();
                console.log("it work!");
            }
        } catch (error) {
            console.log("Error retrieving card data: " + error)
        }

        window.history.replaceState({ deepCopy: cardData }, '', '/?card=' + cardData.id);
        $selectedCard.set(cardData);
    }

    return (
        <div class={'grid grid-cols-1 gap-1 pt-0 mx-auto round ' + (props.singleCol != true ? ' md:grid-cols-2 lg:grid-cols-2' : null)}>
            <For each={props.cards}>
                {(card) =>
                <div 
                  class={'p-2 col rounded-md hov_accent hover:cursor-pointer ' + 
                (_selectedCard()['id'] != undefined && _selectedCard()['id'] == card['id'] ? ' accent' :  'bg-surface_200')}
                    onClick={(e) => {
                        // deepcopy because stores return a proxy for each field of the object which updated the card on the list as well as the big card.
                        // I don't fully understand it, but it has to do with how solidjs tracks reactivity.
                        let deepCopy = JSON.parse(JSON.stringify(card));
                        
                        
                        // $selectedCard.set(deepCopy); //// replacing this with the request from the mongodb server
                        // I will weep with joy if this 'just' works
                        requestCard(deepCopy.scryfall_id[0]);

                        window.history.pushState({deepCopy}, '', '/?card=' + deepCopy.scryfall_id[0]);



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