import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	MapPin,
	Link as LinkIcon,
	Mail,
	Trophy,
	UserX,
	ArrowLeft,
	Search,
} from "lucide-react";
import Link from "next/link";
import GetUserAction from "@/lib/actions/GetUser.action";
import ProfileHeader from "@/components/ProfileHeader";
import StatsCard from "@/components/StatsCard";
import DataRenderer from "@/components/DataRenderer";
import ThreadCard from "@/components/ThreadCard";
import GetUserQuestionsAction from "@/lib/actions/GetUserQuestions.action";
import GetUserAnswersAction from "@/lib/actions/GetUserAnswers.action";
import AnswerCard from "../../questions/components/AnswerCard";

const ProfilePage = async ({
	params,
	searchParams,
}: {
	params: Promise<{
		email: string;
	}>;
	searchParams: Promise<{
		tab?: string;
	}>;
}) => {
	const userMail = (await params).email;
	const decodedEmail = decodeURIComponent(userMail);
	const activeTab = (await searchParams).tab;

	const users = await GetUserAction({ email: decodedEmail });

	if (!users.success || !users.data) {
		return (
			<div className="container mx-auto px-4 py-16">
				<div className="max-w-2xl mx-auto text-center">
					{/* Error Card */}
					<Card className="border-destructive/20 bg-destructive/5">
						<CardContent className="pt-12 pb-12">
							<div className="flex flex-col items-center space-y-6">
								{/* Error Icon */}
								<div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
									<UserX className="w-12 h-12 text-destructive" />
								</div>

								{/* Error Message */}
								<div className="space-y-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
										User Not Found
									</h1>
									<p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
										The user you're looking for doesn't
										exist or may have been removed.
									</p>
								</div>

								{/* Possible Reasons */}
								<div className="bg-muted/50 rounded-lg p-4 max-w-md">
									<h3 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
										This could happen because:
									</h3>
									<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left">
										<li>• The user ID is incorrect</li>
										<li>• The user account was deleted</li>
										<li>• The profile is set to private</li>
									</ul>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
									<Button
										asChild
										variant="default"
										className="flex-1"
									>
										<Link
											href="/"
											className="flex items-center gap-2"
										>
											<ArrowLeft className="w-4 h-4" />
											Go Home
										</Link>
									</Button>
									<Button
										asChild
										variant="outline"
										className="flex-1"
									>
										<Link
											href="/community"
											className="flex items-center gap-2"
										>
											<Search className="w-4 h-4" />
											Browse Users
										</Link>
									</Button>
								</div>

								{/* Help Text */}
								<p className="text-sm text-gray-500 dark:text-gray-500">
									If you believe this is an error, please
									contact support.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	const { user, totalQuestions, totalAnswers } = users.data;

	const { success, data, message } = await GetUserQuestionsAction({
		userId: users?.data?.user?._id || "",
		page: 1,
		pageSize: 10,
	});

	const { questions = [] } = data || {};

	const {
		success: answerSuccess,
		data: answerData,
		message: answerMessage,
	} = await GetUserAnswersAction({
		userId: users?.data?.user?._id || "",
		page: 1,
		pageSize: 10,
	});

	const { answers = [] } = answerData || {};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<ProfileHeader user={user} />

				<StatsCard
					totalAnswers={totalAnswers}
					totalQuestions={totalQuestions}
				/>

				<div className="my-7 space-x-5">
					<Link
						href={`/profile/${decodedEmail}?tab=questions`}
						className={`border rounded-xl px-2 py-1 shadow-2xl text-sm font-medium dark:border-gray-700 dark:text-gray-300 ${activeTab === "questions" ? "text-white  bg-sky-600 dark:bg-[#0e2676]" : "bg-transparent"}`}
					>
						Top Questions
					</Link>
					<Link
						href={`/profile/${decodedEmail}?tab=answers`}
						className={`border rounded-xl px-2 py-1 shadow-2xl text-sm font-medium dark:border-gray-700  dark:text-gray-300 ${activeTab === "answers" ? "text-white  bg-sky-600 dark:bg-[#0e2676]" : "bg-transparent"}`}
					>
						Top Answers
					</Link>
				</div>

				{activeTab === "questions" ? (
					// user's questions
					<DataRenderer
						success={success}
						data={questions}
						errorMessage={message}
						render={(questions) =>
							questions.map((question, index) => (
								<ThreadCard question={question} key={index} />
							))
						}
					/>
				) : (
					// user's answers
					<DataRenderer
						success={answerSuccess}
						data={answers}
						errorMessage={answerMessage}
						render={(questions) =>
							questions.map((answer, index) => (
								<AnswerCard answer={answer} key={index} />
							))
						}
					/>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
