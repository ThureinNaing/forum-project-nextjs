import { z } from "zod";

const SigninWithOAuthSchema = z.object({
	provider: z.enum(["google", "github"]),
	providerAccountId: z
		.string()
		.min(1, { message: "Provider Account ID is required" }),
	user: z.object({
		email: z.string().email({ message: "Please provide a valid email" }),
		name: z.string().min(1, { message: "Name is required." }),
		username: z.string().min(3, {
			message: "Username must be at least 3 characters",
		}),
		image: z
			.string()
			.url({ message: "Please provide a valid image URL" })
			.optional(),
	}),
});
export default SigninWithOAuthSchema;
