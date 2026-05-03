import z from "zod";

export const GenerateAiAnswerSchema = z.object({
	title: z.string(),
	content: z.string(),
	userAnswer: z.string().optional(),
});
