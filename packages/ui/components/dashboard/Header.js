"use client";

import ThemeToggle from "../../components/custom/ThemeToggle";
import { cn } from "../../utils";
import { MobileSidebar } from "./MobileSidebar";
import { UserNav } from "./UserNav";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import tokenChecker from "../../helpers/tokenChecker";
import LogoutButton from "./LogoutButton";

export default function Header({ lang, server }) {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		const checker = async () => {
			const token = await tokenChecker(server);
			if (!token) {
				router.push("/login");
			}
			setLoading(false);
		};

		checker();
	}, []);

	if (loading) {
		return (
			<div className="fixed top-0 bottom-0 left-0 right-0 z-50">
				<div className="flex items-center justify-center w-full h-full">
					loading.....
				</div>
			</div>
		);
	}

	return (
		<div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
			<nav className="h-14 flex items-center justify-between px-4">
				<div className="hidden lg:block">
					<Link
						href={"https://github.com/Kiranism/next-shadcn-dashboard-starter"}
						target="_blank"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6"
						>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
					</Link>
				</div>
				<div className={cn("block lg:!hidden")}>
					<MobileSidebar lang={lang} />
				</div>

				<div className="flex items-center gap-2">
					<UserNav lang={lang} />
					<ThemeToggle lang={lang} />
					<LogoutButton lang={lang} server={server} />
				</div>
			</nav>
		</div>
	);
}
