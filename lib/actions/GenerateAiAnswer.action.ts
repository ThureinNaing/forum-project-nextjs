import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import { GenerateAiAnswerSchema } from "../Schema/GenerateAiAnswerSchema";
import validateBody from "../validateBody";

export async function GenerateAiAnswer(params: {
	title: string;
	content: string;
	userAnswer: string;
}): Promise<{
	success: boolean;
	data?: {
		answer: string;
	};
	message?: string;
	details?: object | null;
}> {
	await dbConnect();

	try {
		const validatedData = validateBody(params, GenerateAiAnswerSchema);
		const { title, content, userAnswer } = validatedData.data;

		return { success: true, data: { answer: "this is an ai answer" } };
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
