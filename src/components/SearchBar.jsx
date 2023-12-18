import { createEffect, createSignal, onMount } from "solid-js"
import { useStore } from "@nanostores/solid";
import { tempVar } from "../stores/Settings";


const SearchBar = () =>
{
    const[searchTerms, setSearchTerms] = createSignal('');

    const handleInput = (event) => {
        setSearchTerms(event.target.value);
        console.log('Search terms:', searchTerms())
    }

    return ( 
        <div class="inline-flex grow justify-center">
            <input class="h-10 w-1/2 p-4 focus:box-border bg-transparent border-gray-400 border rounded focus:border-transparent outline outline-0 focus:outline-0 focus:border-2 focus:border-green-500 transition-all"
            placeholder="Search for cards..."
            onInput={handleInput}
            type='text'
            />
        </div>
    );
}

export default SearchBar;