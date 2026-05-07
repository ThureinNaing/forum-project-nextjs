export interface QuestionTag {
	_id: string;
	name: string;
	questions?: number;
}

export interface QuestionAuthorPreview {
	_id: string;
	name: string;
	image?: string | null;
}

export interface QuestionDetails {
	_id: string;
	title: string;
	content: string;
	tags: QuestionTag[];
	views: number;
	upvotes: number;
	downvotes: number;
	answers: number;
	author: string;
	saved: boolean;
}

export interface QuestionCard {
	_id: string;
	title: string;
	tags: QuestionTag[];
	views: number;
	upvotes: number;
	downvotes: number;
	answers: number;
	author: QuestionAuthorPreview;
	createdAt?: string;
}

export interface QuestionWriteResult {
	_id: string;
}
