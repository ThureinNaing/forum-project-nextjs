"use client";

import React from "react";
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

interface ActionBtnsProps {
	type: "question" | "answer";
	typeId: string;
	showActions: boolean;
}

const ActionButtons = ({ type, typeId, showActions }: ActionBtnsProps) => {
	if (!showActions) {
		return null;
	}

	const deleteAction = async () => {
		console.log(`action for ${type} with id: ${typeId}`);
	};

	return (
		<div className="flex items-center gap-5">
			{type === "question" && (
				<Link
					href={ROUTES.QUESTION_DETAILS(typeId) + "/edit"}
					className="flex items-center gap-1 text-sm text-gray-400 hover:text-main transition-colors"
				>
					<FaEdit className="w-4 h-4 text-blue-500 cursor-pointer" />
				</Link>
			)}
			{/* <button
				onClick={deleteAction}
				className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
				type="button"
			></button> */}
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="outline">
						<FaTrash className="w-4 h-4 text-red-500 cursor-pointer" />
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
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={deleteAction}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ActionButtons;
