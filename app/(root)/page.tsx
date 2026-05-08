import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes";
import Link from "next/link";
import { GetAllQuestions } from "@/lib/actions/GetAllQuestions.actions";
import DataRenderer from "@/components/DataRenderer";
import CommonFilters from "@/components/CommonFilters";
import {
	DefaultFilters,
	HomePageFilters,
} from "../../constants/filter.constant";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{
		// search: string | undefined;
		// filter: string | undefined;
		[key: string]: string; //don't need to specify exact keys
	}>;
}) {
	const { page, pageSize, search, filter } = await searchParams;

	const { success, data, message } = await GetAllQuestions({
		page: Number(page) || 1,
		pageSize: Number(pageSize) || 10,
		search: search || "",
		filter: filter || "",
	});

	// const user = await auth();

	const { questions = [] } = data || {};

	return (
		<div className="p-5 space-y-5">
			<div className="flex items-center justify-between">
				<div className="font-bold text-3xl dark:text-blue-600">
					All Threads
				</div>
				<CommonFilters
					filters={HomePageFilters}
					defaultFilter={DefaultFilters.HomePageFilters}
				/>
				<Button
					variant={"outline"}
					className="cursor-pointer dark:text-blue-600 dark:hover:text-blue-600"
				>
					<Link href={ROUTES.QUESTION_CREATE}>Create new thread</Link>
				</Button>
			</div>
			<Filters />
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
		</div>
	);
}
