"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import DeleteQuestionSchema from "../Schema/DeleteQuestionSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import Question from "@/models/question.model";
import Collection from "@/models/collection.model";
import TagQuestion from "@/models/tag-question.model";
import Vote from "@/models/vote.model";
import Answer from "@/models/answer.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/routes";

export default async function DeleteQuestion(params: { questionId: string }) {
	await dbConnect();
	const session = await mongoose.startSession();

	try {
		const auth_session = await auth();
		const user = auth_session?.user;
		if (!user) throw new Error("Unauthorized");

		const validatedData = validateBody(params, DeleteQuestionSchema);
		const { questionId } = validatedData.data;
		session.startTransaction();

		const question = await Question.findById(questionId).session(session);
		if (!question) throw new Error("Question not found");

		if (question.author.toString() !== user?.id) {
			throw new Error("Unauthorized");
		}

		// bookmarked
		await Collection.deleteMany({ question: questionId }).session(session);
		if (question.tags.length > 0) {
			await TagQuestion.updateMany(
				{
					_id: { $in: question.tags },
				},
				{ $inc: { question: -1 } },
				{ session },
			);
		}

		await Vote.deleteMany({
			actionId: questionId,
			actionType: "question",
		}).session(session);

		const answers = await Answer.find({ question: questionId }).session(
			session,
		);
		if (answers.length > 0) {
			await Answer.deleteMany({ question: questionId }).session(session);
			await Vote.deleteMany({
				actionId: { $in: answers.map((a) => a._id) },
				actionType: "answer",
			}).session(session);
		}

		await Question.findByIdAndDelete(questionId).session(session);

		await session.commitTransaction();
		revalidatePath(ROUTES.PROFILE(user?.email));
		return {
			success: true,
		};
	} catch (error) {
		await session.abortTransaction();
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
