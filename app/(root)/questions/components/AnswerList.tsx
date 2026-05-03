import DataRenderer from "@/components/DataRenderer";
import { IAnswerDocument } from "@/models/answer.model";
import AnswerCard from "./AnswerCard";

const AnswerList = ({
	answers,
	success,
	errorMessage,
	totalAnswers,
}: {
	answers: IAnswerDocument[];
	success: boolean;
	errorMessage?: string;
	totalAnswers: number;
}) => {
	return (
		<div className="mt-8">
			<h3 className="font-bold text-xl">AnswerList - {totalAnswers}</h3>

			<DataRenderer
				success={success}
				errorMessage={errorMessage}
				data={answers}
				render={(answers) => {
					return answers.map((answer) => {
						return <AnswerCard answer={answer} key={answer._id} />;
					});
				}}
			/>
		</div>
	);
};

export default AnswerList;
