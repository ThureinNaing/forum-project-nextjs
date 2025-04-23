import { ZodError, ZodSchema } from "zod";

const validateBody = (body: unknown, schema: ZodSchema) => {
	const validatedData = schema.safeParse(body);
	if (!validatedData.success) {
		throw new ZodError(validatedData.error.issues);
	}
};

export default validateBody;
