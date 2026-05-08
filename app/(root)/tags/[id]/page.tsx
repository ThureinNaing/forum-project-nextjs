import ThreadCard from "@/components/ThreadCard";
import DataRenderer from "@/components/DataRenderer";
import GetTagQuestion from "@/lib/actions/GetTagQuestions";
import Pagination from "@/components/Pagination";

export default async function page({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{
		// search: string | undefined;
		// filter: string | undefined;
		[key: string]: string; //don't need to specify exact keys
	}>;
}) {
	const { id } = await params;
	const { page, pageSize, search } = await searchParams;

	const { success, data, message } = await GetTagQuestion({
		page: Number(page) || 1,
		pageSize: Number(pageSize) || 10,
		search: search || "",
		tagId: id,
	});

	// const user = await auth();

	const { questions = [], tag, isNext = false } = data || {};

	return (
		<div className="p-5 space-y-5">
			<div className="flex items-center justify-between">
				<div className="font-bold text-3xl dark:text-blue-600">
					{tag?.name}
				</div>
			</div>

			<DataRenderer
				success={success}
				data={questions}
				errorMessage={message}
				render={(questions) =>
					questions.map((question, index) => (
						<ThreadCard question={question} key={index} />
					))
				}
			/>
			<Pagination isNext={isNext} page={page} />
		</div>
	);
}
