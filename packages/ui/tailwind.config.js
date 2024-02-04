/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				text1: "var(--text1)",
				text2: "var(--text2)",
				text3: "var(--text3)",
				text4: "var(--text4)",

				linkText: "var(--linkText)",

				bg1: "var(--bg1)",
				bg2: "var(--bg2)",
				bg3: "var(--bg3)",
				bg4: "var(--bg4)",
				bg5: "var(--bg5)",

				accent1: "var(--accent1)",
				accent2: "var(--accent2)",
				accent3: "var(--accent3)",

				muted: "var(--muted)",

				success: "var(--success)",
				warning: "var(--warning)",
				error: "var(--error)",

				popover: "var(--popover)",

				white: "hsla(360, 100%, 100%, 1)",
				black: "hsla(0, 0%, 0%, 1)",

			// 	border: "hsl(var(--border))",
			// 	input: "hsl(var(--input))",
			// 	ring: "hsl(var(--ring))",
			// 	background: "hsl(var(--background))",
			// 	foreground: "hsl(var(--foreground))",
			// 	primary: {
			// 		DEFAULT: "hsl(var(--primary))",
			// 		foreground: "hsl(var(--text1))",
			// 	},
			// 	secondary: {
			// 		DEFAULT: "hsl(var(--secondary))",
			// 		foreground: "hsl(var(--secondary-foreground))",
			// 	},
			// 	whiteTransparent: "hsla(var(--white))",
			// 	destructive: {
			// 		DEFAULT: "hsl(var(--destructive))",
			// 		foreground: "hsl(var(--destructive-foreground))",
			// 	},
			// 	muted: {
			// 		DEFAULT: "hsl(var(--muted))",
			// 		foreground: "hsl(var(--muted-foreground))",
			// 	},
			// 	accent: {
			// 		DEFAULT: "hsl(var(--accent))",
			// 		foreground: "hsl(var(--accent-foreground))",
			// 	},
			// 	popover: {
			// 		DEFAULT: "hsl(var(--popover))",
			// 		foreground: "hsl(var(--popover-foreground))",
			// 	},
			// 	card: {
			// 		DEFAULT: "hsl(var(--card))",
			// 		foreground: "hsl(var(--card-foreground))",
			// 	},
			// },
			// borderRadius: {
			// 	lg: "var(--radius)",
			// 	md: "calc(var(--radius) - 2px)",
			// 	sm: "calc(var(--radius) - 4px)",
			// },
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
