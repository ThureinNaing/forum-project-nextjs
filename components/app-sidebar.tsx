"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Command,
	GalleryVerticalEnd,
	HomeIcon,
	MessageCircleCodeIcon,
	NewspaperIcon,
	TagIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import ROUTES from "@/routes";
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
	user: {
		name: "Tom Cook",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Forum",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
};

const navLinks = [
	{ name: "Home", url: ROUTES.HOME, icon: HomeIcon },
	{ name: "Tags", url: "#", icon: TagIcon },
	{
		name: "Popular Questions",
		url: ROUTES.QUESTIONS,
		icon: FaQuestionCircle,
	},
	{
		name: "Ask a new question",
		url: ROUTES.QUESTION_CREATE,
		icon: MessageCircleCodeIcon,
	},
	{ name: "Newest", url: "#", icon: NewspaperIcon },
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
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
