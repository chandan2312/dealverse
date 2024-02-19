import Header from "@repo/ui/components/dashboard/Header.js";
import Sidebar from "@repo/ui/components/dashboard/Sidebar.js";
import MobileBottomNavWrapper from "@repo/ui/components/wrapper/MobileBottomNavWrapper";
import { ThemeProvider } from "@repo/ui/helpers/ThemeProvider";

export const metadata = {
	title: "Dashboard",
	description: "Manage Your Account",
};

export default function DashboardLayout({ children }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			<div className=" top-0 bottom-0 left-0 right-0">
				<Header lang={process.env.LANGUAGE} server={process.env.BACKEND_URL} />
				<div className="flex w-full fixed left-0 right-0 h-screen overflow-hidden">
					<Sidebar lang={process.env.LANGUAGE} />
					<main className="w-full pt-16 px-3 overflow-y-scroll h-full">
						{children}
					</main>
				</div>
				<MobileBottomNavWrapper
					lang={process.env.LANGUAGE}
					server={process.env.BACKEND_URL}
				/>
			</div>
		</ThemeProvider>
	);
}
