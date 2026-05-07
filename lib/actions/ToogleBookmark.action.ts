"use server";

import Question from "@/models/question.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import BookmarkSchema from "../Schema/BookmarkSchema";
import validateBody from "../validateBody";
import Collection from "@/models/collection.model";
import { auth } from "@/auth";
import User from "@/models/user.model";

export default async function ToogleBookmarkAction(params: {
	questionId: string;
}): Promise<{
	success: boolean;
	data?: { saved: boolean };
	message?: string;
	details?: object | null;
}> {
	await dbConnect();

	try {
		const auth_session = await auth();
		const userEmail = auth_session?.user?.email;

		const validatedData = validateBody(params, BookmarkSchema);
		const { questionId } = validatedData.data;

		const user = await User.findOne({ email: userEmail }).select("_id");
		if (!user) throw new Error("Unauthorized");

		const question = await Question.findById(questionId).select("_id");
		if (!question) throw new Error("Question not found");

		const collection = await Collection.findOne({
			question: questionId,
			author: user._id,
		});

		if (collection) {
			await Collection.findByIdAndDelete(collection._id);
			return {
				success: true,
				data: { saved: false },
			};
		}
		await Collection.create({ question: questionId, author: user._id });

		return {
			success: true,
			data: { saved: true },
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
