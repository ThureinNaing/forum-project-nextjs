import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	MapPin,
	Link as LinkIcon,
	Mail,
	Trophy,
	UserX,
	ArrowLeft,
	Search,
} from "lucide-react";
import Link from "next/link";
import GetUserAction from "@/lib/actions/GetUser.action";

const ProfilePage = async ({
	params,
}: {
	params: Promise<{
		email: string;
	}>;
}) => {
	const userMail = (await params).email;
	const decodedEmail = decodeURIComponent(userMail);

	const userResult = await GetUserAction({ email: decodedEmail });
	console.log("User Result:", userResult); // Debug log

	if (!userResult.success || !userResult.data) {
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
										The user you're looking for doesn't
										exist or may have been removed.
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

	const { user, totalQuestions, totalAnswers } = userResult.data;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				{/* Profile Header Card */}
				<Card className="mb-8">
					<CardContent className="pt-6">
						<div className="flex flex-col md:flex-row gap-6">
							{/* Avatar Section */}
							<div className="flex flex-col items-center md:items-start">
								<Avatar className="w-32 h-32">
									<AvatarImage
										src={user.image}
										alt={user.name}
									/>
									<AvatarFallback className="text-2xl">
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
											<a
												href={user.portfolio}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
											>
												{user.portfolio}
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">
								Questions Asked
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-blue-600">
								{totalQuestions}
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								Total questions posted
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">
								Answers Given
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-green-600">
								{totalAnswers}
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								Total answers provided
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Activity Section Placeholder */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 dark:text-gray-400">
							Activity feed will be implemented here. This could
							include recent questions, answers, and interactions.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
