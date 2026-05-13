const VoteButtonsLoading = () => {
	return (
		<div className="flex items-center gap-3 animate-pulse">
			{/* Upvote Button Skeleton */}
			<div className="h-8.5 w-20 bg-gray-200 dark:bg-gray-800 border border-transparent rounded-md"></div>

			{/* Downvote Button Skeleton */}
			<div className="h-8.5 w-24 bg-gray-200 dark:bg-gray-800 border border-transparent rounded-md"></div>
		</div>
	);
};

export default VoteButtonsLoading;
