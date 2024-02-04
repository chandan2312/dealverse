"use client";
import { Moon, SunMedium } from "lucide-react";

import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { keywords } from "../../constants/keywords";

export default function ThemeToggle({ lang }) {
	const { setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<SunMedium className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					{keywords.light[lang]}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					{keywords.dark[lang]}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					{keywords.system[lang]}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
