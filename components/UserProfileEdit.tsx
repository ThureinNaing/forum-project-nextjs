"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { userProfileSchema } from "@/schema";
import { z } from "zod";
import { IUserDocument } from "@/models/user.model";

export type UserProfileEditFormValues = z.infer<typeof userProfileSchema>;

type UserProfileEditProps = {
	user?: IUserDocument;
	onSuccess?: (user: unknown) => void;
};

const UserProfileEdit = ({ user, onSuccess }: UserProfileEditProps) => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<UserProfileEditFormValues>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: {
			name: user?.name ?? "haha",
			username: user?.username ?? "",
			email: user?.email ?? "",
			image: user?.image ?? "",
			bio: user?.bio ?? "",
			location: user?.location ?? "",
			portfolio: user?.portfolio ?? "",
		},
	});

	async function onSubmit(values: UserProfileEditFormValues) {
		setError(null);
		setSuccess(null);

		startTransition(async () => {
			const response = await api.users.update(user!.email, values);

			if (response?.success) {
				setSuccess("Profile updated successfully.");
				onSuccess?.(response.data);
				router.refresh();
				return;
			}

			setError(
				response?.message ??
					"Unable to update profile. Please try again.",
			);
		});
	}

	return (
		<div className="">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid gap-6 grid-cols-2 ">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Your full name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Your username"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>{" "}
					</div>
					{/* email */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="name@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Avatar URL</FormLabel>
								<FormControl>
									<Input
										placeholder="https://example.com/avatar.jpg"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="space-y-6">
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<textarea
											rows={4}
											className="min-h-27.5 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-ring/50"
											placeholder="A short bio to share with the community"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-6 grid-cols-2">
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												placeholder="City, country"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="portfolio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Portfolio</FormLabel>
										<FormControl>
											<Input
												placeholder="https://example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{error ? (
						<div className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
							{error}
						</div>
					) : null}

					{success ? (
						<div className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700">
							{success}
						</div>
					) : null}

					<Button type="submit" className="w-full">
						{isPending ? "Saving..." : "Save changes"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default UserProfileEdit;
