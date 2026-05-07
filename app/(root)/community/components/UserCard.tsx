import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({
	id,
	name,
	image,
}: {
	id: string;
	name: string;
	image: string;
}) => {
	return (
		<div>
			<Link
				href={`/users/${id}`}
				className="flex flex-col items-center justify-center bg-gray-200 dark:bg-[#081338] p-2 rounded-xl gap-y-3"
			>
				{image ? (
					<Image alt={name} width={100} height={100} src={image} />
				) : (
					<User size={100} />
				)}
				<p>{name} </p>
			</Link>
		</div>
	);
};

export default UserCard;
