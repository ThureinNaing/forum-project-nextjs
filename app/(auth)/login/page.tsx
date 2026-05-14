"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { loginSchema } from "@/schema";
import Link from "next/link";
import AuthForm from "../components/authForm";
import ROUTES from "@/routes";
import { signInWithCredentials } from "@/lib/actions/SignInWithCredentials.actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const { data: session, status } = useSession();
	const [isPending, startTransition] = useTransition();

	// 1. Define your form.
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (status === "authenticated") {
			router.replace(ROUTES.HOME);
		}
	}, [status, router]);

	if (status === "loading") {
		return null;
	}

	if (session) {
		return null;
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		startTransition(async () => {
			const res = await signInWithCredentials(values);

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
		<div className="p-10  min-h-screen flex flex-col items-center justify-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 items-center-safe justify-center-safe border-2 p-5 "
				>
					<h1 className="text-3xl font-semibold">Sign in to Forum</h1>
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

								<FormMessage className="text-red-500" />
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
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>

								<FormMessage className="text-red-500" />
								{error && (
									<p className="text-sm text-red-500">
										{error}
									</p>
								)}
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full cursor-pointer"
						disabled={isPending}
					>
						{isPending ? (
							<FaSpinner className="h-5 w-5 animate-spin" />
						) : (
							<span>Login</span>
						)}
					</Button>
					<AuthForm />
					<div className="flex items-center justify-start gap-2 text-sm">
						<span>Don&apos;t have an account?</span>
						<Link href={ROUTES.REGISTRATION} className="underline">
							Register here
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Login;
