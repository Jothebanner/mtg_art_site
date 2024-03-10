import { UserRepository } from "../../../repositories/userRepository.js"

export const GET = async ({ params, request }) => {
    let userRepo = new UserRepository();

    console.log(params.username);

    let userData = await userRepo.read_username(params.username);

    return new Response(JSON.stringify(userData), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}