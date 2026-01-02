import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<div>
			<h1>Question Details page</h1>
			<p>{id}</p>
			<Link href="/eidt">Go Back to Questions</Link>
		</div>
	);
};

export default page;
