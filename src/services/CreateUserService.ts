import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { User } from "../entities/User";

interface IUserRequest {
	name: string;
	email: string;
	password: string;
	admin?: boolean;
}

class CreateUserService {
	async execute({
		name,
		email,
		password,
		// default no TS
		admin = false,
	}: IUserRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepositories);

		if (!email) {
			throw new Error("Email incorrect");
		}

		const userAlreadyExists = await usersRepository.findOne({
			email,
		});

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		// encriptando a senha para salvar no BD com mais segurança
		const passwordHash = await hash(password, 8);

		const user = usersRepository.create({
			name,
			email,
			password: passwordHash,
			admin,
		});

		await usersRepository.save(user);

		return user;
	}
}

export { CreateUserService };
