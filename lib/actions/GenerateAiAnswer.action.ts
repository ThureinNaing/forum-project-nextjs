"use server";

import dbConnect from "../dbConnect";
import { handleActionErrorResponse } from "../response";
import { GenerateAiAnswerSchema } from "../Schema/GenerateAiAnswerSchema";
import validateBody from "../validateBody";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

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

		const { text } = await generateText({
			model: groq("qwen/qwen3-32b"),

			prompt: `Generate a clear and concise answer in markdown format to the question: "${title}".

      Use the following context and user's answer ONLY to improve accuracy.
      **Context:** ${content} 
      **User's Answer:** ${userAnswer}

      STRICT RULES:
      1. Correctness: If the user's answer is correct, refine and expand on it. If incorrect or incomplete, provide the proper correction.
      2. No Meta-Talk: Do NOT mention "the context", "the prompt", "the user's answer", or phrases like "based on provided info".
      3. Format: Final output must be Markdown only. Use appropriate language tags for code blocks (e.g., \`\`\`ts).
      4. NO REASONING: Do NOT output <think> tags. Do NOT output your internal chain-of-thought or reasoning process. 
      5. START DIRECTLY: Your response must start immediately with the answer content. No greetings, no preamble.

      Final output must be the answer only.`,
			system: "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
		});

		return { success: true, data: { answer: text } };
	} catch (error) {
		return handleActionErrorResponse(error);
	}
}
