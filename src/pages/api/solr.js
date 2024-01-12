import fetch from "node-fetch";

export async function GET({request}) {
    const res = await fetch('http://192.168.42.145:8983/solr/mtg_cards_scryfall/select?q=name_search:');
    const data = await res.json();
    const cardArray = await data['response']['docs'];
    console.log(cardArray);

    return new Response(JSON.stringify({
        body: cardArray,
    })
    )
}