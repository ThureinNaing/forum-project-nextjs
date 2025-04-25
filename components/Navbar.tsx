import React from "react";
import { ModeToggle } from "@/components/dark-light";

// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import ROUTES from "@/routes";
import SearchInput from "./SearchInput";

const Navbar = async () => {
	return (
		<nav className="flex justify-between items-center mx-3 md:mx-0 md:px-5  py-4">
			<div className="font-bold flex items-center justify-center cursor-pointer">
				<div className="flex  justify-between items-center gap-2 md:gap-5">
					<SidebarTrigger className="cursor-pointer" />
					<div>
						<SearchInput />
					</div>
				</div>
			</div>

			<div className="flex justify-between items-center gap-2 md:gap-5">
				{/* <Avatar>
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="@shadcn"
						width={38}
						height={38}
						className="rounded-full"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar> */}
				<Link href={ROUTES.LOGIN} className="text-sm text-blue-500">
					Login
				</Link>
				<ModeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
