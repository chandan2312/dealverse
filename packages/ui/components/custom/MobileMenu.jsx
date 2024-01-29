"use client";

import React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { AlignJustify } from "lucide-react";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

import { keywords } from "../../constants/keywords";

const MobileMenu = ({ lang }) => {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">
						<AlignJustify />
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
					</SheetHeader>
					<ul>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
						<li>Item 4</li>
					</ul>
					<SheetFooter>
						<SheetClose asChild>
							<Button type="submit">Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default MobileMenu;
