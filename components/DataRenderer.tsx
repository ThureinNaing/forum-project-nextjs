/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AlertCircle, Frown, Search, Zap, RotateCcw } from "lucide-react";

const DataRenderer = ({
	success,
	data,
	errorMessage,
	render,
}: {
	success: boolean;
	data: any[];
	errorMessage?: string | undefined;
	render: (data: any[]) => React.ReactNode;
}) => {
	if (!success)
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="w-full max-w-md overflow-hidden rounded-xl border-2 border-blue-600 bg-linear-to-br from-blue-500 to-blue-600 p-8 shadow-lg dark:border-blue-400 dark:from-blue-900 dark:to-blue-800">
					{/* Icon section */}
					<div className="mb-6 flex justify-center">
						<div className="relative">
							<div className="absolute inset-0 animate-pulse rounded-full bg-blue-300 opacity-30 dark:bg-blue-400 blur-xl" />
							<div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-blue-700">
								<AlertCircle className="h-10 w-10 text-red-500" />
							</div>
						</div>
					</div>

					{/* Content section */}
					<div className="text-center">
						<div className="mb-3 flex items-center justify-center gap-2">
							<Frown className="h-5 w-5 text-red-500" />
							<h3 className="text-lg font-bold text-red-500">
								Oops! Error Occurred
							</h3>
						</div>
						<p className="text-sm leading-relaxed text-red-500">
							{errorMessage || "Something went wrong!"}
						</p>
					</div>

					{/* Footer with action icon */}
					<div className="mt-6 flex justify-center">
						<div className="inline-flex items-center gap-2 rounded-full bg-white bg-opacity-20 px-4 py-2 backdrop-blur-sm dark:bg-blue-700">
							<Zap className="h-4 w-4 text-white dark:text-blue-100" />
							<span className="text-xs font-medium text-white dark:text-blue-100">
								Please try again
							</span>
						</div>
					</div>
				</div>
			</div>
		);

	if (!data || !data.length)
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="w-full max-w-md overflow-hidden rounded-xl border-2 border-blue-400 bg-linear-to-br from-blue-50 to-blue-100 p-8 shadow-lg dark:border-blue-600 dark:from-blue-900 dark:to-blue-800">
					{/* Icon section */}
					<div className="mb-6 flex justify-center">
						<div className="relative">
							<div className="absolute inset-0 animate-bounce rounded-full bg-blue-300 opacity-30 dark:bg-blue-500 blur-xl" />
							<div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-700">
								<Search className="h-10 w-10 text-blue-600 dark:text-blue-200" />
							</div>
						</div>
					</div>

					{/* Content section */}
					<div className="text-center">
						<h3 className="mb-3 text-lg font-bold text-blue-900 dark:text-blue-50">
							No Data Found
						</h3>
						<p className="text-sm leading-relaxed text-blue-700 dark:text-blue-200">
							Try adjusting your filters or search criteria to
							find what you're looking for.
						</p>
					</div>

					{/* Footer with suggestion */}
					<div className="mt-6 flex justify-center">
						<div className="inline-flex items-center gap-2 rounded-full bg-blue-200 px-4 py-2 dark:bg-blue-700">
							<RotateCcw className="h-4 w-4 text-blue-600 dark:text-blue-200" />
							<span className="text-xs font-medium text-blue-700 dark:text-blue-100">
								Try different filters
							</span>
						</div>
					</div>
				</div>
			</div>
		);

	return <div>{render(data)}</div>;
};

export default DataRenderer;
