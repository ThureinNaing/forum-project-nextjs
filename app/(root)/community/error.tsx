"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex items-center justify-center min-h-screen p-4 ">
			<div className="w-full max-w-md overflow-hidden rounded-2xl border-2  p-8 shadow-2xl ">
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
						Oops! Something Went Wrong
					</h1>
					<p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
						We encountered an unexpected error while loading this
						page. Please try again or return to home.
					</p>

					{/* Error details */}
					{error?.message && (
						<div className="mb-4 rounded-lg bg-red-50 p-3 text-left dark:bg-red-950">
							<p className="text-xs font-mono text-red-700 dark:text-red-300">
								{error.message}
							</p>
						</div>
					)}

					{/* Error digest */}
					{error?.digest && (
						<div className="text-xs text-gray-500 dark:text-gray-400">
							Error ID:{" "}
							<span className="font-mono">{error.digest}</span>
						</div>
					)}
				</div>

				{/* Action buttons */}
				<div className="space-y-3">
					<button
						onClick={() => unstable_retry()}
						className="flex w-full items-center justify-center gap-2 rounded-lg  px-6 py-3 font-semibold text-white transition-all duration-200 active:scale-95 cursor-pointer"
					>
						<RefreshCw className="h-5 w-5" />
						Try Again
					</button>

					<Link
						href="/community"
						className="flex w-full items-center justify-center gap-2 rounded-lg border-2  px-6 py-3 font-semibold text-blue-600 transition-all duration-200"
					>
						<Home className="h-5 w-5" />
						Back to Community
					</Link>
				</div>

				{/* Footer message */}
				<p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
					If this problem persists, please contact support.
				</p>
			</div>
		</div>
	);
}
