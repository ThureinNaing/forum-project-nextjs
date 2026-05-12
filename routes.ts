const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	REGISTRATION: "/register",
	QUESTIONS: "/questions",
	QUESTION_CREATE: "/questions/create",
	QUESTION_DETAILS: (id: string) => "/questions/" + id,
	TAGS: "/tags",
	TAG_DETAILS: (id: string) => "/tags/" + id,
	COMMUNITY: "/community",
	BOOKMARKS: "/bookmarks",
	PROFILE: (email: string | undefined | null) => "/profile/" + email,
};
export default ROUTES;
