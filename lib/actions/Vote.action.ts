"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import VoteSchema from "../Schema/VoteSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import Question from "@/models/question.model";
import Answer from "@/models/answer.model";
import Vote from "@/models/vote.model";
import User from "@/models/user.model";

export async function VoteAction(params: {
	type: "question" | "answer";
	typeId: string;
	voteType: "upvote" | "downvote";
}): Promise<{
	success: boolean;
	data?: {
		upvotes: number;
		downvotes: number;
		userVote: "upvote" | "downvote" | null;
	};
	message?: string;
	details?: object | null;
}> {
	await dbConnect();
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const auth_session = await auth();
		const userEmail = auth_session?.user?.email;
		const userId = await User.findOne({ email: userEmail }).select("_id");

		if (!userId) throw new Error("Unauthorized");

		const validatedData = validateBody(params, VoteSchema);
		const { type, typeId, voteType } = validatedData.data;

		const Model = type === "question" ? Question : Answer;
		const item = await Model.findById(typeId).session(session);
		if (!item) throw new Error("Not found!");

		const existingVote = await Vote.findOne({
			author: userId,
			type_id: typeId,
			type,
		}).session(session);

		let upvoteChange = 0;
		let downvoteChange = 0;
		let finalUserVote: "upvote" | "downvote" | null = null;

		if (existingVote) {
			// If user already voted, handle toggle/change
			if (existingVote.voteType === voteType) {
				// Same vote type clicked - remove the vote
				if (voteType === "upvote") {
					upvoteChange = -1;
				} else {
					downvoteChange = -1;
				}
				await Vote.findByIdAndDelete(existingVote._id).session(session);
				finalUserVote = null;
			} else {
				// Different vote type - switch the vote
				if (voteType === "upvote") {
					upvoteChange = 1;
					downvoteChange = -1;
				} else {
					upvoteChange = -1;
					downvoteChange = 1;
				}

				existingVote.voteType = voteType;
				await existingVote.save({ session });
				finalUserVote = voteType;
			}
		} else {
			// New vote
			await Vote.create(
				[{ author: userId, type_id: typeId, type, voteType }],
				{ session },
			);

			if (voteType === "upvote") {
				upvoteChange = 1;
			} else {
				downvoteChange = 1;
			}

			finalUserVote = voteType;
		}

		// Update the item's vote counts
		const updatedItem = await Model.findByIdAndUpdate(
			typeId,
			{ $inc: { upvotes: upvoteChange, downvotes: downvoteChange } },
			{ new: true, session },
		);

		if (!updatedItem) throw new Error("Target item not found");

		await session.commitTransaction();

		return {
			success: true,
			data: {
				upvotes: updatedItem.upvotes,
				downvotes: updatedItem.downvotes,
				userVote: finalUserVote,
			},
		};
	} catch (error) {
		await session.abortTransaction();
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
