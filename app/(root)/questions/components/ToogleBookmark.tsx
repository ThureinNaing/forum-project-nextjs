"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ToogleBookmark = () => {
	const [isBookmarked, setIsBookmarked] = useState(false);

	const handleBookmark = () => {
		try {
		} catch (error) {
			if (error instanceof Error) {
				toast.error(
					error?.message ||
						"An error occurred while toggling bookmark",
				);
			}
		}
	};
	return (
		<button onClick={handleBookmark}>
			<Bookmark fill={`${isBookmarked ? "blue" : ""}`} />
		</button>
	);
};

export default ToogleBookmark;
