import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import {
	ArrowLeft,
	LinkIcon,
	Mail,
	MapPin,
	Search,
	Trophy,
	UserX,
} from "lucide-react";
import Link from "next/link";
import GetUserAction from "@/lib/actions/GetUser.action";
import { Button } from "./ui/button";
import StatsCard from "./StatsCard";

const ProfileHeader = async ({ userEmail }: { userEmail: string }) => {
	const users = await GetUserAction({ email: userEmail });

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
										The user you&apos;re looking for
										doesn&apos;t exist or may have been
										removed.
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
	return (
		<>
			<Card className="mb-8">
				<CardContent className="pt-6">
					<div className="flex flex-col md:flex-row gap-6">
						{/* Avatar Section */}
						<div className="flex flex-col items-center md:items-start">
							<Avatar className="w-32 h-32">
								<AvatarImage src={user.image} alt={user.name} />
								<AvatarFallback className="text-2xl size-32">
									{user.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</div>

						{/* User Info Section */}
						<div className="flex-1 space-y-4">
							<div>
								<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
									{user.name}
								</h1>
								<p className="text-lg text-gray-600 dark:text-gray-400">
									@{user.username}
								</p>
							</div>

							{/* Reputation Badge */}
							{user.reputation !== undefined && (
								<div className="flex items-center gap-2">
									<Trophy className="w-5 h-5 text-yellow-500" />
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
										{user.reputation} reputation
									</span>
								</div>
							)}

							{/* Bio */}
							{user.bio && (
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									{user.bio}
								</p>
							)}

							{/* Contact Info */}
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
									<Mail className="w-4 h-4" />
									<span>{user.email}</span>
								</div>

								{user.location && (
									<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
										<MapPin className="w-4 h-4" />
										<span>{user.location}</span>
									</div>
								)}

								{user.portfolio && (
									<div className="flex items-center gap-2 text-sm">
										<LinkIcon className="w-4 h-4" />
										<Link
											href={user.portfolio}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
										>
											{user.portfolio}
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<StatsCard
				totalAnswers={totalAnswers}
				totalQuestions={totalQuestions}
			/>
		</>
	);
};

export default ProfileHeader;
