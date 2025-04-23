"use client";
import Editor from "@/components/Editor";
import TagCard from "@/components/TagCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const QuestionForm = () => {
	const [value, setValue] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState<string[]>(["NextJs", "React"]);
	const [newTag, setNewTag] = useState("");
	const [error, setError] = useState("");
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
	return (
		<div className="space-y-5">
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
				<p className="text-muted-foreground text-sm">
					Describe you questin title in short way
				</p>
			</div>
			{/* editor component */}
			<Editor
				label="Any question?"
				value={value}
				onChange={(v: string) => setValue(v)}
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
				<p className="text-muted-foreground text-sm">
					Please press enter to add tags
				</p>
				{error && <p className="text-sm text-red-500">{error}</p>}
				<div className="space-x-2">
					{tags.map((tag, index) => (
						<TagCard key={index} href={`/tags/${tag}`}>
							{tag}
						</TagCard>
					))}
				</div>
			</div>
			<Button className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer">
				Create
			</Button>
		</div>
	);
};

export default QuestionForm;
