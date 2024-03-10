"use strict";

import { DeckEntryRepository } from "../../../repositories/deckEntryRespository.js";


export const GET = async ({ params, request }) => {
    let deckEntryRepo = new DeckEntryRepository();

    console.log(params.deck_id);

    let deckEntries = await deckEntryRepo.read_all(params.deck_id);

    return new Response(JSON.stringify(deckEntries), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
