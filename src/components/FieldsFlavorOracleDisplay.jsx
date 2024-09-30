const FieldsFlavorOracleDisplay = (props) => {


    const simpleFields = ['color_identity', 'colors', 'mana_cost', 'type_line'];
    const arrayFields = ['cmc', 'power', 'toughness',];
    const namedObjectFields = [{ 'fieldTitle': 'Converted Mana Cost', 'fieldName': 'cmc' }, { 'fieldTitle': 'Power', 'fieldName': 'power' }, { 'fieldTitle': 'Toughness', 'fieldName': 'toughness' }, { 'fieldTitle': 'Mana Cost', 'fieldName': 'mana_cost' }, { 'fieldTitle': 'Type', 'fieldName': 'type_line' },]
    const namedObjectArrayFields = [{ 'fieldTitle': 'Colors', 'fieldName': 'colors' }, { 'fieldTitle': 'Color Identity', 'fieldName': 'color_identity' }]

    return (
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
    )

}

export default FieldsFlavorOracleDisplay