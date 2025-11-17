"use server";

import User from "@/models/user.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import { handleActionErrorResponse } from "../response";
import { signIn } from "@/auth";
import SignInSchema from "../Schema/SignInSchema";
import Account from "@/models/account.model";
import bcrypt from "bcryptjs";

export async function signInWithCredentials(params: {
	email: string;
	password: string;
}) {
	await dbConnect();

	try {
		const validatedData = validateBody(params, SignInSchema);
		const { email, password } = validatedData.data;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new Error("User not found!");
		}

		const existingAccount = await Account.findOne({
			provider: "credentials",
			providerAccountId: email,
		});
		if (!existingAccount) {
			throw new Error("Account not found!");
		}

		const passwordMatch = await bcrypt.compare(
			password,
			existingAccount.password
		);
		if (!passwordMatch) {
			throw new Error("Invalid credentials!");
		}

		await signIn("credentials", { email, password, redirect: false });

		return { success: true };
	} catch (error) {
		// await session.abortTransaction;
		return handleActionErrorResponse(error);
	}
}
