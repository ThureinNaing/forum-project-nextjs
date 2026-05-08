import CommonFilters from "@/components/CommonFilters";
import DataRenderer from "@/components/DataRenderer";
import TagInfoCard from "@/components/TagInfoCard";
import { DefaultFilters, TagFilters } from "@/constants/filter.constant";
import { GetTags } from "@/lib/actions/GetTags.actions";

export default async function page({
	searchParams,
}: {
	searchParams: Promise<{
		// search: string | undefined;
		// filter: string | undefined;
		[key: string]: string; //don't need to specify exact keys
	}>;
}) {
	const { page = 1, pageSize = 10, search, filter } = await searchParams;

	const { success, data, message } = await GetTags({
		page: Number(page) || 1,
		pageSize: Number(pageSize) || 10,
		search: search || "",
		filter: filter || "",
	});

	// const user = await auth();

	const { tags = [] } = data || {};

	return (
		<div className="p-5 space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl dark:text-blue-600">
					All Tags
				</h1>

				<CommonFilters
					filters={TagFilters}
					defaultFilter={DefaultFilters.TagFilters}
				/>
			</div>
			<DataRenderer
				success={success}
				data={tags}
				errorMessage={message}
				render={(tags) => {
					return (
						<div className="grid grid-cols-4 gap-4">
							{tags.map((tag, index) => {
								return (
									<TagInfoCard
										key={index}
										id={tag._id.toString()}
										name={tag.name}
										count={tag.questions}
									/>
								);
							})}
						</div>
					);
				}}
			/>
		</div>
	);
}
