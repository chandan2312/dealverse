// "use client";
import "@repo/ui/globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@repo/ui/helpers/ThemeProvider";

// import NavbarWrapper from "@repo/ui/components/wrapper/NavbarWrapper";
// import MobileBottomNavWrapper from "@repo/ui/components/wrapper/MobileBottomNavWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DealVerse",
	description: "Best Community For Offer & Deals",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang={process.env.LANGUAGE} suppressHydrationWarning={true}>
			<body
				className={`${inter.className} text-primaryText max-w-[1360px] mx-auto px-auto`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{/* <NavbarWrapper lang={process.env.LANGUAGE} /> */}
					{children}
					{/* <MobileBottomNavWrapper lang={process.env.LANGUAGE} /> */}
				</ThemeProvider>
			</body>
		</html>
	);
}
