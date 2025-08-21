"use server";

import User from "@/models/user.model";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import validateBody from "../validateBody";
import SignUpSchema from "../Schema/SignupSchema";
import bcrypt from "bcryptjs";
import Account from "@/models/account.model";
import { handleActionErrorResponse } from "../response";
import { signIn } from "@/auth";

export async function signUpWithCredentials(params: {
	name: string;
	username: string;
	email: string;
	password: string;
}) {
	await dbConnect();
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const validatedData = validateBody(params, SignUpSchema);
		const { name, username, email, password } = validatedData.data;

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			throw new Error("Email already exists!");
		}
		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			throw new Error("Username already exists!");
		}

		const [newUser] = await User.create([{ name, username, email }], {
			session,
		});

		const hashedPassword = await bcrypt.hash(password, 10);

		await Account.create(
			[
				{
					userId: newUser._id,
					name,
					provider: "credentials",
					providerAccountId: email,
					password: hashedPassword,
				},
			],
			{ session }
		);
		await session.commitTransaction();
		await signIn("credentials", { email, password, redirect: false });

		return { success: true };
	} catch (error) {
		if (session.inTransaction()) {
			await session.abortTransaction();
		}
		// await session.abortTransaction;
		return handleActionErrorResponse(error);
	} finally {
		await session.endSession();
	}
}
