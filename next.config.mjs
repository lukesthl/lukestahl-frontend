import { withPlaiceholder } from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		typedRoutes: true,
	},
};

export default withPlaiceholder(nextConfig);
