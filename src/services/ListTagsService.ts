import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepositories } from "../repositories/TagsRespositories";

class ListTagsService {
	async execute() {
		const tagsRepository = getCustomRepository(TagsRepositories);
		let tags = await tagsRepository.find();
		tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));

		return tags;
	}
}
export { ListTagsService };
