export const RightSidebarSkeleton = () => {
	return (
		<div className="space-y-10">
			{/* Popular Questions Skeleton */}
			<div className="space-y-5">
				<div className="h-7 w-40 bg-slate-800 animate-pulse rounded" />
				<div className="space-y-4">
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="flex items-center space-x-2">
							<div className="h-6 w-6 rounded-full bg-slate-800 animate-pulse" />
							<div className="h-4 w-full bg-slate-800 animate-pulse rounded" />
						</div>
					))}
				</div>
			</div>

			{/* Popular Tags Skeleton */}
			<div className="space-y-5">
				<div className="h-7 w-32 bg-slate-800 animate-pulse rounded" />
				<div className="space-y-6">
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="flex items-center space-x-3">
							<div className="h-10 w-10 rounded bg-slate-800 animate-pulse" />
							<div className="h-5 w-24 bg-slate-800 animate-pulse rounded" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
