const ProfileHeaderLoading = () => {
	return (
		<div className="w-full max-w-4xl p-6 space-y-6">
			{/* Top Profile Card Skeleton */}
			<div className="bg-[#111827] border border-gray-800 rounded-xl p-8 flex items-start gap-6 animate-pulse">
				{/* Avatar Placeholder */}
				<div className="w-16 h-16 bg-gray-700 rounded-md"></div>

				<div className="flex-1 space-y-4">
					{/* Name and Handle */}
					<div className="space-y-2">
						<div className="h-8 bg-gray-700 rounded w-1/3"></div>
						<div className="h-4 bg-gray-700 rounded w-1/4"></div>
					</div>

					{/* Reputation Badge */}
					<div className="h-6 bg-gray-700 rounded-full w-24"></div>

					{/* Email Placeholder */}
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-700 rounded"></div>
						<div className="h-4 bg-gray-700 rounded w-1/2"></div>
					</div>
				</div>
			</div>

			{/* Stats Grid Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Questions Asked Card */}
				<div className="bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-6 animate-pulse">
					<div className="h-6 bg-gray-700 rounded w-1/2"></div>
					<div className="space-y-2">
						<div className="h-10 bg-gray-700 rounded w-12"></div>
						<div className="h-4 bg-gray-700 rounded w-3/4"></div>
					</div>
				</div>

				{/* Answers Given Card */}
				<div className="bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-6 animate-pulse">
					<div className="h-6 bg-gray-700 rounded w-1/2"></div>
					<div className="space-y-2">
						<div className="h-10 bg-gray-700 rounded w-12"></div>
						<div className="h-4 bg-gray-700 rounded w-3/4"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeaderLoading;
