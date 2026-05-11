import z from "zod";
import { de } from "zod/v4/locales";

const DeleteQuestionSchema = z.object({
	questionId: z.string(),
});

export default DeleteQuestionSchema;
