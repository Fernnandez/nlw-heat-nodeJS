import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authToken = request.headers.authorization;

	if (!authToken) {
		return response.status(401).json(" ");
	}

	const token = authToken.replace("Bearer", "");

	try {
		const { sub } = verify(
			token.trim(),
			"4262855f9227c60bf8333ff4f35b1aab",
		) as IPayload;

		request.user_id = sub;

		return next();
	} catch (error) {
		return response.status(401).end();
	}
}
