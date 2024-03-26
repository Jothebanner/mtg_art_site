"use strict";

import { CardRespository } from "../../../repositories/cardRepository.js";

export const GET = async ({ params, request }) => {


    console.log(params.card_id);
    let cardRepository = new CardRespository();


    let card = await cardRepository.read_id(params.card_id);

    return new Response(JSON.stringify(card), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}