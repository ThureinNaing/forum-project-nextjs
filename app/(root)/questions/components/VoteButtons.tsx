"use client";

import { VoteAction } from "@/lib/actions/Vote.action";
import { use, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const VoteButtons = ({
	typeId,
	type,
	initialUpvotes,
	initialDownvotes,
	GetUserVoteActionPromise,
}: {
	typeId: string;
	type: "question" | "answer";
	initialUpvotes: number;
	initialDownvotes: number;
	GetUserVoteActionPromise: Promise<{
		success: boolean;
		data?: { userVote: "upvote" | "downvote" | null };
	}>;
}) => {
	const { data: session } = useSession();
	const { success, data } = use(GetUserVoteActionPromise);
	const [upvotes, setUpvotes] = useState(initialUpvotes);
	const [downvotes, setDownvotes] = useState(initialDownvotes);
	const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(
		success ? (data?.userVote ?? null) : null,
	);

	const handleVote = async (voteType: "upvote" | "downvote") => {
		// Check if user is logged in
		if (!session?.user) {
			toast.error("Please log in to vote");

			return;
		}

		try {
			const { success, data } = await VoteAction({
				type,
				typeId,
				voteType,
			});

			if (success) {
				const { upvotes = 0, downvotes = 0, userVote } = data || {};
				setUpvotes(upvotes);
				setDownvotes(downvotes);
				setUserVote(userVote ?? null);
			}
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An error occurred while voting";
			toast.error(errorMessage);
		}
	};

	return (
		<div className="flex items-center gap-3 text-xs">
			<button
				onClick={() => handleVote("upvote")}
				className={`cursor-pointer border p-2 rounded-md hover:bg-accent  dark:hover:bg-accent/50 ${userVote == "upvote" ? "text-blue-500 border-blue-500" : ""}`}
			>
				{upvotes} Likes
			</button>
			<button
				onClick={() => handleVote("downvote")}
				className={`cursor-pointer border p-2 rounded-md hover:bg-accent  dark:hover:bg-accent/50 ${userVote == "downvote" ? "text-red-500 border-red-500" : ""}`}
			>
				{downvotes} Dislikes
			</button>
		</div>
	);
};

export default VoteButtons;
