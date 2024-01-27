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

export default function SortByMenu() {
	const [position, setPosition] = React.useState("bottom");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="flex items-center gap-2">
					<span>
						<ArrowDownUp />
					</span>
					<span>sortBy</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-primary opacity-100">
				<DropdownMenuLabel>Sort</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="mostLiked">Most Liked</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="mostDiscussed">
						Most Discussed
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
