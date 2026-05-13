import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const StatsCard = ({
	totalQuestions,
	totalAnswers,
}: {
	totalQuestions: number;
	totalAnswers: number;
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
			<Card className="bg-gray-200 dark:bg-[#081338]">
				<CardHeader className="pb-3">
					<CardTitle className="text-lg">Questions Asked</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-blue-600">
						{totalQuestions}
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
						Total questions posted
					</p>
				</CardContent>
			</Card>

			<Card className="bg-gray-200 dark:bg-[#081338]">
				<CardHeader className="pb-3">
					<CardTitle className="text-lg">Answers Given</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-green-600">
						{totalAnswers}
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
						Total answers provided
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatsCard;
