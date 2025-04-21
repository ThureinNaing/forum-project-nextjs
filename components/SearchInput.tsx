"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
	const router = useRouter(); // get the current url
	const searchParams = useSearchParams();
	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [debouncedSearch] = useDebounce(search, 300); // delay the search by 300ms
	useEffect(() => {
		const currentQuery = queryString.parse(window.location.search);
		const updatedQuery = {
			...currentQuery,
			search: debouncedSearch,
		};
		const url = queryString.stringifyUrl(
			{
				url: window.location.pathname,
				query: updatedQuery,
			},
			{ skipNull: true, skipEmptyString: true }
		);
		router.push(url);
	}, [debouncedSearch, router]);
	return (
		<>
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search here"
			/>
		</>
	);
};

export default SearchInput;
