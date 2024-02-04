"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../../components/icons";
import { cn } from "../../utils";
// import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { keywords } from "../../constants/keywords";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

export function DashboardNav({ lang, menuList, setOpen }) {
	const path = usePathname();

	if (!menuList?.length) {
		return null;
	}

	const [currTab, setCurrTab] = useState("Dashboard");
	const [subTab, setSubTab] = useState("");

	return (
		<nav className="grid items-start gap-2">
			{menuList.map((item, index) => {
				return (
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem
							className={`${
								currTab === item.title && "bg-accent1 rounded-md"
							} hover:bg-blue-300 hover:rounded-lg shadow-sm px-2`}
							value="item-1"
						>
							{item.options.length > 0 ? (
								<AccordionTrigger
									onClick={() => {
										setCurrTab(item.title);
									}}
									className={`px-2 `}
								>
									{item.icon} {item.title}
								</AccordionTrigger>
							) : (
								<Link href={`${item.href}`} className="">
									<AccordionTrigger
										isArrowVisible={false}
										onClick={() => {
											setCurrTab(item.title);
										}}
										className={`px-2 `}
									>
										{item.icon} {item.title}
									</AccordionTrigger>
								</Link>
							)}

							{item.options.length > 0 && (
								<AccordionContent className="flex flex-col gap-2 pl-5 ">
									{item.options.map((option, index) => {
										return (
											<Link
												key={index}
												href={`${option.href}`}
												className={`px-2 bg-slate-100 rounded-md py-1 ${
													subTab === option.title && "bg-white  text-black "
												}`}
												onClick={() => {
													setSubTab(option.title);
													setCurrTab(item.title);
												}}
											>
												<div className="hover:text-bold cursor-pointer w-full text-start  rounded-lg pl-4">
													- {option.title}
												</div>
											</Link>
										);
									})}
								</AccordionContent>
							)}
						</AccordionItem>
					</Accordion>
				);
			})}
		</nav>
	);
}
