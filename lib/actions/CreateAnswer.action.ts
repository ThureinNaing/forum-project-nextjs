"use server";

import Question from "@/models/question.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import CreateAnswerSchema from "../Schema/CreateAnswerSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import Answer, { IAnswerDocument } from "@/models/answer.model";
import { auth } from "@/auth";
import User from "@/models/user.model";

export async function CreateAnswer(params: {
	questionId: string;
	content: string;
}): Promise<{
	success: boolean;
	data?: { newAnswer: IAnswerDocument };
	message?: string;
	details?: object | null;
}> {
	await dbConnect();
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const auth_session = await auth();
		const userEmail = auth_session?.user?.email;
		if (!userEmail) throw new Error("User not authenticated");

		const user = await User.findOne({ email: userEmail });

		const validatedData = validateBody(params, CreateAnswerSchema);
		const { questionId, content } = validatedData.data;

		const question = await Question.findById(questionId);

		if (!question) throw new Error("Question not found");

		const [newAnswer] = await Answer.create(
			[{ author: user._id, question: questionId, content }],
			{ session },
		);

		question.answers += 1;
		await question.save({ session });

		await session.commitTransaction();

		return {
			success: true,
			data: { newAnswer: JSON.parse(JSON.stringify(newAnswer)) },
		};
	} catch (error) {
		session.abortTransaction();
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
