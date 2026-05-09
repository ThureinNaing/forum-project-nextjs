import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import { IUserDocument } from "@/models/user.model";
import { LinkIcon, Mail, MapPin, Trophy } from "lucide-react";
import Link from "next/link";

const ProfileHeader = ({ user }: { user: IUserDocument }) => {
	return (
		<Card className="mb-8">
			<CardContent className="pt-6">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Avatar Section */}
					<div className="flex flex-col items-center md:items-start">
						<Avatar className="w-32 h-32">
							<AvatarImage src={user.image} alt={user.name} />
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
	);
};

export default ProfileHeader;
