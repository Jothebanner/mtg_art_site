import { For, Show, createEffect, createSignal } from "solid-js";
import CardImage from "./CardImage";
import { useStore } from "@nanostores/solid";
import { $bigCard, $bigCardUrl } from "../stores/Cards";
import { listenKeys } from "nanostores";
import { Dynamic } from "solid-js/web";

const BigCardDetails = (props) => {
    // const [bigCardUrl, setBigCardUrl] = createSignal('');

    const simpleFields = ['color_identity', 'colors', 'mana_cost', 'type_line'];
    const arrayFields = ['cmc', 'power', 'toughness', ];
    const namedObjectFields = [{'fieldTitle': 'Colors', 'fieldName': 'colors'}, {'fieldTitle': 'Mana Cost', 'fieldName': 'mana_cost'}, {'fieldTitle': 'Type', 'fieldName': 'type_line'}, {'fieldTitle': 'Color Identity', 'fieldName': 'color_identity'}]
    const namedObjectArrayFields = [{'fieldTitle': 'Converted Mana Cost', 'fieldName': 'cmc'}, {'fieldTitle': 'Power', 'fieldName': 'power'}, {'fieldTitle': 'Toughness', 'fieldName': 'toughness'}]


    // const cardFromStore = useStore($bigCard);
    // const bigUrl = useStore($bigCardUrl);

    // createEffect(() => {
    //     setBigCardUrl(bigUrl());
    // })

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
        <div class="bg-light dark:bg-slate-700 backdrop-opacity-50 p-4">
            <div>{props.card['name']}</div>
            <div class='flex'>
                <CardImage imageUrl={props.card['normal'][0]} />
                <div class='flex flex-col pl-4'>
                    <For each={namedObjectArrayFields}>
                        {(field) =>
                            props.card[field['fieldName']] != undefined ?
                                <div>{field['fieldTitle']}: {props.card[field['fieldName']][0]}</div> : <p>oof</p>
                        }
                    </For>
                    <For each={namedObjectFields}>
                        {(field) =>
                            props.card[field['fieldName']] != undefined ?
                                <div>{field['fieldTitle']}: {props.card[field['fieldName']]}</div> : <p>oof</p>
                        }
                    </For>
                </div>
            </div>

            <div class="flex">

                <div class='flex flex-row pl-4'>
                    <Show when={props.card['small'].length > 1}>
                        <For each={props.card['small']}>
                            {(item) => <CardImage imageUrl={item} />}
                        </For>
                    </Show>
                    {/* <div>Converted Mana Cost: {props.card['cmc']}</div>
                    <div>Mana Cost: {props.card['mana_cost']}</div> */}
                </div>
            </div>
        </div>
    );
}
export default BigCardDetails;