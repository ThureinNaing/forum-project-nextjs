import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import Account from "@/models/account.model";
import { Types } from "mongoose";
import validateBody from "@/lib/validateBody";
import { AccountSchema } from "@/lib/Schema";

// Get account by id
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Account ID");

		const account = await Account.findById(id);

		if (!account) throw new Error("Account not found");

		return handleSuccessResponse(account);
	} catch (err) {
		return handleErrorResponse(err);
	}
}

// Delete account by id
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Account ID");

		const account = await Account.findByIdAndDelete(id);

		if (!account) throw new Error("Account not found");

		return handleSuccessResponse(account);
	} catch (err) {
		return handleErrorResponse(err);
	}
}

// Update account by id
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const body = await request.json();

		if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Account ID");

		const validatedData = validateBody(body, AccountSchema, true);
		const account = await Account.findByIdAndUpdate(
			id,
			validatedData.data,
			{
				new: true,
			}
		);

		if (!account) throw new Error("Account not found");

		return handleSuccessResponse(account);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
