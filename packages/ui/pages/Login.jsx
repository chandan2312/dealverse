"use client";

import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../components/custom/LoginForm";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../utils";
import { keywords } from "../constants/keywords";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import tokenChecker from "../helpers/tokenChecker";

export const metadata = {
	title: "Login",
	description: "Authentication forms built using the components.",
};

export default function Login({ lang, server }) {
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	useEffect(() => {
		const checker = async () => {
			const token = await tokenChecker(server);
			if (token) {
				window.location.href = `/dashboard`;
			}
			setLoading(false);
		};

		checker();
	}, []);

	if (loading) {
		return;
	}

	return (
		<div className="relative w-full h-screen flex-col items-center justify-center md:grid  lg:grid-cols-2 lg:px-0">
			<Link
				href="/examples/authentication"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute right-4 hidden top-4 md:right-8 md:top-8"
				)}
			>
				Login
			</Link>
			<div className="relative w-full hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div className="absolute w-full inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
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
					Logo
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, alias
							ipsam numquam praesentium repellat placeat soluta architecto! Fugiat,
							excepturi perspiciatis.
						</p>
						<footer className="text-sm">Raasika</footer>
					</blockquote>
				</div>
			</div>
			<div className="p-4 lg:p-8 h-full flex items-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							{keywords.loginToYourAccount[lang]}
						</h1>
					</div>
					<LoginForm lang={lang} server={server} />
					<p className="px-8 text-center text-sm text-muted-foreground">
						{keywords.byClickingContinue[lang]}{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							{keywords.termsAndConditions[lang]}
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							{keywords.privacyPolicy[lang]}
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
