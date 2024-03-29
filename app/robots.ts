import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const rules: MetadataRoute.Robots["rules"] =
		process.env.NODE_ENV === "production"
			? [
					{
						userAgent: "*",
					},
			  ]
			: {
					disallow: ["*"],
			  };
	return {
		rules,
		sitemap: `${process.env.PUBLIC_URL}/sitemap.xml`,
		host: `${process.env.PUBLIC_URL}`,
	};
}
