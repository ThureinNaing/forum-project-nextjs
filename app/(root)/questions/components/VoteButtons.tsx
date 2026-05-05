"use client";

import GetUserVote from "@/lib/actions/GetUserVote.action";
import { VoteAction } from "@/lib/actions/Vote.action";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VoteButtons = ({
	typeId,
	type,
	initialUpvotes,
	initialDownvotes,
}: {
	typeId: string;
	type: "question" | "answer";
	initialUpvotes: number;
	initialDownvotes: number;
}) => {
	const [upvotes, setUpvotes] = useState(initialUpvotes);
	const [downvotes, setDownvotes] = useState(initialDownvotes);
	const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(
		null,
	);

	useEffect(() => {
		const fetchUserVote = async () => {
			const { success, data } = await GetUserVote({ type, typeId });
			if (success && data) {
				setUserVote(data.userVote);
			}
		};
		fetchUserVote();
	}, [type, typeId]);

	const handleVote = async (voteType: "upvote" | "downvote") => {
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
