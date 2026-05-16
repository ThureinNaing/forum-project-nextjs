export default function Loading() {
	return (
		<div className="flex flex-col space-y-5 p-5 mt-3">
			{/* Header Skeleton */}
			<div className="flex justify-between items-center">
				<div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
				<div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
				<div className="h-10 w-40 bg-slate-800 animate-pulse rounded" />
			</div>
			<div className="flex items-center gap-3 mt-4">
				<div className="h-8 w-24 bg-slate-800 animate-pulse rounded" />
				<div className="h-8 w-24 bg-slate-800 animate-pulse rounded" />
				<div className="h-8 w-24 bg-slate-800 animate-pulse rounded" />
			</div>
			{/* Skeleton ThreadCards */}
			<div className="space-y-4">
				{[1, 2, 3].map((item) => (
					<div
						key={item}
						className="h-40 w-full bg-slate-900 border border-slate-800 animate-pulse rounded-2xl"
					/>
				))}
			</div>
		</div>
	);
}
