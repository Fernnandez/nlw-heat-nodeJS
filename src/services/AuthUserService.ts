import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthRequest {
	email: string;
	password: string;
}

class AuthUserService {
	async execute({ email, password }: IAuthRequest): Promise<string> {
		if (!email || !password) {
			throw new Error("Incorrect format of email or password");
		}

		const usersRepository = getCustomRepository(UsersRepositories);

		const user = await usersRepository.findOne({ email });

		if (!user) {
			throw new Error("Email/Password incorrect");
		}
		if (await compare(password, user.password)) {
			// parametros que o payload vai enviar, a secrectKey e por fim algumas options
			return sign(
				{ email: user.email },
				"4262855f9227c60bf8333ff4f35b1aab",
				{
					subject: user.id,
					expiresIn: "1d",
				},
			);
		} else {
			throw new Error("Email/Password incorrect");
		}
	}
}
export { AuthUserService };
