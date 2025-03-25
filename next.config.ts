import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb',
		},
	},
	async rewrites() {
		return [
			{
				source: '/ingest/static/:path*',
				destination: 'https://eu-assets.i.posthog.com/static/:path*',
			},
			{
				source: '/ingest/:path*',
				destination: 'https://eu.i.posthog.com/:path*',
			},
			{
				source: '/ingest/decide',
				destination: 'https://eu.i.posthog.com/decide',
			},
		];
	},
	skipTrailingSlashRedirect: true,
	/* config options here */
};

export default nextConfig;
