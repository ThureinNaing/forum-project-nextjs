const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	REGISTRATION: "/register",
	QUESTIONS: "/questions",
	QUESTION_CREATE: "/questions/create",
	QUESTION_DETAILS: (id: string) => "/questions/" + id,
	TAGS: "/tags",
	COMMUNITY: "/community",
};
export default ROUTES;
