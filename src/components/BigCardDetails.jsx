import { For, Show, createEffect, createSignal } from "solid-js";
import CardImage from "./CardImage";
import '../styles/AccordionAnimation.css';
import "../styles/RotationFlipAnimations.css"
import CardRulings from "./CardRulings.jsx";
import FieldsFlavorOracleDisplay from "./FieldsFlavorOracleDisplay.jsx";
import CardDetailsImageGeneric from "./CardDetailsImageGeneric.jsx";
import ArtSeriesDisplayFormat from "./ArtSeriesDisplayFormat.jsx";

const BigCardDetails = (props) => {
    // const [bigCardUrl, setBigCardUrl] = createSignal('');
    const [selectedImage, setSelectedImage] = createSignal('');
    const [similarNames, setSimilarNames] = createSignal({});
    const [frontFace, setFrontFace] = createSignal('');
    const [backFace, setBackFace] = createSignal('');


    // const cardFromStore = useStore($bigCard);
    // const bigUrl = useStore($bigCardUrl);

    const layoutTypes = ["pre-rotate", "rotate", "full_rotate", "flip_over", "normal",]

    const cardLayoutTypes = [
        { "pre-rotate": ["planar",] },
        { "rotate": ["planar", "meld", "split",] },
        { "full_rotate": ["flip",] },
        { "flip_over": ["modal_dfc", "double_faced_token", "meld", "transform", "reversible_card", "art_series",] },
        { "normal": ["normal", "leveler", "class", "case", "saga", "adventure", "mutate", "prototype", "battle", "scheme", "vanguard", "token", "emblem", "augment", "host",] },
    ]

    createEffect(() => {
        // determine layout then attempt to retrieve images
        if (props.card == undefined) {
            console.log("Error: card is undefined. Skipping card detail loading.");
            return;
        }

        if (props.card["image_status"] == "missing") {
            console.log("Error: card image is unavailable. Skipping card image parse.");
            return;
        }

        console.log(props.card);
        // if the card changes then reset the selected image
        if (props.card['image_uris'] != undefined) {
            if (props.card['image_uris']['large'] != undefined) {
                setSelectedImage(props.card['image_uris']['large']);
                setFrontFace(props.card['image_uris']['large']);
            }
            else if (props.card['image_uris']['normal'] != undefined) {
                setSelectedImage(props.card['image_uris']['normal']);
                setFrontFace(props.card['image_uris']['normal']);
            }
            else {
                setSelectedImage(null);
                setFrontFace(null);
                console.log("Error: " + "no image_uris were found");
            }
        }


        // if not a normal card then lets check for card_faces
        if (props.card["card_faces"] != undefined) {
            console.log("Found art series card... scanning")
            if (props.card["card_faces"] != undefined && props.card['card_faces'][0] != undefined && props.card['card_faces'][0]['image_uris'] != undefined) {
                if (props.card['card_faces'][0]['image_uris']['large'] != undefined) {
                    setFrontFace(props.card['card_faces'][0]['image_uris']['large']);
                } else if (props.card['card_faces'][0]['image_uris']['normal'] != undefined) {
                    setFrontFace(props.card['card_faces'][0]['image_uris']['normal']);
                } else {
                    console.log("Error: front card image is unavailable. Skipping card image parse.");
                }
            }
            if (props.card["card_faces"] != undefined && props.card['card_faces'][0] != undefined && props.card['card_faces'][0]['image_uris'] != undefined) {
                if (props.card['card_faces'][1]['image_uris']['large'] != undefined) {
                    setBackFace(props.card['card_faces'][1]['image_uris']['large']);
                } else if (props.card['card_faces'][1]['image_uris']['normal'] != undefined) {
                    setBackFace(props.card['card_faces'][1]['image_uris']['normal']);
                } else {
                    console.log("Error: back card image is unavailable. Skipping card image parse.");
                }
            }
        }


        if (backFace() == '')
        {
            // TODO: Change this. Cache it or download it or something, but not this.
            setBackFace("https://backs.scryfall.io/large/2/2/222b7a3b-2321-4d4c-af19-19338b134971.jpg?1677416389");
        }

    })

    createEffect(async () => {
        RetrieveSimilarNames();
    })

    const RetrieveSimilarNames = async () => {
        // if the card has alternative faces then fetch them and store in signal
        if (props.card['id'] != undefined) {
            const res = await fetch('/api/cards/' + props.card['id'] + '.json');
            setSimilarNames(await res.json());
            console.log(similarNames());
        }
        else {
            console.log("none similar names")
        }
    }

    return (
        <div class="p-4">
            <div class='flex flex-col md:flex-row'>

                <Show when={props.card["layout"] != "art_series"}>
                    <CardDetailsImageGeneric card={props.card} selectedImage={frontFace()} />

                    <FieldsFlavorOracleDisplay card={props.card} />
                </Show>

                <Show when={props.card["layout"] == "art_series"}>
                    <ArtSeriesDisplayFormat frontImage={frontFace()} backImage={backFace()} />
                </Show>
            </div>

            {/* Refactor this for sure - to use $selectedImage() */}
            <div class="flex-row">
                <div class={`flex flex-row pl-4 ${similarNames().length > 1 ? "overflow-x-scroll" : " "}`}>
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
                <CardRulings card={props.card} />
            </div>
        </div>
    );
}
export default BigCardDetails;