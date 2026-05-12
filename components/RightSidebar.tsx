import { CircleHelp } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { RiMvAiFill, RiNextjsFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import { FaVuejs } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import GetPopularQuestions from "@/lib/actions/GetPopularQuestions.action";
import GetPopularTags from "@/lib/actions/GetPopularTags.action";
import DataRenderer from "./DataRenderer";
import Link from "next/link";
import ROUTES from "@/routes";
import Image from "next/image";

const RightSidebar = async () => {
	const {
		success: questionSuccess,
		data: questionsData,
		message: questionMessage,
	} = await GetPopularQuestions();

	const { questions = [] } = questionsData || {};
	const {
		success: tagSuccess,
		data: tagsData,
		message: tagMessage,
	} = await GetPopularTags();
	let { tags = [] } = tagsData || {};
	return (
		<div className="space-y-5">
			<div className="space-y-5">
				<h1 className="text-xl font-bold">Popular Questions</h1>
				<div className=" flex items-center space-x-2 ">
					<DataRenderer
						success={questionSuccess}
						data={questions}
						errorMessage={questionMessage}
						render={(questions) =>
							questions.map((question) => (
								<Link
									key={question._id}
									href={ROUTES.QUESTION_DETAILS(question._id)}
									className="my-3 flex items-center space-x-2"
								>
									<span>
										<CircleHelp
											size={26}
											fill="#0061ff"
											className="text-white dark:text-black"
										/>
									</span>
									<span className="line-clamp-2 text-sm">
										{question.title}
									</span>
								</Link>
							))
						}
					/>
				</div>
			</div>
			<div className="space-y-5">
				<h1 className="text-xl font-bold">Popular Tags</h1>
				<DataRenderer
					success={tagSuccess}
					data={tags}
					errorMessage={tagMessage}
					render={(tags) =>
						tags.map((tag) => (
							<Link
								href={ROUTES.TAG_DETAILS(tag._id)}
								className="mt-7 space-y-5 pl-3"
								key={tag._id}
							>
								<div className="flex items-center space-x-2">
									<span
										className="text-xl"
										style={{ color: "#61DAFB" }}
									>
										<Image
											alt="logo"
											width={30}
											height={30}
											src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tag.name.toLocaleLowerCase()}/${tag.name.toLocaleLowerCase()}-original.svg`}
										></Image>
									</span>
									<span className="line-clamp-2 text-[16px]">
										{tag.name}
									</span>
								</div>
							</Link>
						))
					}
				/>
			</div>
		</div>
	);
};

export default RightSidebar;
