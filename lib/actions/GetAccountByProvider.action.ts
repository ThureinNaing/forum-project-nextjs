"use server";

import dbConnect from "../dbConnect";
import Account from "@/models/account.model";

export async function GetAccountByProviderAction(providerAccountId: string) {
	await dbConnect();
	const account = await Account.findOne({ providerAccountId });
	return account ? JSON.parse(JSON.stringify(account)) : null;
}
