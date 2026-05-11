import React from "react";
import { ModeToggle } from "@/components/dark-light";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import ROUTES from "@/routes";
import SearchInput from "./SearchInput";
// import { SignOut } from "./signout-btn";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import Image from "next/image";

const Navbar = async () => {
	const session = await auth();
	const user = session?.user;

	// const upvotes = (answer as any)?.upvotes ?? 0;
	// const downvotes = (answer as any)?.downvotes ?? 0;

	const initial = user?.name?.charAt(0)?.toUpperCase?.();
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
				{user && (
					<Link href={ROUTES.PROFILE(user.email)}>
						{user?.image ? (
							<Image
								src={user.image}
								alt={user.name || "User Avatar"}
								className="rounded-full"
								width={36}
								height={36}
							/>
						) : (
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
								{initial}
							</div>
						)}
					</Link>
				)}

				{!user && (
					<Link
						href={ROUTES.LOGIN}
						className="text-sm font-semibold text-blue-500"
					>
						Login
					</Link>
				)}

				{/* {<SignOut />} */}
				{user && (
					<form
						action={async () => {
							"use server";
							await signOut({ redirect: false });
							return redirect(ROUTES.LOGIN);
						}}
					>
						<Button
							variant={"destructive"}
							type="submit"
							className="text-white cursor-pointer"
						>
							<LogOut />
							<span className="hidden md:block lg:block">
								Logout
							</span>
						</Button>
					</form>
				)}

				<ModeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
