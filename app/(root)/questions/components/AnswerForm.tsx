"use client";

import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { CreateAnswer } from "@/lib/actions/CreateAnswer.action";
import { GenerateAiAnswer } from "@/lib/actions/GenerateAiAnswer.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
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
	const [loading, setLoading] = useState(false);
	const [isPending, startTransition] = useTransition();

	const generateAiAnswer = async () => {
		try {
			setLoading(true);

			const { success, data, message } = await GenerateAiAnswer({
				title: questionTitle,
				content: questionContent,
				userAnswer: content,
			});

			if (success && data) {
				let { answer = "" } = data || {};
				answer = answer.replace(/<think>[\s\S]*?<\/think>/g, ""); // remove think tag
				setContent(answer.trim());
			} else {
				toast.error(message);
			}
			setLoading(false);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "AI generation failed";
			toast.error(errorMessage);
			setLoading(false);
		}
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			try {
				const { success, data, message } = await CreateAnswer({
					questionId,
					content,
				});

				if (success && data) {
					setContent("");
					toast.success("Answer submitted successfully!");
					router.push(ROUTES.QUESTION_DETAILS(questionId));
					return;
				}

				toast.error(
					message || "Failed to submit answer. Please try again.",
				);
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: "Failed to submit answer. Please try again.",
				);
			}
		});
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
					{loading ? "Generating..." : "Generate Ai Answer"}
				</Button>
				<Button
					variant={"ghost"}
					className="mt-3"
					type="submit"
					disabled={isPending}
				>
					{isPending ? (
						<FaSpinner className="h-5 w-5 animate-spin" />
					) : (
						<span>Post Your Answer</span>
					)}
				</Button>
			</div>
		</form>
	);
};

export default AnswerForm;
