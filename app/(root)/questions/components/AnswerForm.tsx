"use client";

import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { CreateAnswer } from "@/lib/actions/CreateAnswer.action";
import { GenerateAiAnswer } from "@/lib/actions/GenerateAiAnswer.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AnswerForm = ({
	questionId,
	questionTitle,
	questionContent,
}: {
	questionId: string;
	questionTitle: string;
	questionContent: string;
}) => {
	const [content, setContent] = useState("");
	const router = useRouter();

	const generateAiAnswer = async () => {
		console.log("ai generate");
		const { success, data } = await GenerateAiAnswer({
			title: questionTitle,
			content: questionContent,
			userAnswer: content,
		});
	};

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const { success, data, message } = await CreateAnswer({
				questionId,
				content,
			});
			console.log(message);

			if (success && data) {
				setContent("");
				toast.success("Answer submitted successfully!");
				return router.push(ROUTES.QUESTION_DETAILS(questionId));
			}
		} catch (error) {
			console.log("Error submitting answer:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to submit answer. Please try again.",
			);
		}
	};

	return (
		<form onSubmit={submit}>
			<div className="mt-3">
				<Editor
					label="Any Question?"
					value={content}
					onChange={(v) => setContent(v)}
				/>
			</div>
			<div className="flex justify-end gap-5">
				<Button
					className="mt-3"
					type="button"
					onClick={generateAiAnswer}
				>
					Generate Ai Answer
				</Button>
				<Button variant={"ghost"} className="mt-3" type="submit">
					Post Your Answer
				</Button>
			</div>
		</form>
	);
};

export default AnswerForm;
