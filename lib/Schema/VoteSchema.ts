import z from "zod";

const VoteSchema = z.object({
	typeId: z.string(),
	type: z.enum(["question", "answer"]),
	voteType: z.enum(["upvote", "downvote"]),
});

export default VoteSchema;
