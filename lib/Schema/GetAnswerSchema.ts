import z from "zod";

const GetAnswerSchema = z.object({
	page: z.number().positive(),
	pageSize: z.number().min(1).max(100).default(10),
	filter: z.string().optional(),
	questionId: z.string(),
});

export default GetAnswerSchema;
