import { Show, createEffect, createSignal } from "solid-js";
import BigCardDetails from "./BigCardDetails";
import SlideDownSearchResults from "./SlideDownSearchResults";
import { useStore } from "@nanostores/solid";
import { $bigCard, $slideCards } from "../stores/Cards";

const BigCardAndSearchResults = (props) => {
    const [cards, setcards] = createSignal();

    const mainCard = useStore($bigCard);
    const sideCards = useStore($slideCards);

    $bigCard.listen(() => console.log($bigCard.get()));

    return (
        <div class='flex '>
            <div class='w-4/5 bg-surface_200 rounded-2xl '>
                <Show when={mainCard()['name'] != undefined} >
                    <BigCardDetails card={mainCard()} />
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