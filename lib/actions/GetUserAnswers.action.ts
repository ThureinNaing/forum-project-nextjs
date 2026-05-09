"use server";

import Answer, { IAnswerDocument } from "@/models/answer.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import GetUserAnswersSchema from "../Schema/GetUserAnswersSchema";
import validateBody from "../validateBody";

export default async function GetUserAnswersAction(params: {
	userId: string;
	page?: number;
	pageSize?: number;
}): Promise<{
	success: boolean;
	data?: { answers: IAnswerDocument[]; isNext?: boolean };
	message?: string;
	deatils?: object | null;
}> {
	await dbConnect();

	try {
		const validatedData = validateBody(params, GetUserAnswersSchema);
		const { userId, page = 1, pageSize = 10 } = validatedData.data;
		const skip = Number(page - 1) * Number(pageSize);
		const limit = Number(pageSize);

		const totalAnswers = await Answer.countDocuments({
			author: userId,
		});
		const answers = await Answer.find({ author: userId })
			.populate("author", "_id name email")
			.populate("question", "_id  title")
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		const isNext = totalAnswers > skip + answers.length;

		return {
			success: true,
			data: {
				answers: JSON.parse(JSON.stringify(answers)),
				isNext,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
