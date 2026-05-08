import DataRenderer from "@/components/DataRenderer";
import { IAnswerDocument } from "@/models/answer.model";
import AnswerCard from "./AnswerCard";
import CommonFilters from "@/components/CommonFilters";
import { AnswerFilters, DefaultFilters } from "@/constants/filter.constant";

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
			<div className="flex justify-between items-center">
				<h3 className="font-bold text-xl">
					AnswerList - {totalAnswers}
				</h3>
				<CommonFilters
					filters={AnswerFilters}
					defaultFilter={DefaultFilters.AnswerFilters}
				/>
			</div>

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
