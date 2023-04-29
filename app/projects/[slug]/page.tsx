import Image from "next/image";
import { Container } from "../../../src/components/layout/container";
import { GoBackButton } from "../../../src/components/ui/goback.button";
import { ProjectService } from "../../../src/services/project.service";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Route } from "next";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const mdxComponents: MDXRemoteProps["components"] = {
	a: ({ children, ...props }) => {
		return (
			<Link {...props} target="_blank" rel="noopener" href={(props.href || "") as Route}>
				{children}
			</Link>
		);
	},
	img: ({ src, alt }) => {
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

export default async function Projects({ params }: { params: { slug: string } }) {
	const project = await ProjectService.getProjectByFileName(`${params.slug}.md`);
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
										alt="alt"
										fill
										className="rounded-2xl object-cover"
										{...(project.meta.bannerImageBlur
											? {
													placeholder: "blur",
													blurDataURL: project.meta.bannerImageBlur,
											  }
											: {})}
									/>
								)}
							</div>
						</header>
						<div className="prose mt-8 dark:prose-invert">
							{/* @ts-expect-error Server Component */}
							<MDXRemote
								source={project.content}
								components={mdxComponents}
								options={{
									mdxOptions: {
										remarkPlugins: [
											// Adds support for GitHub Flavored Markdown
											remarkGfm,
										],
										rehypePlugins: [[rehypePrettyCode, { theme: "dark-plus" }]],
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
