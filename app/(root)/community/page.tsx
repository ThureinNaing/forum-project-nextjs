import DataRenderer from "@/components/DataRenderer";

import GetUsersAction from "@/lib/actions/GetUsers.action";
import UserCard from "./components/UserCard";
import CommonFilters from "@/components/CommonFilters";
import { DefaultFilters, UserFilters } from "@/constants/filter.constant";

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

	const { success, data, message } = await GetUsersAction({
		page: Number(page) || 1,
		pageSize: Number(pageSize) || 10,
		search: search || "",
		filter: filter || "",
	});

	// const user = await auth();

	const { users = [] } = data || {};

	return (
		<div className="p-5 space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl dark:text-blue-600">
					All Users
				</h1>

				<CommonFilters
					filters={UserFilters}
					defaultFilter={DefaultFilters.UserFilters}
				/>
			</div>
			<DataRenderer
				success={success}
				data={users}
				errorMessage={message}
				render={(users) => {
					return (
						<div className="grid grid-cols-4 gap-4">
							{users.map((user, index) => {
								return (
									<UserCard
										key={index}
										id={user._id.toString()}
										name={user.name}
										image={user.image}
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
