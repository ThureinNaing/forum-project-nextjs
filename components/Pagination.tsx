"use client";

import queryString from "query-string";
import { Button } from "./ui/button";
import { useRouter } from "nextjs-toploader/app";

const Pagination = ({
	isNext,
	page = 1,
}: {
	isNext: boolean | undefined;
	page: number | string;
}) => {
	page = Number(page);
	const router = useRouter();
	const handleClick = (type: "next" | "prev") => {
		const currentQuery = queryString.parse(window.location.search);
		const updatedQuery = {
			...currentQuery,
			page: type == "next" ? page + 1 : page - 1,
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
		<div className="flex items-center justify-center gap-4 p-5">
			<Button
				onClick={() => handleClick("prev")}
				variant={"outline"}
				className={`cursor-pointer `}
				disabled={page <= 1}
			>
				&lt; Previous
			</Button>
			<div className="rounded-xl text-white bg-blue-600 px-4 py-2 ">
				{page}
			</div>
			<Button
				onClick={() => handleClick("next")}
				variant={"outline"}
				className={`cursor-pointer`}
				disabled={!isNext}
			>
				Next &gt;
			</Button>
		</div>
	);
};

export default Pagination;
