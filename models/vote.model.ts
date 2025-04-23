import { Document, model, models, Schema, Types } from "mongoose";

export interface IVote {
	author: Types.ObjectId;
	type_id: Types.ObjectId;
	type: "question" | "answer";
	voteType: "upvote" | "downvote";
}

export interface IVoteDocument extends IVote, Document {}

const VoteSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type_id: {
			type: Schema.Types.ObjectId,
			required: true,
			refPath: "type",
		},
		type: {
			type: String,
			required: true,
			enum: ["question", "answer"],
		},
		voteType: {
			type: String,
			required: true,
			enum: ["upvote", "downvote"],
		},
	},
	{
		timestamps: true,
	}
);
//a user can't vote the same thing more than once
VoteSchema.index({ author: 1, type_id: 1, type: 1 }, { unique: true });

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
