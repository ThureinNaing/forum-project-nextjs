import { z } from "zod";

const CreateQuestionSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Title must be at least 1 characters" })
		.max(200, { message: "Title must be less than 200 characters" }),

	content: z
		.string()

		.min(3, { message: "Content must be at least 3 characters" })
		.max(100000, { message: "Content is too long" }),

	tags: z
		.array(
			z
				.string()
				.min(1, { message: "Tag cannot be empty" })
				.max(50, { message: "Tag must be less than 50 characters" })
		)
		.min(1, { message: "At least one tag is required" }),
});

export default CreateQuestionSchema;
