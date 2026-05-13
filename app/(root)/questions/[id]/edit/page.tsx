"use server";

import GetQuestion from "@/lib/actions/GetQuestion.actions";
import QuestionForm from "../../components/QuestionForm";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const { data: question, success } = await GetQuestion(id);

	if (!success || !question) notFound();
	return (
		<div className="p-5">
			<QuestionForm question={question} isEdit={true} />
		</div>
	);
};

export default page;
