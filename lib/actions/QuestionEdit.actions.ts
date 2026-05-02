"use server";

import mongoose from "mongoose";
import dbConnect from "../dbConnect";

import validateBody from "../validateBody";
import EditQuestionSchema from "../Schema/EditQuestionSchema";
import Question from "@/models/question.model";
import Tag, { ITagDocument } from "@/models/tag.model";
import TagQuestion from "@/models/tag-question.model";
import { handleActionErrorResponse } from "../response";
import type { QuestionWriteResult } from "@/types/question";

export async function QuestionEdit(params: {
	questionId: string;
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
	const validatedData = validateBody(params, EditQuestionSchema);
	const { title, content, tags, questionId } = validatedData.data;
	// const auth_session = await auth();
	// const userId = auth_session?.user?.id;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const question = await Question.findById(questionId).populate("tags");
		if (!question) {
			throw new Error("Failed to get a question");
		}

		const currentTags = question.tags as unknown as ITagDocument[];
		const currentTagNames = currentTags.map((tag) =>
			tag.name.toLowerCase()
		);

		if (question.title !== title || question.content !== content) {
			question.title = title;
			question.content = content;
			await question.save({ session });
		}

		const tagsToAdd = tags.filter(
			(tag: string) => !currentTagNames.includes(tag.toLowerCase())
		);
		const tagsToRemove = currentTags.filter(
			(tag: ITagDocument) => !tags.includes(tag.name.toLowerCase())
		);

		if (tagsToRemove.length) {
			const tagIdsToRemove = tagsToRemove.map(
				(tag: ITagDocument) => tag._id
			);

			await Tag.updateMany(
				{ _id: { $in: tagIdsToRemove } },
				{ $inc: { questions: -1 } },
				{ session }
			);

			await TagQuestion.deleteMany({
				tag: { $in: tagIdsToRemove },
				question: questionId,
			});

			question.tags = currentTags
				.filter(
					(tag: ITagDocument) =>
						!tagsToRemove.some((tagToRemove) =>
							tagToRemove._id.equals(tag._id)
						)
				)
				.map(
					(tag: ITagDocument) =>
						new mongoose.Types.ObjectId(tag._id.toString())
				);
		}

		if (tagsToAdd.length) {
			const newTagDocuments = []; //TagQuestion 3
			for (const tag of tagsToAdd) {
				const existingTag = await Tag.findOneAndUpdate(
					{
						name: { $regex: new RegExp(`^${tag}$`, "i") },
					},
					{ $setOnInsert: { name: tag }, $inc: { questions: 1 } },
					{ upsert: true, new: true, session }
				);
				if (existingTag) {
					const existingTagQuestion = await TagQuestion.findOne({
						tag: existingTag._id,
						question: questionId,
					});
					if (!existingTagQuestion) {
						newTagDocuments.push({
							tag: existingTag._id,
							question: questionId,
						});
					}
				}

				if (
					!(question.tags as mongoose.Types.ObjectId[]).some((tagId) =>
						tagId.equals(existingTag._id)
					)
				) {
					question.tags.push(existingTag._id);
				}
			}
			if (newTagDocuments.length) {
				await TagQuestion.insertMany(newTagDocuments, { session });
			}
		}
		await question.save({ session });
		await session.commitTransaction();

		return { success: true, data: JSON.parse(JSON.stringify(question)) };
	} catch (error) {
		await session.abortTransaction();
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
