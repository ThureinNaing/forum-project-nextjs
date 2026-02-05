"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../Schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { handleActionErrorResponse } from "../response";
import Tag, { ITagDocument } from "@/models/tag.model";

export async function GetTags(params: {
	page?: number;
	pageSize?: number;
	search?: string;
	filter?: string;
	sort?: string;
}): Promise<{
	success: boolean;
	data?: { tags: ITagDocument[]; isNext?: boolean };
	message?: string;
	deatils?: object | null;
}> {
	await dbConnect();
	const validatedData = validateBody(params, PaginatedSearchParamsSchema);
	const {
		page = 1,
		pageSize = 10,
		search,
		filter,
		// sort,
	} = validatedData.data;

	const skip = (Number(page) - 1) * pageSize;
	const limit = Number(pageSize);

	const filterQuery: FilterQuery<typeof Tag> = {};

	if (search) {
		//$or for multiple fields
		filterQuery.$or = [
			{ name: { $regex: new RegExp(search, "i") } }, //"i" for case-insensitive
		];
	}

	let sortCriteria = {};

	switch (filter) {
		case "popular":
			sortCriteria = { questions: -1 };
			break;
		case "recent":
			filterQuery.answers = 0;
			sortCriteria = { createdAt: -1 };
			break;
		case "oldest":
			sortCriteria = { createdAt: 1 };
			break;
		case "name":
			sortCriteria = { name: 1 };
			break;
		default:
			sortCriteria = { questions: -1 };
			break;
	}

	try {
		const totalTags = await Tag.countDocuments(filterQuery);
		const tags = await Tag.find(filterQuery)
			.lean()
			.sort(sortCriteria)
			.skip(skip)
			.limit(limit);

		const isNext = totalTags > skip + tags.length;

		return {
			success: true,
			data: {
				tags: JSON.parse(JSON.stringify(tags)),
				isNext,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
