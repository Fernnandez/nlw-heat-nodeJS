import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { user_id } = request;

	const usersRespository = getCustomRepository(UsersRepositories);

	const { admin } = await usersRespository.findOne(user_id);

	if (admin) {
		return next();
	}
	return response
		.status(401)
		.json({ error: "Unauthorized", message: "user is not admin" });
}

export { ensureAdmin };
