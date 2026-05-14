import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { api } from "./lib/api";
import validateBody from "./lib/validateBody";
import SignInSchema from "./lib/Schema/SignInSchema";
import bcrypt from "bcryptjs";
import { GetAccountByProviderAction } from "./lib/actions/GetAccountByProvider.action";

export const { handlers, auth, signIn, signOut } = NextAuth({
	trustHost: true,
	providers: [
		GitHub,
		Google,
		Credentials({
			authorize: async (credentials) => {
				const validationFields = validateBody(
					credentials,
					SignInSchema,
				);

				if (validationFields.success) {
					const { email, password } = validationFields.data;

					const { data: existingAccount } =
						await api.accounts?.getByProvider(email);
					// const existingAccount =
					// 	await GetAccountByProviderAction(email);

					if (!existingAccount) return null;

					const { data: existingUser } = await api.users.getById(
						existingAccount.userId.toString(),
					);

					if (!existingUser) return null;

					const isValidPassowrd = await bcrypt.compare(
						password,
						existingAccount.password,
					);

					if (isValidPassowrd) {
						return {
							id: existingUser._id,
							name: existingUser.name,
							username: existingUser.username,
							email: existingUser.email,
							image: existingUser.image,
						};
					}
				}

				return null;
			},
		}),
	],
	callbacks: {
		//save the user in the mongoDB database
		async signIn({ user, account, profile }) {
			if (account?.type === "credentials") return true;
			if (!account || !user) return false;
			const { success } = await api.auth.oauthSignIn({
				user: {
					email: user.email || "",
					name: user.name || "",
					image: user?.image || "",
					username:
						account.provider === "github"
							? (profile?.login as string)
							: (user?.name?.toLocaleLowerCase() as string),
				},
				provider: account.provider,
				providerAccountId: account.providerAccountId,
			});
			return success;
		},
		//add user id to the JWT token
		async jwt({ token, account, user }) {
			if (user) {
				//this means it's the first time the user is signing in, so we need to add the user id to the token
				token.sub = user.id;
			}
			if (account) {
				const { success, data: accountData } =
					await api.accounts?.getByProvider(
						account?.providerAccountId,
					);
				if (!success || !accountData) return token;
				const userId = accountData.userId;

				if (userId) token.sub = userId;
			}
			return token;
		},
		//add user id to the session
		async session({ session, token }) {
			session.user.id = token.sub as string;
			return session;
		},
	},
});
