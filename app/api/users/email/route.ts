import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import User from "@/models/user.model";

export async function POST(request: Request) {
	try {
		const { email } = await request.json();
		const user = await User.findOne({ email });
		if (!user) throw new Error("User not found");
		return handleSuccessResponse(user);
	} catch (err) {
		return handleErrorResponse(err);
	}
}
