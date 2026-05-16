import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export function DialogBox({
	triggerLabel,
	title,
	description,
	children,
}: {
	triggerLabel: string;
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline">{triggerLabel}</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					{children}
					{/* <DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter> */}
				</DialogContent>
			</form>
		</Dialog>
	);
}
