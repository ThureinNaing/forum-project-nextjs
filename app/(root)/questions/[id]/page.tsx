import Preview from "@/components/Preview";
import TagCard from "@/components/TagCard";
import { GetQuestion } from "@/lib/actions/GetQuestion.actions";
import { IncrementViews } from "@/lib/actions/IncrementViews.action";
import { notFound } from "next/navigation";
import { after } from "next/server";

async function page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
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
				<div className="flex justify-center gap-3 text-xs text-gray-200">
					<div>{question.upvotes} Likes</div>
					<div>{question.downvotes} Dislikes</div>
					<div>{question.answers} Answers</div>
					<div>{question.views} Views</div>
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
		</div>
	);
}

export default page;
