const page = ({ params }: { params: { id: string } }) => {
	return (
		<div>
			<h1>Question Details page</h1>
			<p>{params.id}</p>
		</div>
	);
};

export default page;
