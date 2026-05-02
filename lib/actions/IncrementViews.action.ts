"use server";

import Question from "@/models/question.model";
import { handleActionErrorResponse } from "../response";
import IncrementViewSchema from "../Schema/IncrementViewSchema";
import validateBody from "../validateBody";

export async function IncrementViews(params: { questionId: string }): Promise<{
	success: boolean;
	data?: { views: number };
	message?: string;
	details?: object | null;
}> {
	const validatedData = validateBody(params, IncrementViewSchema);
	const { questionId } = validatedData.data;

	try {
		const question = await Question.findById(questionId);
		if (!question) throw new Error("Question not found");

		question.views += 1;
		await question.save();

		return {
			success: true,
			data: { views: question.views },
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
