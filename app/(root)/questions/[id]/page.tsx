import Preview from "@/components/Preview";
import TagCard from "@/components/TagCard";
import { GetQuestion } from "@/lib/actions/GetQuestion.actions";
import { IncrementViews } from "@/lib/actions/IncrementViews.action";
import { notFound } from "next/navigation";
import { after } from "next/server";
import AnswerForm from "../components/AnswerForm";
import AnswerList from "../components/AnswerList";
import VoteButtons from "../components/VoteButtons";
import ToggleBookmark from "../components/ToggleBookmark";
import GetUserVote from "@/lib/actions/GetUserVote.action";
import { Suspense } from "react";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = (await params).id;

	const { data: question } = await GetQuestion({
		questionId: id,
	});

	return {
		title: question?.title,
		description: question?.content.slice(0, 100),
	};
}

async function page({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string }>;
}) {
	const { id } = await params;
	const { page = 1, pageSize = 10, filter } = await searchParams;

	const { data: question } = await GetQuestion({
		questionId: id,
	});

	if (!question) notFound();

	after(async () => {
		await IncrementViews({ questionId: id }); // Increment views count
	});

	return (
		<div className="p-3">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">{question.title}</h1>
				<div className="flex items-center gap-3 text-xs text-gray-200">
					<Suspense fallback={<>Loading...</>}>
						<VoteButtons
							type="question"
							typeId={id.toString()}
							initialDownvotes={question.downvotes}
							initialUpvotes={question.upvotes}
							GetUserVoteActionPromise={GetUserVote({
								type: "question",
								typeId: question._id,
							})}
						/>
					</Suspense>
					<div>{question.answers} Answers</div>
					<div>{question.views} Views</div>
					<ToggleBookmark
						questionId={question._id.toString()}
						saved={question.saved}
					/>
				</div>
			</div>
			<div className="my-3">
				<Preview content={question.content} />
			</div>
			<div className="mt-8 flex flex-wrap gap-2">
				{question.tags.map((tag, index) => (
					<TagCard href={`/tags/${tag._id}`} key={index}>
						{tag.name}
					</TagCard>
				))}
			</div>

			<div className="my-3">
				<Suspense fallback={<>Loading...</>}>
					<AnswerList
						id={id}
						page={Number(page)}
						pageSize={Number(pageSize)}
						filter={filter}
					/>
				</Suspense>
			</div>

			<div className="my-3">
				<AnswerForm
					questionId={id}
					questionTitle={question.title}
					questionContent={question.content}
				/>
			</div>
		</div>
	);
}

export default page;
