"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse, handleErrorResponse } from "../response";
import DeleteAnswerSchema from "../Schema/DeleteAnswerSchema";
import validateBody from "../validateBody";
import Answer from "@/models/answer.model";
import Question from "@/models/question.model";
import Vote from "@/models/vote.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/routes";

export async function DeleteAnswerAction(params: { answerId: string }) {
	await dbConnect();
	const auth_session = await auth();
	const user = auth_session?.user;

	try {
		const validatedData = validateBody(params, DeleteAnswerSchema);
		const { answerId } = validatedData.data;
		const answer = await Answer.findById(answerId);
		if (!answer) throw new Error("Answer not found");

		await Question.findByIdAndUpdate(
			answer.question,
			{
				$inc: { answers: -1 },
			},
			{ new: true },
		);

		await Vote.deleteMany({ type_id: answerId, type: "answer" });
		await Answer.findByIdAndDelete(answerId);
		revalidatePath(ROUTES.PROFILE(user?.email));
		return { success: true };
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
