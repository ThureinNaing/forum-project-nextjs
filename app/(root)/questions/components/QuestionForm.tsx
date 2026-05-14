"use client";

import Editor from "@/components/Editor";
import RemovableTagCard from "@/components/RemovableTagCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateQuestionAction } from "@/lib/actions/CreateQuestion.actions";
import { QuestionEdit } from "@/lib/actions/QuestionEdit.actions";

import ROUTES from "@/routes";
import type { QuestionDetails } from "@/types/question";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const QuestionForm = ({
	question,
	isEdit = false,
}: {
	question?: QuestionDetails;
	isEdit?: boolean;
}) => {
	const [title, setTitle] = useState(question?.title ?? "");
	const [content, setContent] = useState(question?.content ?? "");
	const [tags, setTags] = useState<string[]>(
		question?.tags?.map((tag) => tag.name) ?? [],
	);
	const [newTag, setNewTag] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const enterPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const lowerCaseTags = tags.map((tag) => tag.toLowerCase().trim());
			if (!lowerCaseTags.includes(newTag.toLowerCase().trim())) {
				setTags([...tags, newTag]);
				setNewTag("");
				setError("");
			} else {
				setError("Tag has already existed");
			}
		}
	};
	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			try {
				if (isEdit && question) {
					const res = await QuestionEdit({
						questionId: question._id as string,
						title,
						content,
						tags,
					});

					if (res.success) {
						toast.success("Question updated successfully!");
						router.push(ROUTES.QUESTION_DETAILS(res.data!._id));
					}
					return;
				}

				const result = await CreateQuestionAction({
					title,
					content,
					tags,
				});

				if (result.success && result.data) {
					toast.success("Question created successfully!");
					return router.push(
						ROUTES.QUESTION_DETAILS(result.data?._id),
					);
				} else {
					toast.error(result.message || "Failed to create question");
				}
			} catch (err) {
				if (err instanceof Error) {
					toast.error(err.message);
				}
			}
		});
	};

	const removeTag = (tagToRemove: string) => {
		const filteredTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(filteredTags);
	};
	return (
		<form className="space-y-5" onSubmit={submit}>
			<h1 className="text-2xl font-bold">Ask A New Question?</h1>

			<div className="space-y-2">
				<Label htmlFor="title" className="font-semibold p-2">
					Title
				</Label>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					id="title"
					className="bg-gray-200 dark:bg-[#081338]"
				/>
				{!error && (
					<p className="text-muted-foreground text-sm">
						Describe you questin title in short way
					</p>
				)}
				{/* {error && <p className="text-sm text-red-500">{error}</p>} */}
			</div>
			{/* editor component */}
			<Editor
				label="Any question?"
				value={content}
				onChange={(v: string) => setContent(v)}
			/>
			<div className="space-y-2">
				<Label htmlFor="tags" className="font-semibold p-2">
					Tags
				</Label>
				<Input
					onKeyDown={enterPressHandler}
					value={newTag}
					onChange={(e) => setNewTag(e.target.value)}
					placeholder="Tags"
					id="tags"
					className="bg-gray-200 dark:bg-[#081338]"
				/>
				{!error && (
					<p className="text-muted-foreground text-sm">
						Please press enter to add tags
					</p>
				)}
				{error && <p className="text-sm text-red-500">{error}</p>}
				<div className="flex items-center space-x-2">
					{tags.map((tag, index) => (
						<RemovableTagCard
							key={index}
							onRemove={() => removeTag(tag)}
						>
							{tag}
						</RemovableTagCard>
					))}
				</div>
			</div>
			<Button
				type="submit"
				disabled={isPending}
				className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer"
			>
				{isPending ? (
					<span className="flex items-center gap-2">
						{isEdit ? "Updating..." : "Creating..."}
					</span>
				) : (
					<>{isEdit ? "Update" : "Create"}</>
				)}
			</Button>
		</form>
	);
};

export default QuestionForm;
