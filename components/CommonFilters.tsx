"use client";

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";

export interface Filter {
	name: string;
	value: string;
}
const CommonFilters = ({
	filters,
	defaultFilter,
}: {
	filters: Filter[];
	defaultFilter: string;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentFilter = searchParams.get("filter") || defaultFilter;

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		const currentQuery = queryString.parse(window.location.search);
		const updatedQuery = {
			...currentQuery,
			filter: selectedValue ? selectedValue : "",
		};
		const url = queryString.stringifyUrl(
			{
				url: window.location.pathname,
				query: updatedQuery,
			},
			{ skipNull: true, skipEmptyString: true },
		);
		router.push(url);
	};
	return (
		<div className="p-5">
			<select
				value={currentFilter}
				onChange={handleFilterChange}
				className="rounded-xl px-4 py-2 bg-accent  dark:bg-[#081338] dark:text-gray-300 border-none outline-none cursor-pointer "
			>
				{filters?.map((filter) => (
					<option
						value={filter.value}
						key={filter.value}
						className="cursor-pointer"
					>
						{filter.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default CommonFilters;
