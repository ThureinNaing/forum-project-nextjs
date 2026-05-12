import DataRenderer from "@/components/DataRenderer";
import AnswerCard from "./AnswerCard";
import CommonFilters from "@/components/CommonFilters";
import { AnswerFilters, DefaultFilters } from "@/constants/filter.constant";
import { GetAnswers } from "@/lib/actions/GetAnswers.action";
import Pagination from "@/components/Pagination";

const AnswerList = async ({
	page,
	pageSize,
	filter,
	id,
}: {
	page: number;
	pageSize: number;
	filter: string;
	id: string;
}) => {
	const {
		success,
		data: answersData,
		message: answerErrorMsg,
	} = await GetAnswers({
		page: Number(page),
		pageSize: Number(pageSize),
		filter: filter as string,
		questionId: id,
	});

	const {
		answers = [],
		totalAnswers = 0,
		isNext = false,
	} = answersData || {};
	return (
		<>
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
					errorMessage={answerErrorMsg}
					data={answers}
					render={(answers) => {
						return answers.map((answer) => {
							return (
								<AnswerCard answer={answer} key={answer._id} />
							);
						});
					}}
				/>
			</div>
			<Pagination isNext={isNext} page={page} />
		</>
	);
};

export default AnswerList;
