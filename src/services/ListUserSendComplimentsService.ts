import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService {
	async execute(user_id: string): Promise<Compliment[]> {
		const complimentsRepository = getCustomRepository(
			ComplimentsRepositories,
		);
		const compliments = await complimentsRepository.find({
			where: { user_sender: user_id },
		});
		return compliments;
	}
}
export { ListUserSendComplimentsService };
