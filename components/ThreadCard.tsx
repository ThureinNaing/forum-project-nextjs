import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Eye, MessageCircle, ThumbsUp, User } from "lucide-react";

import TagCard from "./TagCard";
import Link from "next/link";
import ROUTES from "@/routes";
import type { QuestionCard } from "@/types/question";
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";

const ThreadCard = ({ question }: { question: QuestionCard }) => {
	const authorName =
		((question as any)?.author?.name as string) || "Anonymous";

	// const upvotes = (answer as any)?.upvotes ?? 0;
	// const downvotes = (answer as any)?.downvotes ?? 0;

	const initial = authorName?.charAt(0)?.toUpperCase?.() || "?";
	return (
		<Card className="bg-gray-200 dark:bg-[#081338] shadow-md dark:shadow-blue-900 mb-5 cursor-pointer">
			<CardHeader>
				<CardTitle className="text-blue-500">
					<Link
						href={ROUTES.QUESTION_DETAILS(question._id.toString())}
					>
						{question?.title}
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-x-2">
				{question?.tags?.map((tag, index) => (
					<TagCard
						href={`/filter/${tag.name.toLowerCase()}`}
						key={index}
					>
						{tag.name}
					</TagCard>
				))}
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex justify-between items-center gap-3">
					{question?.author?.image ? (
						<Image
							src={question.author.image}
							alt={authorName}
							className="rounded-full"
							width={36}
							height={36}
						/>
					) : (
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
							{initial}
						</div>
					)}
					<span>
						{question.author.name}, asked{" "}
						{getTimeStamp(question.createdAt)}
					</span>
				</div>
				<div className="flex justify-between items-center gap-5 text-sm">
					<div className="flex justify-between items-center gap-1 cursor-pointer">
						<ThumbsUp size={16} /> <span>{question.upvotes}</span>
					</div>
					<div className="flex justify-between items-center gap-1 cursor-pointer">
						<MessageCircle size={16} />
						<span>{question.answers}</span>
					</div>
					<div className="flex justify-between items-center gap-1 cursor-pointer">
						<Eye size={16} /> <span>{question.views}</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ThreadCard;
