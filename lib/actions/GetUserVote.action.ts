"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import User from "@/models/user.model";
import Vote from "@/models/vote.model";
import validateBody from "../validateBody";
import GetUserVoteSchema from "../Schema/GetUserVoteSchema";

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
		const userId = await User.findOne({ email: userEmail }).select("_id");
		if (!userId) throw new Error("Unauthorized");

		const validatedData = validateBody(params, GetUserVoteSchema);
		const { type, typeId } = validatedData.data;

		const vote = await Vote.findOne({
			author: userId,
			type_id: typeId,
			type,
		});

		return { success: true, data: { userVote: vote?.voteType || null } };
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
