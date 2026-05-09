"use server";

import User, { IUserDocument } from "@/models/user.model";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import GetUserSchema from "../Schema/GetUserSchema";
import validateBody from "../validateBody";
import Question from "@/models/question.model";
import Answer from "@/models/answer.model";

export default async function GetUserAction(params: {
	email: string;
}): Promise<{
	success: boolean;
	data?: {
		user: IUserDocument;
		totalQuestions: number;
		totalAnswers: number;
	} | null;
	message?: string;
	details?: object | null;
}> {
	await dbConnect();
	try {
		const validatedData = validateBody(params, GetUserSchema);
		const { email } = validatedData.data;
		const user = await User.findOne({ email: email })
			.select("-password")
			.exec();
		if (!user) throw new Error("User not found");

		const [totalQuestions, totalAnswers] = await Promise.all([
			Question.countDocuments({ author: user._id }),
			Answer.countDocuments({ author: user._id }),
		]);

		return {
			success: true,
			data: {
				user: JSON.parse(JSON.stringify(user)),
				totalQuestions,
				totalAnswers,
			},
		};
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
