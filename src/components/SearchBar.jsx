import { createEffect, createSignal, createResource, For } from "solid-js"
import { $searchbarFocused, $tempCards, } from "../stores/Cards";
const solr_ip = import.meta.env.PUBLIC_STAGING_SOLR_IP;

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
                const res = await fetch("https://" + solr_ip + "/?q=name_search:" + '\"' + searchTerms + '\"', {
                    method: "GET",
                    mode: "cors",
                });

                const data = await res.json();
                $tempCards.set(data['response']['docs']);
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