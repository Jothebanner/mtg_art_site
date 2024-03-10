import { For, Show, createEffect, createSignal } from "solid-js";
import CardImage from "./CardImage";
import { useStore } from "@nanostores/solid";
import { $bigCard, $bigCardUrl } from "../stores/Cards";
import { listenKeys } from "nanostores";
import { Dynamic } from "solid-js/web";
import '../styles/AccordionAnimation.css';

const BigCardDetails = (props) => {
    // const [bigCardUrl, setBigCardUrl] = createSignal('');
    const [selectedImage, setSelectedImage] = createSignal('');
    const [rulings, setRulings] = createSignal();

    const simpleFields = ['color_identity', 'colors', 'mana_cost', 'type_line'];
    const arrayFields = ['cmc', 'power', 'toughness',];
    const namedObjectFields = [{ 'fieldTitle': 'Colors', 'fieldName': 'colors' }, { 'fieldTitle': 'Mana Cost', 'fieldName': 'mana_cost' }, { 'fieldTitle': 'Type', 'fieldName': 'type_line' }, { 'fieldTitle': 'Color Identity', 'fieldName': 'color_identity' }]
    const namedObjectArrayFields = [{ 'fieldTitle': 'Converted Mana Cost', 'fieldName': 'cmc' }, { 'fieldTitle': 'Power', 'fieldName': 'power' }, { 'fieldTitle': 'Toughness', 'fieldName': 'toughness' }]


    // const cardFromStore = useStore($bigCard);
    // const bigUrl = useStore($bigCardUrl);

    createEffect(() => {
        // if the card changes then reset the selected image
        setSelectedImage(props.card['normal'][0]);
    })

    createEffect(() => {
        // if the card has rules then fetch them and store in signal
        if (props.card['rulings_uri'] != undefined) {
            fetchRulings(props.card['rulings_uri']);
        }
    })

    const fetchRulings = async (uri) => {

        const res = await fetch(uri);
        const rulingsJson = await res.json();
        setRulings(rulingsJson['data']);
    }

    // listenKeys($bigCard, ['id',], () => {
    //     // const temp = $bigCard.get();
    //     // console.log(temp);
    //     // if (temp['normal'] != undefined) {
    //     //     const anotherTemp = temp['normal'][0];
    //     //     setBigCardUrl(anotherTemp);
    //     //     console.log(bigCardUrl());
    //     // }
    // })

    return (
        <div class="p-4">
            <div class='flex flex-col md:flex-row'>

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
                            <div class='whitespace-pre-wrap'>{props.card['oracle_text'][0]}</div>
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
                    <Show when={props.card['normal'].length > 1}>
                        <For each={props.card['normal']}>
                            {(item) =>
                                <div class="m-1 border-2 border-transparent hover:cursor-pointer hover:border-dark_accent hover:border-2" onclick={() => {
                                    setSelectedImage(item);
                                }}>
                                    <CardImage small={true} imageUrl={item} />
                                </div>}
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