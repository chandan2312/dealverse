/** @type {import('next').NextConfig} */

import server from "@repo/backend";
import dotenv from "dotenv";

dotenv.config({
	path: "./app/.env",
});

const result = server(
	process.env.BACKEND_PORT,
	process.env.DB_SERVER_URL,
	process.env.DB_NAME
);

const config = {
	transpilePackages: ["@repo/ui", "@repo/backend"],
};

export default config;
