"use server";

import mongoose from "mongoose";
import dbConnect from "../dbConnect";

import validateBody from "../validateBody";
import EditQuestionSchema from "../Schema/EditQuestionSchema";
import Question from "@/models/question.model";
import Tag, { ITagDocument } from "@/models/tag.model";
import TagQuestion from "@/models/tag-question.model";
import { handleActionErrorResponse } from "../response";

export async function QuestionEdit(params: {
	questionId: string;
	title: string;
	content: string;
	tags: string[];
}): Promise<{
	success: boolean;
	data?: {
		_id: string;
		title: string;
		content: string;
		author: string;
		tags: string[];
	};
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

		if (question.title !== title || question.content !== content) {
			question.title = title;
			question.content = content;
			await question.save({ session });
		}

		const tagsToAdd = tags.filter(
			(tag: string) => !question.tags.includes(tag.toLowerCase())
		);
		const tagsToRemove = question.tags.filter(
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

			question.tags = question.tags.filter(
				(tagId: mongoose.Types.ObjectId) =>
					!tagsToRemove.includes(tagId)
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
					!question.tags.find((tagId: mongoose.Types.ObjectId) =>
						tagId.equals(existingTag._id)
					)
				) {
					question.tags.push(existingTag._id);
				}
			}
			if (newTagDocuments.length) {
				await TagQuestion.insertMany(newTagDocuments);
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
