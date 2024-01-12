// SolidCardImage.jsx
import { createSignal, createEffect } from 'solid-js';
import '../styles/tailwind.css';
import { cSize } from './CardSizes';

const CardImage = (props) => {
    const [isLoading, setIsLoading] = createSignal(true);

    // const [internalImageURL, setInternalImageURL] = createSignal(null);

    createEffect(async () => {
        const res = await fetch(props.imageUrl);
        if (res.ok)
            setIsLoading(false);
        else
            console.log("Borked");
        // const blob = await res.blob();
        // const blobUrl = URL.createObjectURL(blob);
        // setInternalImageURL(blobUrl);

    });

    return (
        <div class="bg-transparent flex shrink">

            {/* {console.log(props.imageUrl)} */}
            {/* {isLoading() ?
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-r-2 border-b-2 border-gray-300"></div>
                </div>
                : */}
                {props.growOnHover ? 
                <img
                    class={`cardWidth relative cardImage h-auto max-h-full hover:z-10 hover:scale-250 object-scale-down transition-transform transform-gpu duration-200`}
                    alt="Card Image"
                    src={props.imageUrl}
                /> : 
                <img
                    class={`relative cardImage h-auto max-h-full object-scale-down transition-opacity duration-300`}
                    alt="Card Image"
                    src={props.imageUrl}
                />
                }
        </div>
    );
};

export default CardImage;