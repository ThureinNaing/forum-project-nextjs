import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			

			<div className="flex flex-col md:flex-row">
				<div className="md:w-3/4 ">{children}</div>
				<div className="w-1/4 p-5">
					<RightSidebar />
				</div>
			</div>
		</>
	);
};

export default layout;
