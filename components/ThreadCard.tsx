import * as React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Eye, MessageCircle, ThumbsUp, User } from "lucide-react";

import TagCard from "./TagCard";
import { threadCardDataType } from "@/types";

interface CardComponentProps {
	threadCardData: threadCardDataType;
}
const ThreadCard = ({ threadCardData }: CardComponentProps) => {
	return (
		<Card className="bg-gray-200 dark:bg-[#081338] shadow-md dark:shadow-blue-900">
			<CardHeader>
				<CardTitle>{threadCardData?.title}</CardTitle>
			</CardHeader>
			<CardContent className="space-x-2">
				{threadCardData?.tag?.map((tag) => (
					<TagCard href={`/?filter=${tag.toLowerCase()}`} key={tag}>
						{tag}
					</TagCard>
				))}
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex justify-between items-center gap-3">
					<User />
					<span>User, asked {threadCardData.time}</span>
				</div>
				<div className="flex justify-between items-center gap-5 text-sm">
					<div className="flex justify-between items-center gap-1">
						<ThumbsUp size={16} />{" "}
						<span>{threadCardData.like}</span>
					</div>
					<div className="flex justify-between items-center gap-1">
						<MessageCircle size={16} />
						{/* <span>{threadCardData.answer}</span> */}
					</div>
					<div className="flex justify-between items-center gap-1">
						<Eye size={16} /> <span>{threadCardData.view}</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ThreadCard;
