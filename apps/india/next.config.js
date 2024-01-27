const dotenv = require("dotenv");
// With this line
const serverPromise = import("@repo/backend");

dotenv.config({
	path: "./app/.env",
});

// Then use it like this
serverPromise.then(({ default: server }) => {
	// Now you can use 'server' here
	const result = server(
		process.env.BACKEND_PORT,
		process.env.DB_SERVER_URL,
		process.env.DB_NAME
	);
});

const config = {
	transpilePackages: ["@repo/ui", "@repo/backend"],

	reactStrictMode: true,

	images: {
		domains: ["localhost", "avatars.githubusercontent.com"],
	},

	remotePatterns: [
		{
			protocol: "https",
			hostname: "**",
		},
	],
};

module.exports = config;
