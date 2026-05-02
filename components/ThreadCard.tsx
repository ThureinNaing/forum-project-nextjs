import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Eye, MessageCircle, ThumbsUp, User } from "lucide-react";

import TagCard from "./TagCard";
import { IQuestionDocument } from "../models/question.model";
import Link from "next/link";
import ROUTES from "@/routes";

const ThreadCard = ({ question }: { question: IQuestionDocument }) => {
	return (
		<Link href={ROUTES.QUESTION_DETAILS(question._id.toString())}>
			<Card className="bg-gray-200 dark:bg-[#081338] shadow-md dark:shadow-blue-900 mb-5 cursor-pointer">
				<CardHeader>
					<CardTitle>{question?.title}</CardTitle>
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
						<User />
						<span>{question.author.name}, asked 3 mins ago</span>
					</div>
					<div className="flex justify-between items-center gap-5 text-sm">
						<div className="flex justify-between items-center gap-1 cursor-pointer">
							<ThumbsUp size={16} />{" "}
							<span>{question.upvotes}</span>
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
		</Link>
	);
};

export default ThreadCard;
