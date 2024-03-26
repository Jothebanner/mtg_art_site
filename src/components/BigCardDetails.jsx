import { For, Show, createEffect, createSignal } from "solid-js";
import CardImage from "./CardImage";
import '../styles/AccordionAnimation.css';

const BigCardDetails = (props) => {
    // const [bigCardUrl, setBigCardUrl] = createSignal('');
    const [selectedImage, setSelectedImage] = createSignal('');
    const [rulings, setRulings] = createSignal();
    const [similarNames, setSimilarNames] = createSignal({});
    const [awesomeButtonName, setAwesomeButtonName] = createSignal("Add to Deck Of Awesome! :D");

    const simpleFields = ['color_identity', 'colors', 'mana_cost', 'type_line'];
    const arrayFields = ['cmc', 'power', 'toughness',];
    const namedObjectFields = [{ 'fieldTitle': 'Converted Mana Cost', 'fieldName': 'cmc' }, { 'fieldTitle': 'Power', 'fieldName': 'power' }, { 'fieldTitle': 'Toughness', 'fieldName': 'toughness' }, { 'fieldTitle': 'Mana Cost', 'fieldName': 'mana_cost' }, { 'fieldTitle': 'Type', 'fieldName': 'type_line' },]
    const namedObjectArrayFields = [{ 'fieldTitle': 'Colors', 'fieldName': 'colors' }, { 'fieldTitle': 'Color Identity', 'fieldName': 'color_identity' }]


    // const cardFromStore = useStore($bigCard);
    // const bigUrl = useStore($bigCardUrl);

    createEffect(() => {
        // console.log("props");
        console.log(props.card);
        // if the card changes then reset the selected image
        if (props.card['image_uris'] != undefined)
            setSelectedImage(props.card['image_uris']['normal']);
        else {
            setSelectedImage(null);
            console.log("Error: " + "image_uris didn't work")
        }
    })

    createEffect(() => {
        // if the card has rules then fetch them and store in signal
        if (props.card['rulings_uri'] != undefined) {
            fetchRulings(props.card['rulings_uri']);
        }
    })

    createEffect(async () => {
        // if the card has alternative faces then fetch them and store in signal
        if (props.card['id'] != undefined) {
            const res = await fetch('/api/cards/' + props.card['id'] + '.json');
            setSimilarNames(await res.json());
            console.log(similarNames());
        }
        else {
            console.log("none similar names")
        }
    })

    const fetchRulings = async (uri) => {

        const res = await fetch(uri);
        const rulingsJson = await res.json();
        setRulings(rulingsJson['data']);
    }

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
        <div class="p-4">

            <button
                class="bg-surface_300 p-3 m-2 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
                onclick={() => AddToDeckOfAwesome()}>{awesomeButtonName()}
            </button>

            <div class='flex flex-col md:flex-row'>

                {console.log("It tryna load")}
                <div class="md:w-2/5">
                    <CardImage imageUrl={selectedImage()} />
                </div>

                <div class='flex flex-col p-4 rounded ml-4 md:w-3/5 border shadow-lg'>

                    <div class="text-xl font-bold self-center">{props.card['name']}</div>
                    <For each={namedObjectArrayFields}>
                        {(field) =>
                            <Show when={props.card[field['fieldName']] != undefined}>
                                <div>{field['fieldTitle']}: {props.card[field['fieldName']][0]}</div>
                            </Show>
                        }
                    </For>
                    <For each={namedObjectFields}>
                        {(field) =>
                            <Show when={props.card[field['fieldName']] != undefined}>
                                <div>{field['fieldTitle']}: {props.card[field['fieldName']]}</div>
                            </Show>
                        }
                    </For>
                    <Show when={props.card['oracle_text'] != undefined || props.card['flavor_text'] != undefined}>

                        <div class='my-2 py-2 border-t border-b'>
                            <Show when={props.card['oracle_text'] != undefined}>
                                <div class='whitespace-pre-wrap'>{props.card['oracle_text']}</div>
                            </Show>
                            <Show when={props.card['flavor_text'] != undefined}>
                                <div class='italic pt-2 whitespace-pre-wrap' >{props.card['flavor_text']}</div>
                            </Show>

                        </div>
                    </Show>
                </div>

            </div>

            <div class="flex-row">

                <div class='flex flex-row pl-4 overflow-x-scroll'>
                    <Show when={similarNames().length > 1}>
                        <For each={similarNames()}>
                            {(similarCard) =>
                                <Show when={similarCard['image_uris'] != undefined}>
                                    <div class="m-1 border-2 border-transparent hover:cursor-pointer hover:border-dark_accent hover:border-2" onclick={() => {
                                        setSelectedImage(similarCard['image_uris']['normal']);
                                    }}>
                                        <CardImage small={true} imageUrl={similarCard['image_uris']['normal']} />
                                    </div>
                                </Show>
                            }
                        </For>
                    </Show>
                </div>

                <Show when={rulings() != null && rulings()[0] != undefined}>
                    <div class='mt-5'>
                        <div class='font-bold text-lg'>
                            Rulings
                        </div>
                        <For each={rulings()}>
                            {(ruling) =>
                                <div class='m-2'>
                                    <details open class=''>
                                        <summary class='border-b'>
                                            <span>{ruling['published_at']}</span>
                                        </summary>
                                    </details>
                                    <div class='content'>
                                        {ruling['comment']}
                                    </div>
                                </div>
                            }
                        </For>
                    </div>
                </Show>
            </div>

        </div>
    );
}
export default BigCardDetails;