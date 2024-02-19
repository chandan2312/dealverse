const dotenv = require("dotenv");
// With this line
const serverPromise = import("@repo/backend");

dotenv.config({
	path: "./app/.env",
});

serverPromise.then(({ default: server }) => {
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
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

module.exports = config;
