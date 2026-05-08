"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import { handleActionErrorResponse } from "../response";
import Question from "@/models/question.model";
import GetQuestionSchema from "../Schema/GetQuestionSchema";
import type { QuestionDetails } from "@/types/question";
import Collection from "@/models/collection.model";
import User from "@/models/user.model";
import { auth } from "@/auth";

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
		const auth_session = await auth();
		const userEmail = auth_session?.user?.email;
		const user = await User.findOne({ email: userEmail }).select("_id");

		const question = await Question.findById(questionId).populate("tags");

		if (!question) {
			throw new Error("Question not found");
		}

		// Check if the question is bookmarked by the user
		let collection = null;
		if (user) {
			collection = await Collection.findOne({
				question: questionId,
				author: user._id,
			});
		}

		return {
			success: true,
			data: {
				...JSON.parse(JSON.stringify(question)),
				saved: !!collection,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
