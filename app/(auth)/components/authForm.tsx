"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import githubLogo from "@/public/github_logo.webp";
import googleLogo from "@/public/google1.png";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import ROUTES from "@/routes";
import { useTransition } from "react";

const AuthForm = () => {
	const [isPending, startTransition] = useTransition();
	const oAuthLogin = async (type: "github" | "google") => {
		startTransition(async () => {
			try {
				await signIn(type, {
					redirectTo: ROUTES.HOME,
				});
			} catch (err) {
				if (err instanceof Error) {
					toast.error(err.message);
				}
			}
		});
	};
	return (
		<div className="flex flex-col md:flex-row items-center justify-between gap-1">
			<Button
				disabled={isPending}
				onClick={() => oAuthLogin("google")}
				type="button"
				variant="outline"
				className="flex items-center justify-evenly cursor-pointer w-full md:w-auto "
			>
				<Image src={googleLogo} alt="google" width={28} height={28} />
				<span>Login with Google</span>
			</Button>
			<span>or</span>
			<Button
				disabled={isPending}
				onClick={() => oAuthLogin("github")}
				type="button"
				variant="outline"
				className="flex items-center justify-evenly w-full md:w-auto cursor-pointer "
			>
				<Image src={githubLogo} alt="google" width={30} height={30} />

				<span> Login with Github</span>
			</Button>
		</div>
	);
};

export default AuthForm;
