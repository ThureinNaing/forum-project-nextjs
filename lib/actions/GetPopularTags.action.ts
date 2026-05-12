import Tag, { ITag } from "@/models/tag.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";

const GetPopularTags = async (): Promise<{
	success: boolean;
	data?: {
		tags: ITag[];
	};
	message?: string;
	details?: object | null;
}> => {
	await dbConnect();
	try {
		const tags = await Tag.find({}).lean().sort({ questions: -1 }).limit(5);
		return {
			success: true,
			data: {
				tags: JSON.parse(JSON.stringify(tags)),
			},
		};
	} catch (e) {
		return handleActionErrorResponse(e);
	}
};

export default GetPopularTags;
