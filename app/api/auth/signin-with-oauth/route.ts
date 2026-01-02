import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import slugify from "slugify";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import SigninWithOAuthSchema from "@/lib/Schema/SigninWithOAuthSchema";
import validateBody from "@/lib/validateBody";
import Account from "@/models/account.model";
import User from "@/models/user.model";

export async function POST(request: Request) {
	const { provider, providerAccountId, user } = await request.json();
	await dbConnect();
	const session = await mongoose.startSession();
	session.startTransaction(); // if one query fails, rollback to previous state
	try {
		const validatedData = validateBody(
			{ provider, providerAccountId, user },
			SigninWithOAuthSchema //rules for validation
		);

		const { email, name, username, image } = validatedData.data.user;

		let existingUser = await User.findOne({ email }).session(session);

		if (!existingUser) {
			[existingUser] = await User.create(
				[
					{
						// _id: new mongoose.Types.ObjectId().toString(),
						email,
						name,
						username: slugify(username, {
							lower: true,
							strict: true,
							trim: true,
						}),
						image,
					},
				],
				{ session }
			);
		} else {
			await User.updateOne(
				{ _id: existingUser._id },
				{
					//if login with different provider, update user's name and image from OAuth
					$set: {
						name,
						image,
					},
				}
			).session(session);
		}
		const account = await Account.findOne({
			userId: existingUser._id,
			provider,
			providerAccountId,
		}).session(session);

		if (!account) {
			await Account.create(
				[
					{
						userId: existingUser._id,
						provider,
						providerAccountId,
						name,
						image,
					},
				],
				{ session }
			);
		}

		await session.commitTransaction(); // commit the transaction if all queries are successful

		return handleSuccessResponse({ existingUser });
	} catch (error: unknown) {
		if (session.inTransaction()) {
			await session.abortTransaction(); // rollback to previous state on error
		}

		return handleErrorResponse(error);
	} finally {
		session.endSession();
	}
}
