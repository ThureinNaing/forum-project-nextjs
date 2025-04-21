"use client";
// bg-[#081338]
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import {
	CodeXml,
	ItalicIcon,
	Link2Icon,
	List,
	ListOrdered,
} from "lucide-react";
import { useCallback } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import "highlight.js/styles/github-dark-dimmed.css";
import { Label } from "@/components/ui/label";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Editor = ({
	label,
	value,
	onChange,
}: {
	value?: string;
	label?: string;
	onChange: (value: string) => void;
}) => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class: "prose prose-invert max-w-none my-2 p-2 rounded-lg min-h-[300px] border-2 bg-gray-200 dark:bg-[#081338] text-black dark:text-white ",
			},
		},
		extensions: [
			StarterKit,
			Bold,
			Italic,
			BulletList,
			ListItem,
			OrderedList,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			CodeBlockLowlight.configure({
				lowlight,
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
				protocols: ["http", "https"],
				isAllowedUri: (url: string, ctx) => {
					try {
						// construct URL
						const parsedUrl = url.includes(":")
							? new URL(url)
							: new URL(`${ctx.defaultProtocol}://${url}`);

						// use default validation
						if (!ctx.defaultValidate(parsedUrl.href)) {
							return false;
						}

						// disallowed protocols
						const disallowedProtocols = ["ftp", "file", "mailto"];
						const protocol = parsedUrl.protocol.replace(":", "");

						if (disallowedProtocols.includes(protocol)) {
							return false;
						}

						// only allow protocols specified in ctx.protocols
						const allowedProtocols = ctx.protocols.map((p) =>
							typeof p === "string" ? p : p.scheme
						);

						if (!allowedProtocols.includes(protocol)) {
							return false;
						}

						// disallowed domains
						const disallowedDomains = [
							"example-phishing.com",
							"malicious-site.net",
						];
						const domain = parsedUrl.hostname;

						if (disallowedDomains.includes(domain)) {
							return false;
						}

						// all checks have passed
						return true;
					} catch {
						return false;
					}
				},
				shouldAutoLink: (url: string) => {
					try {
						// construct URL
						const parsedUrl = url.includes(":")
							? new URL(url)
							: new URL(`https://${url}`);

						// only auto-link if the domain is not in the disallowed list
						const disallowedDomains = [
							"example-no-autolink.com",
							"another-no-autolink.com",
						];
						const domain = parsedUrl.hostname;

						return !disallowedDomains.includes(domain);
					} catch {
						return false;
					}
				},
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});
	const setLink = useCallback(() => {
		const previousUrl = editor?.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor?.chain().focus().extendMarkRange("link").unsetLink().run();

			return;
		}

		// update link
		try {
			editor
				?.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		} catch (e) {
			if (e instanceof Error) {
				alert(e.message);
			}
		}
	}, [editor]);
	return (
		<>
			<Label className="mb-0 font-semibold">{label}</Label>
			<div className="flex items-center gap-3 p-2 mt-3 rounded-lg bg-gray-200 dark:bg-[#081338]">
				<button
					onClick={() => editor?.chain().focus().toggleBold().run()}
					className={editor?.isActive("bold") ? "text-blue-600" : ""}
				>
					B
				</button>
				<button
					onClick={() => editor?.chain().focus().toggleItalic().run()}
					className={
						editor?.isActive("italic") ? "text-blue-600" : ""
					}
				>
					<ItalicIcon size={16} />
				</button>
				<button
					onClick={() =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 1 })
							.run()
					}
					className={
						editor?.isActive("heading", { level: 1 })
							? "text-blue-600"
							: ""
					}
				>
					H1
				</button>
				<button
					onClick={() =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 2 })
							.run()
					}
					className={
						editor?.isActive("heading", { level: 2 })
							? "text-blue-600"
							: ""
					}
				>
					H2
				</button>
				<button
					onClick={() =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 3 })
							.run()
					}
					className={
						editor?.isActive("heading", { level: 3 })
							? "text-blue-600"
							: ""
					}
				>
					H3
				</button>
				<button
					onClick={setLink}
					className={`${
						editor?.isActive("link") ? "text-blue-600" : ""
					} `}
				>
					<Link2Icon size={20} />
				</button>
				<button
					onClick={() =>
						editor?.chain().focus().toggleBulletList().run()
					}
					className={
						editor?.isActive("bulletList") ? "text-blue-600" : ""
					}
				>
					<List size={20} />
				</button>
				<button
					onClick={() =>
						editor?.chain().focus().toggleOrderedList().run()
					}
					className={
						editor?.isActive("orderedList") ? "text-blue-600" : ""
					}
				>
					<ListOrdered size={20} />
				</button>
				<button
					onClick={() =>
						editor?.chain().focus().toggleCodeBlock().run()
					}
					className={
						editor?.isActive("codeBlock") ? "text-blue-600" : ""
					}
				>
					<CodeXml size={20} />
				</button>
			</div>
			<EditorContent editor={editor} />
		</>
	);
};

export default Editor;
