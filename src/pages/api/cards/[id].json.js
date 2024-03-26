"use strict";

import { CardRespository } from "../../../repositories/cardRepository.js";

export const GET = async ({ params, request }) => {


    // console.log('id: ' + params.id);
    let cardRepository = new CardRespository();


    let cards = await cardRepository.read_all_name_by_id(params.id);

    return new Response(JSON.stringify(cards), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}