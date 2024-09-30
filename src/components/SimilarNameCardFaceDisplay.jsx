import { createEffect, createSignal } from "solid-js";
import CardImage from "./CardImage.jsx";


const SimilarNameCards = (props) => {
    const [similarNames, setSimilarNames] = createSignal({});

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
}
export default SimilarNameCards;