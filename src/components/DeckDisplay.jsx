import { createEffect, createSignal } from "solid-js";
import CardGridList from "./CardGridList.jsx";



const DeckDisplay = (props) => {

    const [cards, setCards] = createSignal();
    const [deck, setDeck] = createSignal({name:''});

    createEffect(async () => {
        if (props.deckId != null && props.deckId != undefined) {
            const res = await fetch("https://" + 'staging.jothebanner.dev/api/deck/' + props.deckId + '.json');
            const data = await res.json();
            setCards(data.cardsData);
            setDeck(data.deckData);
            console.log(cards())
            console.log(deck().name)
        }
    })

    return (
        <div class='h-4'>
            <div class='pl-2 text-2xl font-bold'>{deck().name}</div>
            <CardGridList cards={cards()} />
        </div>
    );
}

export default DeckDisplay;