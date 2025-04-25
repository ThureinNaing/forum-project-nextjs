import { Types } from "mongoose";
import { z } from "zod";

export const UserSchema = z.object({
	name: z.string(),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" }),
	email: z.string().email(),
	image: z.string().url(),
});

export const AccountSchema = z.object({
	userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
		message: "Invalid ObjectId",
	}),
	name: z.string().min(3, { message: "Name must be at least 3 characters" }),
	image: z.string().url({ message: "Please provide a valid URL" }).optional(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.optional(),
	provider: z.string().min(1, { message: "Provider is required" }),
	providerAccountId: z
		.string()
		.min(1, { message: "Provider Account Id is required" }),
});
