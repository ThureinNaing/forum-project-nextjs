"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import { handleActionErrorResponse } from "../response";
import Question from "@/models/question.model";
import GetQuestionSchema from "../Schema/GetQuestionSchema";
import type { QuestionDetails } from "@/types/question";

export async function GetQuestion(params: { questionId: string }): Promise<{
	success: boolean;
	data?: QuestionDetails;
	message?: string;
	details?: object | null;
}> {
	await dbConnect();

	const validatedData = validateBody(params, GetQuestionSchema);
	const { questionId } = validatedData.data;

	try {
		const question = await Question.findById(questionId).populate("tags");

		if (!question) {
			throw new Error("Question not found");
		}

		return { success: true, data: JSON.parse(JSON.stringify(question)) };
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
