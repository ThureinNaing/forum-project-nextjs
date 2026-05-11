"use client";

import React, { useTransition } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import ROUTES from "@/routes";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import DeleteQuestion from "@/lib/actions/DeleteQuestin.action";
import { toast } from "sonner";

interface ActionBtnsProps {
	type: "question" | "answer";
	typeId: string;
	showActions: boolean;
}

const ActionButtons = ({ type, typeId, showActions }: ActionBtnsProps) => {
	const [isPending, startTransition] = useTransition();

	if (!showActions) return null;

	const handleDelete = () => {
		startTransition(async () => {
			try {
				if (type === "question") {
					const res = await DeleteQuestion({ questionId: typeId });

					if (res?.success) {
						toast.success("Question deleted successfully");
					} else {
						toast.error("Failed to delete question");
					}
				} else {
					// Future-proofing for answers
					toast.error("Delete Answer action not yet implemented");
				}
			} catch (error) {
				toast.error("An unexpected error occurred");
			}
		});
	};

	return (
		<div className="flex items-center gap-5">
			{type === "question" && (
				<Link
					href={ROUTES.QUESTION_DETAILS(typeId) + "/edit"}
					className="flex items-center gap-1 text-sm text-gray-400 hover:text-main transition-colors"
				>
					<Button variant={"outline"} className="cursor-pointer">
						<FaEdit className="w-4 h-4 text-blue-500 cursor-pointer" />
					</Button>
				</Link>
			)}
			{/* <button
				onClick={deleteAction}
				className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
				type="button"
			></button> */}
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="outline" className="cursor-pointer">
						<FaTrash className="text-red-500 cursor-pointer" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you absolutely sure?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete your account from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							variant={"destructive"}
							className="cursor-pointer"
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							variant={"secondary"}
							className="cursor-pointer0"
							onClick={handleDelete}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ActionButtons;
