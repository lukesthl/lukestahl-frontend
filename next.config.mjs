import { withPlaiceholder } from "@plaiceholder/next";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		typedRoutes: true,
		mdxRs: true,
		nextScriptWorkers: true,
		optimizeCss: true,
	},
	productionBrowserSourceMaps: process.env.ANALYZE === "true",
	async redirects() {
		return [
			{
				source: "/atom",
				destination: "/feed.xml",
				permanent: true,
			},
			{
				source: "/feed",
				destination: "/feed.xml",
				permanent: true,
			},
			{
				source: "/rss",
				destination: "/feed.xml",
				permanent: true,
			},
		];
	},
	headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live an.lukestahl.de;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src *;
    connect-src *;
    font-src 'self';
`;

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\n/g, ""),
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: "Referrer-Policy",
		value: "origin-when-cross-origin",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains; preload",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
];

export default withPlugins([withPlaiceholder, withBundleAnalyzer], nextConfig);
