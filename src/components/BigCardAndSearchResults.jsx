import { Show, createEffect, createSignal } from "solid-js";
import BigCardDetails from "./BigCardDetails";
import SlideDownSearchResults from "./SlideDownSearchResults";
import { useStore } from "@nanostores/solid";
import { $bigCard, $slideCards } from "../stores/Cards";
import { $selectedCard } from "./PrettyMuchTheIndexPage.jsx";

const BigCardAndSearchResults = (props) => {
    const [cards, setcards] = createSignal();

    const _selectedCard = useStore($selectedCard);
    const sideCards = useStore($slideCards);

    return (
        <div class='flex '>
            <div class='w-4/5 bg-surface_200 rounded-2xl '>
                <Show when={_selectedCard()['name'] != undefined} >
                    <BigCardDetails card={_selectedCard()} />
                </Show>
            </div>
            <div class='w-1/5'>
                <Show when={sideCards().length != 0}>
                    <SlideDownSearchResults />
                </Show>
            </div>
        </div>
    );
}
export default BigCardAndSearchResults;