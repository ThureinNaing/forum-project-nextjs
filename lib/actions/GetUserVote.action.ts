"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import User from "@/models/user.model";
import Vote from "@/models/vote.model";

export default async function GetUserVote(params: {
	type: "question" | "answer";
	typeId: string;
}): Promise<{
	success: boolean;
	data?: { userVote: "upvote" | "downvote" | null };
	message?: string;
	details?: object | null;
}> {
	await dbConnect();
	const auth_session = await auth();
	const userEmail = auth_session?.user?.email;
	try {
		const userId = await User.findById(userEmail);
		if (!userId) throw new Error("Unauthorized");

		const vote = await Vote.findOne({ author: userId, type_id: typeId });
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
