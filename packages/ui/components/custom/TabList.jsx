"use client";

import React from "react";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

import { keywords } from "../../constants/keywords";

const TabList = ({ lang, tabList }) => {
	return (
		<div>
			<Tabs
				defaultValue="account"
				className="w-full max-md:hidden mx-auto px-auto max-md:overflow-x-scroll"
			>
				<TabsList className="">
					{tabList.map((tab) => (
						<>
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.icon}
								<span className="pl-1">{keywords[tab.value][lang]}</span>
							</TabsTrigger>

							<Separator orientation="vertical" />
						</>
					))}
				</TabsList>
			</Tabs>

			{/* ------------------ Mobile Tab List ---------------- */}

			<Tabs
				defaultValue="account"
				className="w-full md:hidden mx-auto px-auto max-md:overflow-x-hidden max-md:overflow-y-hidden py-1"
			>
				<TabsList className="py-1">
					{tabList.map((tab) => (
						<TabsTrigger
							className="hover:bg-accent"
							key={tab.value}
							value={tab.value}
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button className="hover:bg-transparent" size="sm" variant="ghost">
											{tab.icon}
										</Button>
									</TooltipTrigger>
									<TooltipContent>{keywords[tab.value][lang]}</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	);
};

export default TabList;
