const nextConfig = {
	images: {
		domains: ["localhost", "avatars.githubusercontent.com"],
	},
	remotePatterns: [
		{
			protocol: "https",
			hostname: [
				"**",
				"localhost",
				"avatars.githubusercontent.com",
				"cloudflare-ipfs.com",
			],
		},
	],
};

module.exports = nextConfig;
