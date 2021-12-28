import { NextFunction, Request, Response } from "express";

export function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	// Verificar se o user é admin
	const admin = true;

	if (admin) {
		// se ele for admin ele segue o fluxo
		return next();
	}
	return response
		.status(401)
		.json({ error: "Unauthorized", message: "user not authorized" });
}
