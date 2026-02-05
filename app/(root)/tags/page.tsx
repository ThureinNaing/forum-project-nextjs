import DataRenderer from "@/components/DataRenderer";
import TagInfoCard from "@/components/TagInfoCard";
import { GetTags } from "@/lib/actions/GetTags.actions";

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
				<div className="font-bold text-3xl dark:text-blue-600">
					All Tags
				</div>
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
										name={tag.name}
										count={tag.questions}
										id={tag.id}
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
