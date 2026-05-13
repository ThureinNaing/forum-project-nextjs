/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AlertTriangle, Search } from "lucide-react";

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
			<div className="flex items-center justify-center min-h-96 p-4">
				<div className="w-full max-w-md overflow-hidden rounded-2xl p-8 shadow-2xl ">
					{/* Icon section */}
					<div className="mb-6 flex justify-center">
						<div className="relative">
							<div className="absolute inset-0 animate-pulse rounded-full bg-red-300 opacity-40 blur-2xl dark:bg-red-600" />
							<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600">
								<AlertTriangle className="h-12 w-12 text-white" />
							</div>
						</div>
					</div>

					{/* Content section */}
					<div className="mb-6 text-center">
						<h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
							Oops! Error Occurred
						</h1>
						<p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
							We encountered an error while loading this data.
							Please try again.
						</p>

						{/* Error message */}
						{errorMessage && (
							<div className="mb-4 rounded-lg bg-red-50 p-3 text-left dark:bg-red-950">
								<p className="text-xs font-mono text-red-700 dark:text-red-300">
									{errorMessage}
								</p>
							</div>
						)}
					</div>

					{/* Footer message */}
					<p className="text-center text-xs text-gray-500 dark:text-gray-400">
						If this problem persists, please contact support.
					</p>
				</div>
			</div>
		);

	if (!data || !data.length)
		return (
			<div className="flex items-center justify-center min-h-96 p-4">
				<div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-2xl dark:border-blue-800 dark:bg-slate-900">
					{/* Icon section */}
					<div className="mb-6 flex justify-center">
						<div className="relative">
							<div className="absolute inset-0 animate-bounce rounded-full bg-blue-300 opacity-40 blur-2xl dark:bg-blue-600" />
							<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600">
								<Search className="h-12 w-12 text-white" />
							</div>
						</div>
					</div>

					{/* Content section */}
					<div className="mb-6 text-center">
						<h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
							No Data Found
						</h1>
						<p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
							Try adjusting your filters or search criteria to
							find what you're looking for.
						</p>
					</div>

					{/* Footer message */}
					<p className="text-center text-xs text-gray-500 dark:text-gray-400">
						If you need help, please contact support.
					</p>
				</div>
			</div>
		);

	return <div>{render(data)}</div>;
};

export default DataRenderer;
