"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import CreateQuestionSchema from "../Schema/CreateQuestionSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { handleActionErrorResponse } from "../response";
import Question from "@/models/question.model";
import Tag from "@/models/tag.model";
import TagQuestion from "@/models/tag-question.model";

export async function CreateQuestionAction(params: {
	title: string;
	content: string;
	tags: string[];
}): Promise<{
	success: boolean;
	data?: { _id: string; title: string; content: string; tags: string[] };
}> {
	await dbConnect();

	const validatedData = validateBody(params, CreateQuestionSchema);
	const { title, content, tags } = validatedData.data;
	const auth_session = await auth();
	const userId = auth_session?.user?.id;

	if (!userId) {
		return handleActionErrorResponse(
			new Error("Authentication required to create a question.")
		);
	}
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const [question] = await Question.create(
			[{ title, content, author: userId }],
			{
				session,
			}
		);

		if (!question) {
			throw new Error("Failed to create question");
		}

		const tagIds: mongoose.Types.ObjectId[] = []; // To store tag IDs associated with the question
		const tagQuestionDocuments = []; // To store question-tag relationship documents

		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, "i") } }, // case-insensitive match
				{ $setOnInsert: { name: tag }, $inc: { questions: 1 } }, // increment questions count if tag exists
				{ upsert: true, new: true, session } // create if not exists
			);

			tagIds.push(existingTag._id);
			tagQuestionDocuments.push({
				tag: existingTag._id,
				question: question._id,
			});
		}

		await TagQuestion.insertMany(tagQuestionDocuments, { session });

		await Question.findByIdAndUpdate(
			question._id,
			{ $push: { tags: { $each: tagIds } } },
			{ session }
		);

		await session.commitTransaction();

		return { success: true, data: JSON.parse(JSON.stringify(question)) };
	} catch (error) {
		await session.abortTransaction();
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
