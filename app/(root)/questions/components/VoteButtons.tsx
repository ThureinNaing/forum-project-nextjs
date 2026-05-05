"use client";

import { useState } from "react";

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

	const handleVote = (voteType: "upvote" | "downvote") => {
		setUpvotes(100);
		setDownvotes(200);
		setUserVote(voteType);
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
