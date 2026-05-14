"use client";
import React, { useState, useTransition } from "react";
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

import { z } from "zod";
import { registerSchema } from "@/schema";
import Link from "next/link";

import ROUTES from "@/routes";
import AuthForm from "@/app/(auth)/components/authForm";
import { signUpWithCredentials } from "@/lib/actions/SignUpWithCredetntials.actions";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const RegisterForm = () => {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	//Define form.
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		startTransition(async () => {
			const res = await signUpWithCredentials(values);

			if (res.success) {
				router.push(ROUTES.HOME);
			} else {
				if ("message" in res && res.message) {
					setError(res.message);
				}
			}
		});
	}
	return (
		<div className="h-full flex min-h-screen items-center justify-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 items-center-safe justify-center-safe border-2 p-5 "
				>
					<h1 className="text-3xl font-semibold">
						Register to Forum
					</h1>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your name"
										{...field}
									/>
								</FormControl>

								<FormMessage className="text-red-500" />
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
										placeholder="Enter username"
										{...field}
									/>
								</FormControl>

								{error &&
									error === "Username already exists!" && (
										<FormMessage className="text-red-500">
											{error}
										</FormMessage>
									)}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email"
										{...field}
									/>
								</FormControl>

								{error && error === "Email already exists!" && (
									<FormMessage className="text-red-500">
										{error}
									</FormMessage>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter password"
										{...field}
									/>
								</FormControl>

								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your confirm password"
										{...field}
									/>
								</FormControl>

								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full cursor-pointer">
						{isPending ? (
							<FaSpinner className="h-5 w-5 animate-spin" />
						) : (
							<span>Register</span>
						)}
					</Button>
					<AuthForm />
					<div className="flex items-center justify-start gap-2 ">
						<span>Do you have an account?</span>
						<Link href={ROUTES.LOGIN} className="underline">
							Sign in here
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RegisterForm;
