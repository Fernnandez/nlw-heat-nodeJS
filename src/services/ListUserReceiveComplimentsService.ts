import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {
	async execute(user_id: string): Promise<Compliment[]> {
		const complimentsRepository = getCustomRepository(
			ComplimentsRepositories,
		);
		const compliments = await complimentsRepository.find({
			where: { user_receiver: user_id },
			relations: ["userSender", "userReceiver", "tag"],
		});
		return compliments;
	}
}

export { ListUserReceiveComplimentsService };
