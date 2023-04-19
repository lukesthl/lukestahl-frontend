import { MetadataRoute } from "next";
import { navItems } from "../src/components/header/navitems";
import { ProjectService } from "../src/services/project.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const defaultSitemap: MetadataRoute.Sitemap = navItems.map(item => ({
		url: `${process.env.VERCEL_URL || process.env.PUBLIC_URL}${item.href}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));
	const projects = await ProjectService.getProjects();
	const projectSitemap: MetadataRoute.Sitemap = projects
		.filter(project => !!project.content)
		.map(project => ({
			url: `${process.env.VERCEL_URL || process.env.PUBLIC_URL}/projects/${project.slug}`,
			lastModified: new Date(project.meta.date).toISOString().split("T")[0],
		}));
	return [...defaultSitemap, ...projectSitemap];
}
