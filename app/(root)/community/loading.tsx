const Loading = () => {
	return (
		<div className="p-5 space-y-5 animate-pulse">
			<div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
				<div className="h-10 w-72 rounded-2xl bg-gray-300 dark:bg-slate-700" />
				<div className="flex flex-wrap gap-3">
					{/* <div className="h-10 w-32 rounded-full bg-gray-300 dark:bg-slate-700" /> */}
					<div className="h-10 w-32 rounded-full bg-gray-300 dark:bg-slate-700" />
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center rounded-xl bg-gray-200 dark:bg-[#081338] p-4 space-y-4"
					>
						<div className="h-24 w-24 rounded-full bg-gray-300 dark:bg-slate-700" />
						<div className="h-5 w-32 rounded-full bg-gray-300 dark:bg-slate-700" />
					</div>
				))}
			</div>

			<div className="flex items-center justify-center gap-3 pt-2">
				<div className="h-10 w-20 rounded-full bg-gray-300 dark:bg-slate-700" />
				<div className="h-10 w-20 rounded-full bg-gray-300 dark:bg-slate-700" />
			</div>
		</div>
	);
};

export default Loading;
