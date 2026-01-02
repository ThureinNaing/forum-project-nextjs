"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import { handleActionErrorResponse } from "../response";
import Question, { IQuestion } from "@/models/question.model";
import GetQuestionSchema from "../Schema/GetQuestionSchema";

export async function GetQuestion(params: { questionId: string }): Promise<{
	success: boolean;
	data?: IQuestion;
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
