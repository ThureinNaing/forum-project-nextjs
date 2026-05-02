"use server";

import Question from "@/models/question.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../Schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { handleActionErrorResponse } from "../response";
import type { QuestionCard } from "@/types/question";

export async function GetAllQuestions(params: {
	page?: number;
	pageSize?: number;
	search?: string;
	filter?: string;
	sort?: string;
}): Promise<{
	success: boolean;
	data?: { questions: QuestionCard[]; isNext?: boolean };
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

	const filterQuery: FilterQuery<typeof Question> = {};

	if (filter == "recommended") {
		return { success: true, data: { questions: [], isNext: false } };
	}

	if (search) {
		//$or for multiple fields
		filterQuery.$or = [
			{ title: { $regex: new RegExp(search, "i") } }, //"i" for case-insensitive
			{ content: { $regex: new RegExp(search, "i") } },
		];
	}

	let sortCriteria = {};

	switch (filter) {
		case "newest":
			sortCriteria = { createdAt: -1 };
			break;
		case "unanswered":
			filterQuery.answers = 0;
			sortCriteria = { createdAt: -1 };
			break;
		case "popular":
			sortCriteria = { upvotes: -1 };
			break;
		default:
			sortCriteria = { createdAt: -1 };
			break;
	}

	try {
		const totalQuestions = await Question.countDocuments(filterQuery);
		const questions = await Question.find(filterQuery)
			.populate("tags", "name")
			.populate("author", "name image")
			.lean()
			.sort(sortCriteria)
			.skip(skip)
			.limit(limit);

		const isNext = totalQuestions > skip + questions.length;

		return {
			success: true,
			data: {
				questions: JSON.parse(JSON.stringify(questions)),
				isNext,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
