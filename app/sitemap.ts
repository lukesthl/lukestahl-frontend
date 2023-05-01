import { MetadataRoute } from "next";
import { navItems } from "../components/header/navitems";
import { ProjectService } from "../services/project.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const defaultSitemap: MetadataRoute.Sitemap = navItems
		.filter(item => item.href.startsWith("/"))
		.map(item => ({
			url: `${process.env.PUBLIC_URL}${item.href}`,
			lastModified: new Date().toISOString().split("T")[0],
		}));
	const projects = await ProjectService.getProjects();
	const projectSitemap: MetadataRoute.Sitemap = projects
		.filter(project => !!project.content)
		.map(project => ({
			url: `${process.env.PUBLIC_URL}/projects/${project.slug}`,
			lastModified: new Date(project.meta.date).toISOString().split("T")[0],
		}));
	return [...defaultSitemap, ...projectSitemap];
}
