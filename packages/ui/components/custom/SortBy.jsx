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
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { set } from "date-fns";

export default function SortBy({ lang, server, slug, currTab }) {
	const [position, setPosition] = React.useState("this-week");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center gap-1">
					Sort by <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-70 bg-secondary text-secondary-foreground">
				<DropdownMenuLabel>Select...</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem onClick={() => setPosition("today")} value="today">
						<Link
							href={`${slug}/${
								currTab ? `?tab=${currTab}&sort=today` : "?sort=today"
							}`}
						>
							Today
						</Link>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						onClick={() => setPosition("this-week")}
						value="this-week"
					>
						{" "}
						<Link
							href={`${slug}/${
								currTab ? `?tab=${currTab}&sort=this-week` : "?sort=this-week"
							}`}
						>
							This Week
						</Link>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						onClick={() => setPosition("this-month")}
						value="this-month"
					>
						<Link
							href={`${slug}/${
								currTab ? `?tab=${currTab}&sort=this-month` : "?sort=this-month"
							}`}
						>
							This Month
						</Link>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
