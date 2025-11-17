import { z } from "zod";

const SignInSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Please provide a valid email address" })
		.toLowerCase(),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export default SignInSchema;
