import glob from "fast-glob";
import { readFileSync } from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import * as path from "path";
import { getPlaiceholder } from "plaiceholder";

interface IMeta {
	title: string;
	author: string;
	date: string;
	description: string;
	bannerImage: string;
	bannerImageBlur: string | undefined;
	icon: string;
	links: string[];
	tags: string[];
}

export interface IProject {
	slug: string;
	meta: IMeta;
	content: string;
}

export class ProjectService {
	public static getProjectByFileName = async (projectFileName: string): Promise<IProject> => {
		const fileNameDecoded = decodeURIComponent(projectFileName);
		let { data, content } = await matter(readFileSync(path.join(process.cwd(), `/projects/${fileNameDecoded}`)));
		const meta = data as IMeta;
		meta.bannerImageBlur = (
			await getPlaiceholder(meta.bannerImage).catch(error => {
				console.log(error);
				return null;
			})
		)?.base64;
		return {
			slug: projectFileName.replace(/(\/index)?\.md$/, ""),
			meta,
			content: new MarkdownIt().render(content),
		};
	};

	public static getProjects = async () => {
		let projectFileNames = await glob(["*.md", "*/index.md"], {
			cwd: path.join(process.cwd(), "/projects"),
		});
		let projects = await Promise.all(
			projectFileNames.map(projectFileName => this.getProjectByFileName(projectFileName))
		);
		return projects.sort((a, z) => new Date(z.meta.date).getTime() - new Date(a.meta.date).getTime());
	};
}
