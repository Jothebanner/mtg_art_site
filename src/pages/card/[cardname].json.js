const ip = import.meta.env.PUBLIC_STAGING_SOLR_IP;

export async function GET({ params }) {
  const cardname = params.cardname;
  const searchTerms = cardname.replace('_', ' ');
  const res = await fetch("https://" + ip + "/?q=name_search:" + '\"' + searchTerms + '\"');
  const cards = await res.json();

  if (cards['response']['docs'][0] == undefined) {
    return new Response("Card Not Found", {
      status: 404,
      statusText: 'Card not found'
    });
  }

  return new Response(
    JSON.stringify(cards['response']['docs'][0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}