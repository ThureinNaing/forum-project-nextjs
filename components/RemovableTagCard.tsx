import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const RemovableTagCard = ({
	children,
	onRemove,
}: {
	children: React.ReactNode;
	onRemove: React.ReactEventHandler;
}) => {
	return (
		<Button
			type="button"
			onClick={onRemove}
			className="flex items-center space-x-1 cursor-pointer bg-gray-200 dark:bg-[#081338] hover:bg-gray-300 dark:hover:bg-[#0b1a4a] transition"
		>
			<span className="text-black dark:text-white font-semibold">
				{children}
			</span>
			<span>
				<Trash2 className="text-red-500" size={15} />
			</span>
		</Button>
	);
};

export default RemovableTagCard;
