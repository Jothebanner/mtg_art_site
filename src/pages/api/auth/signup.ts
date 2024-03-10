"use strict";

import { APIRoute } from "astro";
import { UserRepository } from "../../../repositories/userRepository.js";

export const POST: APIRoute = async ({ params, request }) => {
	// TODO: create db connection? or something? Repository

	let errors: Array<String> = [];

    // one-off repositories are cheap in javascript (as much as anything can be "cheap" in webdev)
	let userRepo = new UserRepository();

	const userData = await request.json();
	console.log(userData.username);

	// we're just gonna put the domain logic here
	// our service
	// probably should be seperate but this is fine for now

	// verify username
	let usernameResult: any = null;
	let emailResult: any = null;
	try {
		// if the user model exists
		usernameResult = await userRepo.read_username(userData.username);
	} catch (error) {
		console.log("error finding username: " + error);
		return new Response("Error: " + error);
	}

    // repository should return null if no username is found
	if (usernameResult != null) {
		errors.push("Username is already taken :(");
	}

	// verify email
	if (userData.email != null) {
		try {
			// if the user model exists
			emailResult = await userRepo.read_email(userData.email);
		} catch (error) {
			console.log("Server error finding email: " + error);
			return new Response("Error: " + error);
		}
	}

    // repository should return null if no email is found
	if (emailResult != null) {
		errors.push("Email is already used :(");
	}

    // inform the user of errors
	if (errors.length > 0) {
		return new Response(JSON.stringify(errors), {
			status: 409,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

    let role = "User";

    let createResult = await userRepo.create(userData, role);

	return new Response(JSON.stringify("Sent data: " + (Object.values(userData)) + " and result: " + createResult), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
