import Link from "next/link";
import { Button } from "./ui/button";
import { ReactNode } from "react";

const TagCard = ({ children, href }: { children: ReactNode; href: string }) => {
	return (
		<Button variant={"outline"}>
			<Link href={href}>{children}</Link>
		</Button>
	);
};

export default TagCard;
