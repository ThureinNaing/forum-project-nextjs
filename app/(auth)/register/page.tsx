import { auth } from "@/auth";
import RegisterForm from "@/components/RegisterForm";
import ROUTES from "@/routes";
import { redirect } from "next/navigation";

const page = async () => {
	const session = await auth();
	if (session?.user) {
		redirect(ROUTES.HOME);
	}
	return (
		<div>
			<RegisterForm />
		</div>
	);
};

export default page;
