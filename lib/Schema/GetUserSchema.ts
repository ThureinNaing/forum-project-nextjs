import z from "zod";

const GetUserSchema = z.object({
	email: z.string().email(),
});

export default GetUserSchema;
