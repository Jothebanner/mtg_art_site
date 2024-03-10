"use strict";

import { DeckEntryRepository } from "../../repositories/deckEntryRespository.js";

export const POST = async ({ params, request }) => {

	// let errors = [];

    let deckEntryRepo = new DeckEntryRepository();

	let deckEntryData = await request.json();

	let result;

	try {
		result = await deckEntryRepo.create(deckEntryData);
	} catch (error) {
		console.log("error creating deckEntry: " + error);
		return new Response("Error: " + error);
	}

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
