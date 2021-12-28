import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

class AuthUserController {
	async handle(request: Request, response: Response) {
		const { email, password } = request.body;

		const authUserService = new AuthUserService();

		const isAuth = await authUserService.execute({ email, password });
		return response.json(isAuth);
	}
}

export { AuthUserController };
