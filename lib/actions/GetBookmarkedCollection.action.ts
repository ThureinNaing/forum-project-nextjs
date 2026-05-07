"use server";

import Collection, { ICollectionDocument } from "@/models/collection.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../Schema/PaginatedSearchParamsSchema";
import { auth } from "@/auth";
import Question from "@/models/question.model";
import { FilterQuery } from "mongoose";
import User from "@/models/user.model";

export default async function GetBookmarkedCollection(params: {
	page?: number;
	pageSize?: number;
	search?: string;
	filter?: string;
	sort?: string;
}): Promise<{
	success: boolean;
	data?: { collections: ICollectionDocument[]; isNext?: boolean };
	message?: string;
	deatils?: object | null;
}> {
	await dbConnect();
	const auth_session = await auth();
	const user_eamil = auth_session?.user?.email;
	try {
		const user = await User.findOne({ email: user_eamil }).select("_id");
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

		const filterQuery: FilterQuery<typeof Collection> = {
			author: user._id,
		};

		if (search) {
			const matchingQuestions = await Question.find({
				$or: [
					{ title: { $regex: search, $options: "i" } },
					{ content: { $regex: search, $options: "i" } },
				],
			}).select("_id");
			const matchingIdsList = matchingQuestions.map((q) => q._id);

			if (!matchingIdsList.length) {
				return {
					success: true,
					data: { collections: [], isNext: false },
				};
			}

			filterQuery.question = { $in: matchingIdsList };
		}

		let sortCriteria = {};

		switch (filter) {
			case "mostrecent":
				sortCriteria = { createdAt: -1 };
				break;
				2;
			case "oldest":
				sortCriteria = { createdAt: -1 };
				break;
			case "mostvoted":
				sortCriteria = { upvotes: -1 };
				break;
			case "mostanswered":
				sortCriteria = { upvotes: -1 };
				break;
			default:
				sortCriteria = { createdAt: -1 };
				break;
		}

		const totalCollections = await Collection.countDocuments(filterQuery);
		const collections = await Collection.find(filterQuery)
			.populate({
				path: "question",
				populate: [
					{ path: "tags", select: "_id name" },
					{ path: "author", select: "_id name image" },
				],
			})
			.lean()
			.sort(sortCriteria)
			.skip(skip)
			.limit(limit);

		const isNext = totalCollections > skip + collections.length;

		return {
			success: true,
			data: {
				collections: JSON.parse(JSON.stringify(collections)),
				isNext,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
