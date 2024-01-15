import { createEffect, createSignal, createResource, For } from "solid-js"
import { useStore } from "@nanostores/solid";
import { tempVar } from "../stores/Settings";
import CardStackedVerticalList from "./CardStackedVerticalList";
import { $searchbarFocused, $tempCards, } from "../stores/Cards";
const ip = import.meta.env.PUBLIC_SOLR_IP;

const SearchBar = () => {
    const [searchTerms, setSearchTerms] = createSignal(null);

    const handleInput = (event) => {
        setSearchTerms(event.target.value);
        $searchbarFocused.set(true);
        console.log('Search terms:', searchTerms())
    }

    const handleFocusOut = (event) => {
        $searchbarFocused.set(false);
    }

    const solr_fetch = async (searchTerms) => {
        if (searchTerms !== '') {
            try {
                // const res = await fetch(('/api/solr?name=blue'));
                const res = await fetch("https://" + ip + "/?q=name_search:" + '\"' + searchTerms + '\"', {
                    method: "GET",
                    mode: "cors",
                });

                const data = await res.json();
                $tempCards.set(data['response']['docs']);
                // if (data['response']['docs'][0] != undefined)
                // {
                //     $bigCard.set(data['response']['docs'][0]);
                //     // console.log(data['response']['docs'][0]);
                //     // $bigCard.set
                //     if (data['response']['docs'][0]['normal'] != undefined)
                //     $bigCardUrl.set(data['response']['docs'][0]['normal'][0])
                // }
                // theCard.set(data['response']['docs'][0]);
            } catch (error) {
                console.error('Error:', error);
                throw error; // Rethrow the error to handle it further if needed
            }
        }
    }

    const [data, { mutate, refetch }] = createResource(searchTerms, solr_fetch);

    return (
        <div class="inline-flex grow justify-center">
            <input class="h-10 w-full p-4 focus:box-border bg-surface_200 border-gray-400 border rounded focus:border-transparent outline outline-0 focus:outline-0 focus:border-2 focus:border-green-500 transition-all"
                placeholder="Search for cards..."
                onInput={(e) => handleInput(e)}
                onFocus={(e) => handleInput(e)}
                onfocusout={(e) => handleFocusOut(e)}
                type='text'
            />
            {/* <p>Beans {data() != null ? data()['response']['docs'][0]: ""}</p> */}
            {/* {data() !== undefined ?
            <Show when={!data.loading} fallback={<>Searching...</>}>Beans
                <CardStackedVerticalList cards={data()['response']['docs']} />
                {/* <p>Beans</p>
                <For each={data()['response']['docs']}>
                    {(card, i) =>
                    <p>bean {i() + 1}</p>
                    }
                </For> */}
            {/* </Show> */}
            {/* : "" */}
        </div>
    );
}

export default SearchBar;