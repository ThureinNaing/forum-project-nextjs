"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import DeleteAnswerSchema from "../Schema/DeleteAnswerSchema";
import validateBody from "../validateBody";
import Answer from "@/models/answer.model";
import Question from "@/models/question.model";
import Vote from "@/models/vote.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/routes";
import mongoose from "mongoose";

export async function DeleteAnswerAction(params: { answerId: string }) {
	await dbConnect();
	const auth_session = await auth();
	const user = auth_session?.user;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const validatedData = validateBody(params, DeleteAnswerSchema);
		const { answerId } = validatedData.data;
		if (!auth_session || !auth_session.user) {
			throw new Error("Unauthorized: Please login first");
		}
		const answer = await Answer.findById(answerId);
		if (!answer) throw new Error("Answer not found");

		if (user?.id !== answer.author.toString()) {
			throw new Error("Forbidden: You can only delete your answer");
		}

		await Question.findByIdAndUpdate(
			answer.question,
			{ $inc: { answers: -1 }, new: true },
			{ session },
		);

		await Vote.deleteMany(
			{ type_id: answerId, type: "answer" },
			{ session },
		);
		await Answer.findByIdAndDelete(answerId, { session });
		await session.commitTransaction();
		revalidatePath(ROUTES.PROFILE(user?.email));
		revalidatePath(ROUTES.QUESTION_DETAILS(answer.question.toString()));
		return { success: true };
	} catch (error) {
		await session.abortTransaction();
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
