import { createEffect, createSignal } from "solid-js";
import TempSearchResults from "./TempSearchResults.jsx";
import BigCardAndSearchResults from "./BigCardAndSearchResults.jsx";
import { $bigCard } from "../stores/Cards.js";
import DeckDisplay from "./DeckDisplay.jsx";

export const SearchIndexComponent = () => {

    const [selectedCard, setSelectedCard] = createSignal(null);

    createEffect(async () => {
        // console.log("hitting");
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        // console.log("search params " + urlSearchParams);
        console.log("params " + (Object.values(params)));
        const cardParam = urlSearchParams.get('card');
        console.log('card: ' + cardParam);

        if (cardParam != null) {
            const res = await fetch("https://" + 'staging.jothebanner.dev/card/' + cardParam + '.json');
            const cardData = await res.json();
            setSelectedCard(cardData);
            $bigCard.set(cardData);
        }
    })


    return (
        <div class="w-full">
            <TempSearchResults client:load />
            {selectedCard() != null ? (
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