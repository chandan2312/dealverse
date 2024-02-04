// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/ui/tailwind";

const config: Pick<Config, "content" | "presets"> = {
	content: [
		"./app/**/*.tsx",
		"./app/**/*.ts",
		"./app/**/*.js",
		"./app/**/*.jsx",
		"./app/**/*.html",
	],
	presets: [sharedConfig],
};

export default config;
