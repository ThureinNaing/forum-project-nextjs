import { z } from "zod";

export const UserSchema = z.object({
	name: z.string(),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" }),
	email: z.string().email(),
	image: z.string().optional(),
	bio: z.string().optional(),
	location: z.string().optional(),
	portfolio: z.string().optional(),
});
