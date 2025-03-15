import Image from "next/image";
import { Container } from "../../../components/layout/container";
import { GoBackButton } from "../../../components/ui/goback.button";
import { ProjectService } from "../../../services/project.service";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { Route } from "next";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const url = new URL(`${process.env.PUBLIC_URL}/og`);
	const { slug } = await params;
	const project = await ProjectService.getProjectByFileName(`${slug}.md`);
	url.searchParams.set("title", project.meta.title);
	url.searchParams.set("description", project.meta.description);
	if (project.meta.bannerImage) {
		url.searchParams.set("bannerUrl", project.meta.bannerImage);
	}
	const images = [
		{
			url: url.toString(),
			width: 1200,
			height: 630,
		},
	];
	return {
		title: project.meta.title,
		description: project.meta.description,
		openGraph: {
			images,
		},
		twitter: {
			title: project.meta.title,
			card: "summary_large_image",
			creator: "@lukesthl",
			images,
			description: project.meta.description,
		},
	};
}
const mdxComponents: MDXRemoteProps["components"] = {
	a: ({ children, ...props }) => {
		const internal = props.href?.startsWith("#");
		return (
			<Link
				{...props}
				href={(props.href || "") as Route}
				{...(!internal && { target: "_blank", rel: "noopener noreferrer" })}
			>
				{children}
			</Link>
		);
	},
	img: ({ src, alt }) => {
		if (src?.endsWith(".mp4")) {
			return (
				<video src={src} controls className="rounded-2xl object-cover" controlsList="nodownload noremoteplayback" />
			);
		}
		let widthFromSrc, heightFromSrc;
		const url = new URL(src || "", process.env.PUBLIC_URL);
		const widthParam = url.searchParams.get("w") || url.searchParams.get("width");
		const heightParam = url.searchParams.get("h") || url.searchParams.get("height");
		if (widthParam) {
			widthFromSrc = parseInt(widthParam);
		}
		if (heightParam) {
			heightFromSrc = parseInt(heightParam);
		}

		const imageProps = {
			src: src || "",
			alt: alt || "default alt",
			height: heightFromSrc || 450,
			width: widthFromSrc || 550,
			className: "rounded-2xl object-cover",
		};
		// eslint-disable-next-line jsx-a11y/alt-text
		return <Image {...imageProps} />;
	},
};

export default async function Projects({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = await ProjectService.getProjectByFileName(`${slug}.md`);
	if (!project.content) {
		notFound();
	}
	return (
		<div key={project.slug} className="mt-16 md:mt-28">
			<Container className="dark:text-zinc-200">
				<div className="relative">
					<div className="left-0 top-0 xl:absolute">
						<Suspense fallback={<></>}>
							<GoBackButton />
						</Suspense>
					</div>
					<article className="mx-auto mt-6 max-w-2xl xl:mt-0">
						<header className="space-y-6">
							<p className="relative pl-3 text-zinc-500 dark:text-zinc-400">
								<span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
									<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
								</span>
								{project.meta.tags.join(", ")}
							</p>
							<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
								{project.meta.title}
							</h1>
							<p className="text-base text-zinc-600 dark:text-zinc-400">{project.meta.description}</p>
							<div className="relative aspect-video">
								{project.meta.bannerImage && (
									<Image
										src={project.meta.bannerImage}
										alt={`${project.meta.title} banner`}
										fill
										priority
										className="rounded-2xl object-cover"
										{...(project.meta.bannerImageBlur
											? {
													placeholder: "blur-sm",
													blurDataURL: project.meta.bannerImageBlur,
												}
											: {})}
									/>
								)}
							</div>
						</header>
						<div className="prose mt-8 dark:prose-invert min-w-full">
							<MDXRemote
								source={project.content}
								components={mdxComponents}
								options={{
									mdxOptions: {
										remarkPlugins: [
											// Adds support for GitHub Flavored Markdown
											remarkGfm,
										],
										rehypePlugins: [[rehypePrettyCode as any, { theme: "dark-plus" }], rehypeSlug],
									},
								}}
							/>
						</div>
					</article>
				</div>
			</Container>
		</div>
	);
}

export async function generateStaticParams() {
	const projects = await ProjectService.getProjects();

	return projects
		.filter(project => !!project.content)
		.map(post => ({
			slug: post.slug,
		}));
}
