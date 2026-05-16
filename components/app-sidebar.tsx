"use client";

import * as React from "react";
import {
	BookmarkCheck,
	BookOpen,
	Globe,
	HomeIcon,
	MessageCircleCodeIcon,
	TagIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import ROUTES from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{ name: "Home", url: ROUTES.HOME, icon: HomeIcon },
	{ name: "Tags", url: ROUTES.TAGS, icon: TagIcon },
	// {
	// 	name: "Popular Questions",
	// 	url: ROUTES.QUESTIONS,
	// 	icon: FaQuestionCircle,
	// },
	{
		name: "Ask a new question",
		url: ROUTES.QUESTION_CREATE,
		icon: MessageCircleCodeIcon,
	},
	{
		name: "Bookmarks",
		url: ROUTES.BOOKMARKS,
		icon: BookmarkCheck,
	},
	{
		name: "Community",
		url: ROUTES.COMMUNITY,
		icon: Globe,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	return (
		<Sidebar
			collapsible="icon"
			{...props}
			className=" flex flex-col  items-center justify-between  h-full border-none hover:border-none focus:border-none focus:ring-0 "
		>
			<SidebarHeader className="mt-3">
				<BookOpen />
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu className="space-y-5 mt-3">
					{navLinks.map((navLink) => (
						<SidebarMenuItem
							key={navLink.name}
							className="rounded-xl bg-none ml-1"
						>
							<SidebarMenuButton
								asChild
								isActive={pathname === navLink.url}
								size={"lg"}
								className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
							>
								<Link href={navLink.url}>
									<navLink.icon />
									<span className="font-bold">
										{navLink.name}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
