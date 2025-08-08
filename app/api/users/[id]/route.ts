import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import User from "@/models/user.model";
import { Types } from "mongoose";
import validateBody from "@/lib/validateBody";
import { UserSchema } from "@/lib/Schema/UserSchema";

//get user by id
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid User ID");

		const user = await User.findById(id);

		if (!user) throw new Error("User not found");

		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}

//delete user by id
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid User ID");

		const user = await User.findByIdAndDelete(id);

		if (!user) throw new Error("User not found");

		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const body = await request.json();

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid User ID");

		const validatedData = validateBody(body, UserSchema, true);
		const user = await User.findByIdAndUpdate(id, validatedData.data, {
			new: true,
		});

		if (!user) throw new Error("User not found");

		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
