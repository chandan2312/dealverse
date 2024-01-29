"use client";

import * as React from "react";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { ArrowDownUp } from "lucide-react";

import { keywords } from "../../constants/keywords";

export default function SortByMenu({ lang }) {
	const [position, setPosition] = React.useState("bottom");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="flex items-center gap-2">
					<span>
						<ArrowDownUp />
					</span>
					<span>{keywords.sortBy[lang]}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-primary opacity-100">
				<DropdownMenuLabel>Sort</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem value="newest">
						{keywords.newestFirst[lang]}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="oldest">
						{keywords.oldestFirst[lang]}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="mostLiked">
						{keywords.mostLiked[lang]}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="mostDiscussed">
						{keywords.mostDiscussed[lang]}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
