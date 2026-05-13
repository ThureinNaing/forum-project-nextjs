const AnswerListLoading = () => {
	return (
		<div className="mt-8 space-y-6">
			{/* Header & Filter Skeleton */}
			<div className="flex justify-between items-center animate-pulse">
				<div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
				<div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
			</div>

			{/* Answer Cards Skeleton List */}
			<div className="space-y-4">
				{[1, 2, 3, 4, 5].map((item) => (
					<div
						key={item}
						className="p-6 bg-[#111827] border border-gray-800 rounded-xl animate-pulse space-y-4"
					>
						{/* User Info Row */}
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-gray-700 rounded-full"></div>
							<div className="h-4 bg-gray-700 rounded w-24"></div>
							<div className="h-4 bg-gray-700 rounded w-16 opacity-50"></div>
						</div>

						{/* Answer Content Lines */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-700 rounded w-full"></div>
							<div className="h-4 bg-gray-700 rounded w-full"></div>
							<div className="h-4 bg-gray-700 rounded w-2/3"></div>
						</div>

						{/* Bottom Actions (Votes/Date) */}
						<div className="flex items-center gap-4 pt-2">
							<div className="h-8 bg-gray-700 rounded w-16"></div>
							<div className="h-8 bg-gray-700 rounded w-16"></div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Skeleton */}
			<div className="flex justify-center gap-2 mt-10 animate-pulse">
				<div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
				<div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
			</div>
		</div>
	);
};

export default AnswerListLoading;
