import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
	tag_id: string;
	user_sender: string;
	user_receiver: string;
	message: string;
}

class CreateComplimentService {
	async execute({
		tag_id,
		user_sender,
		user_receiver,
		message,
	}: IComplimentRequest): Promise<Compliment> {
		const complimentsRepository = getCustomRepository(
			ComplimentsRepositories,
		);
		const usersRepository = getCustomRepository(UsersRepositories);

		if (user_sender === user_receiver) {
			throw new Error("Incorrect User Receiver");
		}

		const usersReceiveExists = await usersRepository.findOne(user_receiver);

		if (!usersReceiveExists) {
			throw new Error("User Receiver does not exists");
		}

		const compliment = complimentsRepository.create({
			tag_id,
			user_receiver,
			user_sender,
			message,
		});

		complimentsRepository.save(compliment);

		return compliment;
	}
}

export { CreateComplimentService };
