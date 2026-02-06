import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";
Code.theme = {
	light: "github-light",
	dark: "github-dark",
	lightSelector: "html.light",
};

const Preview = ({ content }: { content: string }) => {
	return (
		<div className="prose dark:prose-invert max-w-none dark:prose-headings:text-gray-200 dark:prose-p:text-gray-400 dark:prose-ul:text-gray-400 dark:prose-ol:text-gray-400">
			<MDXRemote
				source={content}
				components={{
					pre: (props) => {
						return <Code {...props} className="shadow-light-200" />;
					},
				}}
			></MDXRemote>
		</div>
	);
};

export default Preview;
