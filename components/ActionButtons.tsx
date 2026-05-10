"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import ROUTES from "@/routes";

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
			<button
				onClick={deleteAction}
				className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
				type="button"
			>
				<FaTrash className="w-4 h-4 text-red-500 cursor-pointer" />
			</button>
		</div>
	);
};

export default ActionButtons;
