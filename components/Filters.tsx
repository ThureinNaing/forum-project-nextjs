"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [filter, setFilter] = useState(searchParams.get("filter") || "");
	const handleFilter = (filterType: string) => {
		// check if the filter is already selected
		if (filter === filterType) {
			setFilter("");
		} else {
			setFilter(filterType);
		}
		const currentQuery = queryString.parse(window.location.search);
		const updatedQuery = {
			...currentQuery,
			filter: filterType === filter ? "" : filterType,
		};
		const url = queryString.stringifyUrl(
			{
				url: window.location.pathname,
				query: updatedQuery,
			},
			{ skipNull: true, skipEmptyString: true }
		);
		router.push(url);
	};
	return (
		<div className="flex gap-2 ">
			<Button
				onClick={() => handleFilter("react")}
				size={"sm"}
				variant={`${filter == "react" ? "default" : "outline"}`}
				className={`cursor-pointer w-[100px] `}
			>
				React
			</Button>
			<Button
				onClick={() => handleFilter("nextjs")}
				size={"sm"}
				variant={`${filter == "nextjs" ? "default" : "outline"}`}
				className={`cursor-pointer w-[100px]`}
			>
				Next Js
			</Button>
			<Button
				onClick={() => handleFilter("vue")}
				size={"sm"}
				variant={`${filter == "vue" ? "default" : "outline"}`}
				className={`cursor-pointer w-[100px]`}
			>
				Vue
			</Button>
		</div>
	);
};

export default Filters;
