import fetchHandler from "./fetchHandler";

const API_URL = "http://localhost:3000/api";

export const api = {
	users: {
		//get all users
		getAll: () => fetchHandler(API_URL + "/users"),
		//create a new user
		create: (data: {
			name: string;
			email: string;
			username: string;
			image: string;
		}) =>
			fetchHandler(API_URL + "/users", {
				method: "POST",
				body: JSON.stringify(data),
			}),
		//get user by id
		getById: (id: string) => fetchHandler(API_URL + `/users/${id}`),
		//get user by email
		getByEmail: (email: string) =>
			fetchHandler(API_URL + `/users/email`, {
				method: "POST",
				body: JSON.stringify({ email }),
			}),
		//update user by id
		update: (
			id: string,
			data: {
				name?: string;
				email?: string;
				username?: string;
				image?: string;
			}
		) =>
			fetchHandler(API_URL + `/users/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			}),
		//delete user by id
		delete: (id: string) =>
			fetchHandler(API_URL + `/users/${id}`, {
				method: "DELETE",
			}),
	},
	accounts: {
		//get all accounts
		getAll: () => fetchHandler(API_URL + "/accounts"),
		//create a new account
		create: (data: {
			userId: string;
			name: string;
			image?: string;
			password: string;
			provider: string;
			providerAccountId: string;
		}) =>
			fetchHandler(API_URL + "/accounts", {
				method: "POST",
				body: JSON.stringify(data),
			}),
		//get account by provider
		getByProvider: (provider: string) =>
			fetchHandler(API_URL + `/accounts/provider`, {
				method: "POST",
				body: JSON.stringify({ provider }),
			}),
		//update account by id
		update: (
			id: string,
			data: {
				userId?: string;
				name?: string;
				image?: string;
				password?: string;
				provider?: string;
				providerAccountId?: string;
			}
		) =>
			fetchHandler(API_URL + `/accounts/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			}),
		//delete account by id
		delete: (id: string) =>
			fetchHandler(API_URL + `/accounts/${id}`, {
				method: "DELETE",
			}),
	},
	auth: {
		oauthSignIn: ({
			provider,
			providerAccountId,
			user,
		}: {
			provider: string;
			providerAccountId: string;
			user: {
				email: string;
				name: string;
				username: string;
				image: string;
			};
		}) =>
			fetchHandler(API_URL + "/auth/signin-with-oauth", {
				method: "POST",
				body: JSON.stringify({ provider, providerAccountId, user }),
			}),
	},
};
