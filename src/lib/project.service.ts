import glob from "fast-glob";
import { readFileSync } from "fs";
import matter from "gray-matter";
import * as path from "path";

interface IMeta {
	title: string;
	author: string;
	date: string;
	description: string;
	bannerImage: string;
	tags: string[];
}

export interface IProject {
	slug: string;
	meta: IMeta;
	content: string;
}

export class ProjectService {
	public static getProjectByFileName = async (projectFileName: string): Promise<IProject> => {
		let { data, content } = await matter(readFileSync(path.join(process.cwd(), `/projects/${projectFileName}`)));
		return {
			slug: projectFileName.replace(/(\/index)?\.md$/, ""),
			meta: data as IMeta,
			content,
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
