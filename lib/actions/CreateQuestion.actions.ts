"use server";

import mongoose from "mongoose";
import dbConnect from "../dbConnect";

import validateBody from "../validateBody";
import { auth } from "@/auth";
import CreateQuestionSchema from "../Schema/CreateQuestionSchema";
import Question from "@/models/question.model";
import Tag from "@/models/tag.model";
import TagQuestion from "@/models/tag-question.model";
import { handleActionErrorResponse } from "../response";
import { api } from "../api";
import type { QuestionWriteResult } from "@/types/question";

export async function CreateQuestionAction(params: {
	title: string;
	content: string;
	tags: string[];
}): Promise<{
	success: boolean;
	data?: QuestionWriteResult;
	message?: string;
	details?: object | null;
}> {
	await dbConnect();

	try {
		const auth_session = await auth();

		const validatedData = validateBody(params, CreateQuestionSchema);
		const { title, content, tags } = validatedData.data;
		const email = auth_session?.user?.email;

		if (!email)
			return {
				success: false,
				message: "User not authenticated",
				details: null,
			};

		const user = await api.users.getByEmail(email as string);

		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			// 1. Create Question with ObjectId
			const [question] = await Question.create(
				[
					{
						title,
						content,
						author: user?.data?._id,
					},
				],
				{ session }
			);

			const tagIds: mongoose.Types.ObjectId[] = [];
			const tagQuestionDocuments = [];

			// 2. Process Tags
			for (const tag of tags) {
				const existingTag = await Tag.findOneAndUpdate(
					{ name: { $regex: new RegExp(`^${tag}$`, "i") } },
					{ $setOnInsert: { name: tag }, $inc: { questions: 1 } },
					{ upsert: true, new: true, session }
				);

				const tid = new mongoose.Types.ObjectId(
					existingTag._id as string
				);
				tagIds.push(tid);
				tagQuestionDocuments.push({
					tag: tid,
					question: question._id,
				});
			}

			// 3. Link Tags and Questions
			await TagQuestion.insertMany(tagQuestionDocuments, { session });

			await Question.findByIdAndUpdate(
				question._id,
				{ $push: { tags: { $each: tagIds } } },
				{ session }
			);

			await session.commitTransaction();
			session.endSession();

			return {
				success: true,
				data: JSON.parse(JSON.stringify(question)),
			};
		} catch (error: unknown) {
			await session.abortTransaction();
			session.endSession();
			throw error;
		}
	} catch (error: unknown) {
		return handleActionErrorResponse(error);
	}
}
