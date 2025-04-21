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

const ThreadCard = () => {
	return (
		<Card className="bg-gray-200 dark:bg-[#081338] shadow-md dark:shadow-blue-900">
			<CardHeader>
				<CardTitle>What is Next Js? How does it work?</CardTitle>
			</CardHeader>
			<CardContent className="space-x-2">
				<TagCard href="/?filters=nextjs">NextJs</TagCard>
				<TagCard href="/?filters=react">React</TagCard>
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex justify-between items-center gap-3">
					<User />
					<span>User, asked 3 minutes ago</span>
				</div>
				<div className="flex justify-between items-center gap-5 text-sm">
					<div className="flex justify-between items-center gap-1">
						<ThumbsUp size={16} /> <span>1.2 Likes</span>
					</div>
					<div className="flex justify-between items-center gap-1">
						<MessageCircle size={16} />
						<span> 1.2 Answers</span>
					</div>
					<div className="flex justify-between items-center gap-1">
						<Eye size={16} /> <span>1.2M Views</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ThreadCard;
