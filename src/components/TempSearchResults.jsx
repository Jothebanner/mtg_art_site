import { Show, createEffect, createSignal } from "solid-js";
import CardStackedVerticalList from "./CardStackedVerticalList";
import { useStore } from "@nanostores/solid";
import { $searchbarFocused, $slideCards, $tempCards } from "../stores/Cards";


const TempSearchResults = () => {
    const [showSearchResults, setShowSearchResults] = createSignal(false);
    const [mouseOverResults, setMouseOverResults] = createSignal(false);
    const [resultsFocused, setResultsFocused] = createSignal(false);

    const cards = useStore($tempCards);
    const searchFocused = useStore($searchbarFocused);

    $tempCards.listen(() => {
        // console.log("temp cards updated.");
    })

    // close the search bar if not in use
    createEffect(() => {
        if (searchFocused()) {
            setShowSearchResults(true);
        }
        else if(!mouseOverResults() && !resultsFocused())
            setShowSearchResults(false);
    })

    const reset = () => {
        setMouseOverResults(false);
        setResultsFocused(false);
    }

    // console.log(cards()[0]);
    return (
        <Show when={cards()[0] != undefined && showSearchResults()}>
            <div tabIndex={2} class='dark:bg-opacity-50 bg-opacity-50 w-3/4 m-auto rounded-b p-2 pt-0'
                // track if user is using the search results
                onfocusin={() => setResultsFocused(true)}
                onFocusOut={() => setResultsFocused(false)}
                onmouseenter={() => setMouseOverResults(true)}
                onMouseLeave={() => setMouseOverResults(false)}
            >
                <CardStackedVerticalList cards={cards()} handleCardClick={() => {reset(); $slideCards.set($tempCards.get()); }} />
            </div>
        </Show>
    );
}
export default TempSearchResults;