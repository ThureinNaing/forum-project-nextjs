import Image from "next/image";
import Link from "next/link";

const TagInfoCard = ({
	name,
	count,
	id,
}: {
	name: string;
	count: number;
	id: string;
}) => {
	return (
		<div>
			<Link
				href={`/tags/${id}`}
				className="flex flex-col items-center justify-center bg-gray-200 dark:bg-[#081338] p-2 rounded-xl"
			>
				<Image
					alt={name}
					width={100}
					height={100}
					src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`}
				/>
				<p>
					{name} - ({count})
				</p>
			</Link>
		</div>
	);
};

export default TagInfoCard;
