import { createEffect, createSignal, For, Show } from 'solid-js';
import '../styles/AccordionAnimation.css';

const CardRulings = (props) => {
    const [rulings, setRulings] = createSignal();

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

    return (
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
    )
}

export default CardRulings;