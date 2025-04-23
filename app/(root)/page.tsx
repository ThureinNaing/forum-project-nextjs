import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes";
import Link from "next/link";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{
		search: string | undefined;
		filter: string | undefined;
	}>;
}) {
	// const { search, filter } = await searchParams;

	return (
		<div className="p-5 space-y-5">
			<div className="flex items-center justify-between">
				<div className="font-bold text-3xl dark:text-blue-600">
					All Threads
				</div>
				<Button
					variant={"outline"}
					className="cursor-pointer dark:text-blue-600 dark:hover:text-blue-600"
				>
					<Link href={ROUTES.QUESTION_CREATE}>Create new thread</Link>
				</Button>
			</div>
			<Filters />
			<ThreadCard />
			<ThreadCard />
			<ThreadCard />
		</div>
	);
}
