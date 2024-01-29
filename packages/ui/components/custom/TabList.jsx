"use client";

import React from "react";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

import { keywords } from "../../constants/keywords";

const TabList = ({ lang, tabList }) => {
	return (
		<Tabs defaultValue="account" className="w-full mx-auto px-auto">
			<TabsList>
				{tabList.map((tab) => (
					<>
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.icon}
							<span className="pl-1">{keywords[tab.value][lang]}</span>
						</TabsTrigger>

						<Separator orientation="vertical" />
					</>
				))}

				{/* <TabsTrigger value="popular">
						<Flame />
						<span className="pl-1">Popular</span>
					</TabsTrigger>
					<Separator orientation="vertical" />

					<TabsTrigger value="latest">
						<Newspaper />
						<span className="pl-1">Latest</span>
					</TabsTrigger>
					<Separator orientation="vertical" />

					<TabsTrigger value="trending">
						<Zap />
						<span className="pl-1">Trending</span>
					</TabsTrigger>
					<Separator orientation="vertical" />

					<TabsTrigger value="for-you">
						<CircleUserRound />
						<span className="pl-1">For You</span>
					</TabsTrigger> */}
			</TabsList>
		</Tabs>
	);
};

export default TabList;
