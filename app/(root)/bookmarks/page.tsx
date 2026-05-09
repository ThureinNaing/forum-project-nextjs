import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import DataRenderer from "@/components/DataRenderer";
import GetBookmarkedCollection from "@/lib/actions/GetBookmarkedCollection.action";
import CommonFilters from "@/components/CommonFilters";
import { CollectionFilters, DefaultFilters } from "@/constants/filter.constant";
import Pagination from "@/components/Pagination";

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

	const { success, data, message } = await GetBookmarkedCollection({
		page: Number(page) || 1,
		pageSize: Number(pageSize) || 10,
		search: search || "",
		filter: filter || "",
	});

	const { collections = [], isNext = false } = data || {};

	return (
		<div className="p-5 space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl dark:text-blue-600">
					Saved Threads
				</h1>
				<CommonFilters
					filters={CollectionFilters}
					defaultFilter={DefaultFilters.CollectionFilters}
				/>
			</div>
			<Filters />
			<DataRenderer
				success={success}
				data={collections}
				errorMessage={message}
				render={(collections) =>
					collections.map((collection, index) => (
						<ThreadCard
							question={collection.question}
							key={index}
						/>
					))
				}
			/>
			<Pagination isNext={isNext} page={page} />
		</div>
	);
}
