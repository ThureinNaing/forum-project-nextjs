import { CircleHelp } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import { FaVuejs } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";

const RightSidebar = () => {
	return (
		<div className="space-y-5">
			<div className="space-y-5">
				<h1 className="text-xl font-bold">Popular Questions</h1>
				<div className=" flex items-center space-x-2 ">
					<span>
						<CircleHelp
							size={26}
							fill="#0061ff"
							className="text-white dark:text-black"
						/>
					</span>
					<p className="text-sm line-clamp-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Accusantium maxime odio veniam cumque. Quod velit
						veritatis ad voluptatum laborum blanditiis, unde vitae
						ducimus cupiditate officia, natus, nisi dolores quidem
						alias!
					</p>
				</div>
				<div className=" flex items-center space-x-2 ">
					<span>
						<CircleHelp
							size={26}
							fill="#0061ff"
							className="text-white dark:text-black"
						/>
					</span>
					<p className="text-sm line-clamp-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Accusantium maxime odio veniam cumque. Quod velit
						veritatis ad voluptatum laborum blanditiis, unde vitae
						ducimus cupiditate officia, natus, nisi dolores quidem
						alias!
					</p>
				</div>
			</div>
			<div className="space-y-5">
				<h1 className="text-xl font-bold">Popular Tags</h1>
				<div className=" flex items-center space-x-2 ">
					<span>
						<FaReact size={20} className="text-blue-500" />
					</span>
					<span>React</span>
				</div>
				<div className=" flex items-center space-x-2 ">
					<span>
						<RiNextjsFill size={20} className="dark:text-white" />
					</span>
					<span>Next.JS</span>
				</div>
				<div className=" flex items-center space-x-2 ">
					<span>
						<FaPython size={20} className="text-yellow-500" />
					</span>
					<span>Python</span>
				</div>
				<div className=" flex items-center space-x-2 ">
					<span>
						<FaNodeJs size={20} className="text-green-500" />
					</span>
					<span>Node.JS</span>
				</div>
				<div className=" flex items-center space-x-2 ">
					<span>
						<FaLaravel size={20} className="text-red-500" />
					</span>
					<span>Laravel</span>
				</div>
				<div className=" flex items-center space-x-2 ">
					<span>
						<FaVuejs size={20} className="text-green-500" />
					</span>
					<span>Vue</span>
				</div>
			</div>
		</div>
	);
};

export default RightSidebar;
