"use client";

import ToggleBookmarkAction from "@/lib/actions/ToogleBookmark.action";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ToogleBookmark = ({
	questionId,
	saved,
}: {
	questionId: string;
	saved: boolean;
}) => {
	const [isBookmarked, setIsBookmarked] = useState(saved);

	const handleBookmark = async () => {
		try {
			const { success, data } = await ToggleBookmarkAction({
				questionId,
			});
			if (success && data) {
				setIsBookmarked(data.saved);

				toast.success(
					data.saved
						? "Question bookmarked successfully"
						: "Bookmark removed successfully",
				);
			}
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
