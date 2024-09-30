import { createSignal } from "solid-js";

const DeckOfAwesomeControls = (props) => {

    const [awesomeButtonName, setAwesomeButtonName] = createSignal("Add to Deck Of Awesome! :D");

    const AddToDeckOfAwesome = async () => {
        const res = await fetch('/api/create-deck-entry', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ deck_id: "65ebe3992debe412aff0ff8e", card_id: props.card['_id'] }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res);
        if (res.status == 200) {
            setAwesomeButtonName("Successfully Added!")
        }
    }

    return (

        <button
            class="bg-surface_300 p-3 m-2 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
            onclick={() => AddToDeckOfAwesome()}>{awesomeButtonName()}
        </button>
    )

}