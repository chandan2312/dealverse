"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TabList({ lang, server, slug, list }) {
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab");

	return (
		<div className="w-full bg-slate-900 text-slate-300 flex items-center justfy-between flex-nowrap gap-4 md:gap-6 lg:gap-8 px-3 py-2 lg:py-3  overflow-x-scroll lg:rounded-lg">
			{list?.map((item, index) => (
				<Link
					href={item?.value == "" ? `${slug}/` : `${slug}/?tab=${item?.value}`}
					className={`${
						item?.value == tab && "font-semibold   border-b-2 border-accent"
					} text-sm cursor-pointer px-2 line-clamp-1 flex-shrink-0`}
					key={index + 1}
				>
					{item?.title}
				</Link>
			))}
		</div>
	);
}
