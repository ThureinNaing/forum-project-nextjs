import * as z from "zod";

export const loginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 character",
	}),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: "Name is required" })
			.min(2, { message: "Name must be at least 2 characters" })
			.max(50, { message: "Name must be less than 50 characters" })
			.regex(/^[a-zA-Z\s]+$/, {
				message: "Name can only contain letters and spaces",
			}),

		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(30, { message: "Username must be less than 30 characters" })
			.regex(/^[a-zA-Z0-9_]+$/, {
				message:
					"Username can only contain letters, numbers, and underscores",
			})
			.toLowerCase(),

		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email({ message: "Please provide a valid email address" })
			.toLowerCase(),

		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.max(128, { message: "Password must be less than 128 characters" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
				message:
					"Password must contain at least one lowercase letter, one uppercase letter, and one number",
			}),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.max(128, { message: "Password must be less than 128 characters" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
				message:
					"Password must contain at least one lowercase letter, one uppercase letter, and one number",
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"], // Highlight the field with the error
		message: "Passwords do not match",
	});

export const userProfileSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters" })
		.max(50, { message: "Name must be less than 50 characters" }),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(30, { message: "Username must be less than 30 characters" })
		.regex(/^[a-zA-Z0-9_]+$/, {
			message:
				"Username can only contain letters, numbers, and underscores",
		}),
	email: z
		.string()
		.email({ message: "Please provide a valid email address" }),
	image: z.string().optional(),
	bio: z
		.string()
		.max(160, { message: "Bio must be 160 characters or less" })
		.optional(),
	location: z
		.string()
		.max(50, { message: "Location must be 50 characters or less" })
		.optional(),
	portfolio: z
		.string()
		.max(200, { message: "Portfolio URL must be 200 characters or less" })
		.optional(),
});
