import fetchHandler from "./fetchHandler";

const API_URL = "http://localhost:3000/api";

export const api = {
	users: {
		//get all users
		getAll: async () => fetchHandler(API_URL + "/users"),
		//create a new user
		create: async (data: {
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
		getById: async (id: string) => fetchHandler(API_URL + `/users/${id}`),
		//get user by email
		getByEmail: async (email: string) =>
			fetchHandler(API_URL + `/users/email`, {
				method: "POST",
				body: JSON.stringify({ email }),
			}),
		//update user by id
		update: async (
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
		delete: async (id: string) =>
			fetchHandler(API_URL + `/users/${id}`, {
				method: "DELETE",
			}),
	},
	accounts: {
		//get all accounts
		getAll: async () => fetchHandler(API_URL + "/accounts"),
		//create a new account
		create: async (data: {
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
		getByProvider: async (provider: string) =>
			fetchHandler(API_URL + `/accounts/provider`, {
				method: "POST",
				body: JSON.stringify({ provider }),
			}),
		//update account by id
		update: async (
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
		delete: async (id: string) =>
			fetchHandler(API_URL + `/accounts/${id}`, {
				method: "DELETE",
			}),
	},
};
