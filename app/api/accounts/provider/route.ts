import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import Account from "@/models/account.model";

// /api/accounts/provider
// This endpoint retrieves an account by its providerAccountId
export async function POST(request: Request) {
	try {
		const { providerAccountId } = await request.json();
		const account = await Account.findOne({ providerAccountId });
		if (!account) throw new Error("Account not found");
		return handleSuccessResponse(account);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
