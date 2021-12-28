import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import "express-async-errors";

class CreateUserController {
	async handle(request: Request, response: Response) {
		try {
			const { name, email, password, admin } = request.body;

			const createUserService = new CreateUserService();

			const user = await createUserService.execute({
				name,
				email,
				password,
				admin,
			});

			return response.json(user);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	}
}

export { CreateUserController };
