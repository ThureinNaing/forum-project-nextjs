import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import { AccountSchema } from "@/lib/Schema/AccountSchema";

import validateBody from "@/lib/validateBody";
import Account from "@/models/account.model";

export async function GET() {
	try {
		await dbConnect();
		const accounts = await Account.find();
		return handleSuccessResponse(accounts);
	} catch (err: unknown) {
		return handleErrorResponse(err);
	}
}
export async function POST(request: Request) {
	try {
		await dbConnect();
		const body = await request.json();

		const { providerAccount, providerAccountId } = body;

		//validation
		validateBody(body, AccountSchema);

		const existingAccount = await Account.findOne({
			providerAccount,
			providerAccountId,
		});
		if (existingAccount) throw new Error("Account already exists");

		const newAccount = await Account.create(body);
		return handleSuccessResponse(newAccount, 201);
	} catch (err: unknown) {
		return handleErrorResponse(err);
	}
}
