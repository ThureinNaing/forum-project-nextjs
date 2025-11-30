"use server";
import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import ROUTES from "@/routes";

export async function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirect: false });
				return redirect(ROUTES.LOGIN);
			}}
		>
			<Button variant={"destructive"} type="submit">
				Sign Out
			</Button>
		</form>
	);
}
