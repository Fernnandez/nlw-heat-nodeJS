import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepositories } from "../repositories/TagsRespositories";

class CreateTagService {
	async execute(name: string): Promise<Tag> {
		const tagsRepository = getCustomRepository(TagsRepositories);

		if (!name) {
			throw new Error("Incorrect name!");
		}

		const tagAlreadyExists = await tagsRepository.findOne({ name });

		if (tagAlreadyExists) {
			throw new Error("Tag name already exists!");
		}

		const tag = tagsRepository.create({ name });
		await tagsRepository.save(tag);
		return tag;
	}
}

export { CreateTagService };
