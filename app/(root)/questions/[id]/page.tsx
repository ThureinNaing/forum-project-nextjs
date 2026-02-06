import Preview from "@/components/Preview";
import TagCard from "@/components/TagCard";
import { GetQuestion } from "@/lib/actions/GetQuestion.actions";
import { notFound } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
	const { data: question, success } = await GetQuestion({
		questionId: params.id,
	});

	// const question = {
	// 	id: "q123",
	// 	title: "How to improve React app performance?",
	// 	content: `### Question

	// I'm looking for tips and best practices to enhance the performance of a React application. I have a moderately complex app with multiple components, and I've noticed some performance bottlenecks. What should I focus on?

	// #### What I've Tried:
	// - Lazy loading components
	// - Using React.memo on some components
	// - Managing state with React Context API

	// #### Issues:
	// - The app still lags when rendering large lists.
	// - Switching between pages feels sluggish.
	// - Sometimes, re-renders happen unexpectedly.

	// #### Key Areas I Need Help With:
	// 1. Efficiently handling large datasets.
	// 2. Reducing unnecessary re-renders.
	// 3. Optimizing state management.

	// Here is a snippet of my code that renders a large list. Maybe I'm doing something wrong here:

	// \`\`\`js
	// import React, { useState, useMemo } from "react";

	// const LargeList = ({ items }) => {
	//   const [filter, setFilter] = useState("");

	//   // Filtering items dynamically
	//   const filteredItems = useMemo(() => {
	//     return items.filter((item) => item.includes(filter));
	//   }, [items, filter]);

	//   return (
	//     <div>
	//       <input
	//         type="text"
	//         value={filter}
	//         onChange={(e) => setFilter(e.target.value)}
	//         placeholder="Filter items"
	//       />
	//       <ul>
	//         {filteredItems.map((item, index) => (
	//           <li key={index}>{item}</li>
	//         ))}
	//       </ul>
	//     </div>
	//   );
	// };

	// export default LargeList;
	// \`\`\`

	// #### Questions:
	// 1. Is using \`useMemo\` the right approach here, or is there a better alternative?
	// 2. Should I implement virtualization for the list? If yes, which library would you recommend?
	// 3. Are there better ways to optimize state changes when dealing with user input and dynamic data?

	// Looking forward to your suggestions and examples!

	// **Tags:** React, Performance, State Management
	//   `,
	// 	createdAt: "2025-01-15T12:34:56.789Z",
	// 	upvotes: 42,
	// 	downvotes: 3,
	// 	views: 1234,
	// 	answers: 5,
	// 	tags: [
	// 		{ _id: "tag1", name: "React" },
	// 		{ _id: "tag2", name: "Node" },
	// 		{ _id: "tag3", name: "PostgreSQL" },
	// 	],
	// 	author: {
	// 		_id: "u456",
	// 		name: "Jane Doe",
	// 		image: "/avatars/jane-doe.png",
	// 	},
	// };

	if (!question) notFound();

	return (
		<div className="p-3">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">{question.title}</h1>
				<div className="flex justify-center gap-3 text-xs text-gray-200">
					<div>{question.upvotes} Likes</div>
					<div>{question.downvotes} Dislikes</div>
					<div>{question.answers} Answers</div>
					<div>{question.views} Views</div>
				</div>
			</div>
			<div className="my-3">
				<Preview content={question.content} />
			</div>
			<div className="mt-8 flex flex-wrap gap-2">
				{question.tags.map((tag, index) => (
					<TagCard href={`/tags/${tag._id}`} key={index}>
						{tag.name}
					</TagCard>
				))}
			</div>
		</div>
	);
}

export default page;
