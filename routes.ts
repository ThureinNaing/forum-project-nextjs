const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	REGISTRATION: "/register",
	QUESTIONS: "/questions",
	QUESTION_CREATE: "/questions/create",
	Question_Details: (id: string) => "/questions/" + id,
};
export default ROUTES;
