"use server";

import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import GetUserQuestionsSchema from "../Schema/GetUserQuestionsSchema";
import validateBody from "../validateBody";
import Question from "@/models/question.model";
import { QuestionCard } from "@/types/question";

export default async function GetUserQuestionsAction(params: {
	userId: string;
	page?: number;
	pageSize?: number;
}): Promise<{
	success: boolean;
	data?: { questions: QuestionCard[]; isNext?: boolean };
	message?: string;
	deatils?: object | null;
}> {
	await dbConnect();

	try {
		const validatedData = validateBody(params, GetUserQuestionsSchema);
		const { userId, page = 1, pageSize = 10 } = validatedData.data;
		const skip = Number(page - 1) * Number(pageSize);
		const limit = Number(pageSize);

		const totalQuestions = await Question.countDocuments({
			author: userId,
		});
		const questions = await Question.find({ author: userId })
			.populate("tags", "name")
			.populate("author", "name email")
			.sort({ createdAt: -1 })
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
