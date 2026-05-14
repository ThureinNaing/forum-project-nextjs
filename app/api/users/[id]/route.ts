import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import User from "@/models/user.model";
import { Types } from "mongoose";
import validateBody from "@/lib/validateBody";
import { UserSchema } from "@/lib/Schema/UserSchema";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";

//get user by id
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		await dbConnect();
		const { id } = await params;

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid User ID");

		const user = await User.findById(id).select("-password");

		if (!user) throw new Error("User not found");

		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}

//delete user by id
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid User ID");
		const auth_session = await auth();
		const userId = auth_session?.user?.id;
		if (!auth_session || !auth_session.user) {
			throw new Error("Unauthorized: Please login first");
		}
		if (userId !== id) {
			throw new Error("Forbidden: You can only delete your own account");
		}

		const user = await User.findByIdAndDelete(id);

		if (!user) throw new Error("User not found");

		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const body = await request.json();

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid User ID");

		const auth_session = await auth();
		const userId = auth_session?.user?.id;
		if (!auth_session || !auth_session.user) {
			throw new Error("Unauthorized: Please login first");
		}
		if (userId !== id) {
			throw new Error("Forbidden: You can only delete your own account");
		}

		const validatedData = validateBody(body, UserSchema, true);
		const user = await User.findByIdAndUpdate(id, validatedData.data, {
			new: true,
		}).select("-password");

		if (!user) throw new Error("User not found");

		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
