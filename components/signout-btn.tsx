"use client";

import { Button } from "./ui/button";
import ROUTES from "@/routes";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
	return (
		<Button
			variant={"destructive"}
			type="button"
			className="text-white cursor-pointer"
			onClick={async () => {
				await signOut({ redirectTo: ROUTES.LOGIN });
			}}
		>
			<LogOut />
			<span className="hidden md:block lg:block">Logout</span>
		</Button>
	);
};

export default SignOutButton;
