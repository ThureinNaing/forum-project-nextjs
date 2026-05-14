import Link from "next/link";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileHeaderLoading from "@/components/loading/ProfileHeaderLoading";
import DataRenderer from "@/components/DataRenderer";
import ThreadCard from "@/components/ThreadCard";
import GetUserQuestionsAction from "@/lib/actions/GetUserQuestions.action";
import GetUserAnswersAction from "@/lib/actions/GetUserAnswers.action";
import GetUserAction from "@/lib/actions/GetUser.action";
import AnswerCard from "../../questions/components/AnswerCard";
import Pagination from "@/components/Pagination";
import { auth } from "@/auth";
import { Suspense } from "react";

const ProfilePage = async ({
	params,
	searchParams,
}: {
	params: Promise<{
		email: string;
	}>;
	searchParams: Promise<{
		// tab?: string;
		// page?: number;
		[key: string]: string;
	}>;
}) => {
	const user_session = await auth();
	const userMail = (await params).email;
	const decodedEmail = decodeURIComponent(userMail);
	const { data: profileData } = await GetUserAction({ email: decodedEmail });
	const profileUserId = profileData?.user?._id?.toString();
	const {
		page = 1,
		pageSize = 10,
		tab: activeTab = "questions",
	} = await searchParams;

	let success = true;
	let data: unknown[] = [];
	let message: string | undefined;
	let isNext: boolean | undefined = false;

	if (profileUserId && activeTab === "questions") {
		const {
			success: questinSuccess,
			data: questionsData,
			message: questionMsg,
		} = await GetUserQuestionsAction({
			userId: profileUserId,
			page: Number(page) || 1,
			pageSize: Number(pageSize) || 10,
		});

		success = questinSuccess;
		data = questionsData?.questions || [];
		message = questionMsg;
		isNext = questionsData?.isNext;
	} else if (profileUserId) {
		const {
			success: answerSuccess,
			data: answerData,
			message: answerMessage,
		} = await GetUserAnswersAction({
			userId: profileUserId,
			page: Number(page) || 1,
			pageSize: Number(pageSize) || 10,
		});

		success = answerSuccess;
		data = answerData?.answers || [];
		message = answerMessage;
		isNext = answerData?.isNext;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<Suspense fallback={<ProfileHeaderLoading />}>
					<ProfileHeader userEmail={decodedEmail} />
				</Suspense>

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
					<>
						{" "}
						<DataRenderer
							success={success}
							data={data}
							errorMessage={message}
							render={(questions) =>
								questions.map((question, index) => (
									<ThreadCard
										question={question}
										key={index}
										showActions={
											user_session?.user?.id ===
											question.author._id.toString()
										}
									/>
								))
							}
						/>
						<Pagination isNext={isNext} page={Number(page)} />
					</>
				) : (
					// user's answers
					<>
						{" "}
						<DataRenderer
							success={success}
							data={data}
							errorMessage={message}
							render={(questions) =>
								questions.map((answer, index) => (
									<AnswerCard
										answer={answer}
										key={index}
										showActions={
											user_session?.user?.id ===
											answer.author._id.toString()
										}
									/>
								))
							}
						/>
						<Pagination isNext={isNext} page={Number(page)} />
					</>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
