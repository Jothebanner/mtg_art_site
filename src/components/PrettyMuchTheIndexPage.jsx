import { createEffect, onCleanup } from "solid-js";
import TempSearchResults from "./TempSearchResults.jsx";
import BigCardAndSearchResults from "./BigCardAndSearchResults.jsx";
import DeckDisplay from "./DeckDisplay.jsx";
import { deepMap } from "nanostores";
import { useStore } from "@nanostores/solid";

// export const [selectedCard, setSelectedCard] = createSignal();

export const $selectedCard = deepMap({});

export const SearchIndexComponent = () => {

    // const [selectedCard, setSelectedCard] = createSignal(null);

    const _selectedCard = useStore($selectedCard);

    createEffect(() => {

        window.addEventListener('popstate', event => 
        {
            console.log(event.state);
            $selectedCard.set(event.state.deepCopy);
        })

        onCleanup(() => {
            window.removeEventListener('popstate', event => 
            {
                console.log(event.state);
                $selectedCard.set(event.state.deepCopy);
            })
        })
    })

    createEffect(async () => {
        // console.log("hitting");
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const cardParam = urlSearchParams.get('card');
        console.log('card: ' + cardParam);

        // this has got some sort of big boi bug... idk I don't really want to deal with it right now.
        if (cardParam != null) {
            const res = await fetch("https://" + 'staging.jothebanner.dev/card/' + cardParam + '.json');
            const cardData = await res.json();
            $selectedCard.set(cardData);
            let cardName = cardData.name[0].replaceAll(' ', '_');
            window.history.replaceState({deepCopy:cardData}, '', '/?card=' + cardName);
        }
        else
            window.history.replaceState({deepCopy:{}}, '', '/');
    })


    return (
        <div class="w-full">
            <TempSearchResults client:load />
            {console.log(_selectedCard())}
            {_selectedCard()['name'] != undefined ? (
                <div class="">
                    <BigCardAndSearchResults client:visible />
                </div>
            ) :
                <div class="">
                    <DeckDisplay deckId={'65ebe3992debe412aff0ff8e'} />
                </div>
            }
        </div>
    )
}