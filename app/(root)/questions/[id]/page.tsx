import Preview from "@/components/Preview";
import TagCard from "@/components/TagCard";
import { GetQuestion } from "@/lib/actions/GetQuestion.actions";
import { IncrementViews } from "@/lib/actions/IncrementViews.action";
import { notFound } from "next/navigation";
import { after } from "next/server";
import AnswerForm from "../components/AnswerForm";
import { GetAnswers } from "@/lib/actions/GetAnswers.action";
import AnswerList from "../components/AnswerList";
import VoteButtons from "../components/VoteButtons";
import ToggleBookmark from "../components/ToggleBookmark";

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

	const {
		success,
		data: answersData,
		message: answerErrorMsg,
	} = await GetAnswers({
		page: Number(page),
		pageSize: Number(pageSize),
		filter: filter as string,
		questionId: id,
	});

	const { answers = [], totalAnswers = 0 } = answersData || {};

	return (
		<div className="p-3">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">{question.title}</h1>
				<div className="flex items-center gap-3 text-xs text-gray-200">
					<VoteButtons
						type="question"
						typeId={id.toString()}
						initialDownvotes={question.downvotes}
						initialUpvotes={question.upvotes}
					/>
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
				<AnswerList
					answers={answers}
					totalAnswers={totalAnswers}
					success={success}
					errorMessage={answerErrorMsg}
				/>
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
