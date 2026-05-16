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
import Tag from "@/models/tag.model";

export default async function DeleteQuestion(params: { questionId: string }) {
	await dbConnect();
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const auth_session = await auth();
		const user = auth_session?.user;
		if (!user) throw new Error("Unauthorized");

		const validatedData = validateBody(params, DeleteQuestionSchema);
		const { questionId } = validatedData.data;

		const question = await Question.findById(questionId).session(session);
		if (!question) throw new Error("Question not found");

		if (question.author.toString() !== user?.id) {
			throw new Error("Unauthorized");
		}

		// bookmarked
		await Collection.deleteMany({ question: questionId }).session(session);
		await TagQuestion.deleteMany({ question: questionId }).session(session);
		if (question.tags.length > 0) {
			await Tag.updateMany(
				{
					_id: { $in: question.tags },
				},
				{ $inc: { questions: -1 } },
				{ session },
			);
		}

		await Vote.deleteMany({
			type_id: questionId,
			type: "question",
		}).session(session);

		const answers = await Answer.find({ question: questionId }).session(
			session,
		);
		if (answers.length > 0) {
			await Answer.deleteMany({ question: questionId }).session(session);
			await Vote.deleteMany({
				type_id: { $in: answers.map((a) => a._id) },
				type: "answer",
			}).session(session);
		}

		await Question.deleteOne({ _id: questionId }).session(session);

		await session.commitTransaction();
		revalidatePath(ROUTES.PROFILE(user?.email));
		revalidatePath(ROUTES.TAGS);
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
