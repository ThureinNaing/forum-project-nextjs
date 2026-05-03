"use server";

import Answer, { IAnswerDocument } from "@/models/answer.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import validateBody from "../validateBody";
import GetAnswerSchema from "../Schema/GetAnswerSchema";
import page from "../../app/(root)/questions/[id]/page";

export async function GetAnswers(params: {
	page: number;
	pageSize: number;
	filter?: string;
	questionId: string;
}): Promise<{
	success: boolean;
	data?: {
		answers: IAnswerDocument[];
		isNext: boolean;
		totalAnswers: number;
	};
	message?: string;
	details?: object | null;
}> {
	dbConnect();
	try {
		const validatedData = validateBody(params, GetAnswerSchema);
		const {
			page = 1,
			pageSize = 10,
			filter,
			questionId,
		} = validatedData.data;

		const skip = (Number(page) - 1) * Number(pageSize);
		const limit = Number(pageSize);
		let sortCriteria = {};

		switch (filter) {
			case "latest":
				sortCriteria = { createdAt: -1 };
				break;
			case "oldest":
				sortCriteria = { createdAt: 1 };
				break;
			case "popular":
				sortCriteria = { upvotes: -1 };
				break;

			default:
				sortCriteria = { createdAt: -1 }; // Default to latest
				break;
		}

		const totalAnswers = await Answer.countDocuments({
			question: questionId,
		});

		const answers = await Answer.find({ question: questionId })
			.populate("author", "_id name image")
			.sort(sortCriteria)
			.skip(skip)
			.limit(limit);

		const isNext = skip + answers.length < totalAnswers;

		return {
			success: true,
			data: {
				answers: JSON.parse(JSON.stringify(answers)),
				isNext,
				totalAnswers,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
