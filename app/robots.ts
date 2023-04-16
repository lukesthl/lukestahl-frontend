import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
			},
		],
		sitemap: `${process.env.VERCEL_ENV || process.env.PUBLIC_URL}/sitemap.xml`,
		host: `${process.env.VERCEL_ENV || process.env.PUBLIC_URL}`,
	};
}
