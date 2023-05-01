import fs from "fs/promises";
import RSS from "rss";
import path from "path";
import { marked } from "marked";
import "dotenv/config";
import { ProjectService } from "../services/project.service";

const renderer = new marked.Renderer();

renderer.link = (href, _, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

marked.setOptions({
	gfm: true,
	breaks: true,
	headerIds: true,
	renderer,
});

const renderProject = (md: string) => marked.parse(md);

const url = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.PUBLIC_URL}`;

const main = async (): Promise<void> => {
	const feed = new RSS({
		title: "Luke Stahl",
		site_url: `${url.toString()}`,
		feed_url: `${url.toString()}/feed.xml`,
		image_url: `${url.toString()}/og.png?title=${encodeURIComponent("Luke Stahl's Projekte")}}`,
		language: "de",
		description: "Luke Stahl's Projekte",
	});
	const projects = await ProjectService.getProjects({ filter: project => !!project.content });
	projects.forEach(project => {
		const projectUrl = `${url.toString()}/projects/${project.slug}`;

		feed.item({
			title: project.meta.title,
			description: project.content ? renderProject(project.content) : "",
			date: new Date(project?.meta.date),
			author: project.meta.author,
			url: projectUrl,
			guid: projectUrl,
		});
	});

	const rss = feed.xml({ indent: true });
	await fs.writeFile(path.join(__dirname, "../public/feed.xml"), rss);
	console.log("RSS feed generated");
};

void main();
