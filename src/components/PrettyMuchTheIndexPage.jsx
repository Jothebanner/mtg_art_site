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

        window.addEventListener('popstate', event => {
            // console.log(event.state);
            $selectedCard.set(event.state.deepCopy);
        })

        onCleanup(() => {
            window.removeEventListener('popstate', event => {
                // console.log(event.state);
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

        // if there is no card in the url then save a state entry for the 'home page'
        if (cardParam == null) {
            window.history.replaceState({ deepCopy: {} }, '', '/'); // home page
        }

        // this has got some sort of big boi bug... idk I don't really want to deal with it right now.
        // I think this fixes it.
        // if _selected card already has a value then probably don't retrieve it again
        // (mostly because I don't want to fix the solr server yet lol)
        let resolvedProxy = JSON.parse(JSON.stringify(_selectedCard()));
        // I don't understand why, but resolvedProxy does not equal and empty object when compared.
        // so instead we're doing the lazy crackhead solution and getting it's values on every single 'page load' then just comparing the length
        // console.log(resolvedProxy);
        // console.log(Object.values(resolvedProxy));
        if (cardParam != null && Object.values(resolvedProxy).length == 0) {
            console.log('requesting card from index');
            try {
                const res = await fetch("https://" + 'staging.jothebanner.dev/card/id/' + cardParam + '.json');
                console.log(res);
                if (res.status == 404) {
                    console.log("404 card not found") // maybe send user to a 404 page or something
                }
                else {
                    const cardData = await res.json();
                    $selectedCard.set(cardData);
                    let cardName = cardData.name[0].replaceAll(' ', '_');
                    window.history.replaceState({ deepCopy: cardData }, '', '/?card=' + cardData.id);
                    // console.log("success!");
                    // console.log(cardData);
                }
            } catch (error) {
                console.log("Error retrieving card data: " + error)
            }
        }
    })


    return (
        <div class="w-full">
            <TempSearchResults client:load />
            {/* {console.log("selected card")}
            {console.log(_selectedCard())} */}

            {/* this will need to be cleaned up soon */}
            {_selectedCard() != undefined ? _selectedCard()['name'] != undefined ? (
                <div class="">
                    {console.log("hitting big card")}
                    <BigCardAndSearchResults client:visible />
                </div>
            ) :
                <div class="">
                    <DeckDisplay deckId={'65ebe3992debe412aff0ff8e'} />
                </div>
                :
                <div class="">
                    <DeckDisplay deckId={'65ebe3992debe412aff0ff8e'} />
                </div>
            }
        </div>
    )
}