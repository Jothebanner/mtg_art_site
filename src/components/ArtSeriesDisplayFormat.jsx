import { createSignal } from "solid-js";
import CardImage from "./CardImage.jsx";

const ArtSeriesDisplayFormat = (props) => {


    const [rotate, setRotate] = createSignal(0);
    const [rotateY, setRotateY] = createSignal(0);

    let cardFront;
    let cardBack;
    let cardInner;

    return (

        <div class="w-full">
            <button
                class="bg-surface_300 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
                onclick={() => { setRotate(rotate() - 180); cardInner.style.transform = `rotate(${rotate()}deg)`; }}> 180 Left
            </button>
            <button
                class="bg-surface_300 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
                onclick={() => { setRotate(rotate() - 90); cardInner.style.transform = `rotate(${rotate()}deg)`; }}> 90 Left
            </button>
            <button
                class="bg-surface_300 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
                onclick={() => { setRotate(rotate() + 90); cardInner.style.transform = `rotate(${rotate()}deg)`; }}> 90 Right
            </button>
            <button
                class="bg-surface_300 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
                onclick={() => { setRotate(rotate() + 180); cardInner.style.transform = `rotate(${rotate()}deg)`; }}> 180 Right
            </button>

            <button
                class="bg-surface_300 rounded border-2 border-slate-500 hover:border-dark_accent hover:bg-surface_400"
                onclick={() => { setRotateY(rotateY() > 0 ? 0 : 180); cardBack.style.transform = `rotateY(${-180 + -rotateY()}deg)`; cardFront.style.transform = `rotateY(${rotateY()}deg)`; }}> Flip
                {/* // onclick={() => { setRotateY(rotateY() > 0 ? 0 : 180); cardInner.style.transform = `rotateY(${rotateY()}deg)`; }}> Flip */}
            </button>


            <div class="flex justify-center">
                {/* I'm not sure why aspect ratio isn't working in the css file, but working here when applied directly to the html element */}
                <div ref={cardInner} id="cardInner" class="md:w-9/12 items-center rotateBase cardImage flex" style='aspect-ratio:1/1.4;'>
                    <div ref={cardFront} id="front" class="flipBaseFront">
                        <CardImage imageUrl={props.frontImage} />
                    </div>
                    <div ref={cardBack} id="back" class="flipBaseBack">
                        <CardImage imageUrl={props.backImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtSeriesDisplayFormat;