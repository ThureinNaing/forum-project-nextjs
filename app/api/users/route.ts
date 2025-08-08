import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import { UserSchema } from "@/lib/Schema/UserSchema";

import validateBody from "@/lib/validateBody";
import User from "@/models/user.model";

export async function GET() {
	try {
		await dbConnect();
		const users = await User.find();
		return handleSuccessResponse(users);
	} catch (err: unknown) {
		return handleErrorResponse(err);
	}
}
export async function POST(request: Request) {
	try {
		await dbConnect();
		const body = await request.json();

		//validation
		validateBody(body, UserSchema);

		const existingEmail = await User.findOne({
			email: body.email,
		});
		if (existingEmail) throw new Error("Email already exists");

		const existingUsername = await User.findOne({
			username: body.username,
		});
		if (existingUsername) throw new Error("Username already exists");

		const newUser = await User.create(body);
		return handleSuccessResponse(newUser, 201);
	} catch (err: unknown) {
		return handleErrorResponse(err);
	}
}
