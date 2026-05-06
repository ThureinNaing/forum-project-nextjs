import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimeStamp = (date?: Date | string | number): string => {
	if (!date) return "";

	return formatDistanceToNow(new Date(date), { addSuffix: true });
};
