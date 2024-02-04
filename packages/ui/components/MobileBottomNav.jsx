"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import { useDispatch } from "react-redux";
import { toggleMobileSearch } from "../store/slices/navbarSlice";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

import { keywords } from "../constants/keywords";

import { Home, Zap, PlusSquare, Search } from "lucide-react";

import Link from "next/link";

const MobileBottomNav = ({ lang, tabList }) => {
	const dispatch = useDispatch();
	return (
		<Tabs defaultValue="account" className="w-full  mx-auto px-auto">
			<TabsList className=" px-2 w-full flex items-center justify-between md:hidden fixed bottom-0 h-auto">
				<TabsTrigger className=" hover:bg-accent" value="home">
					<Home size={28} />
				</TabsTrigger>
				<Separator orientation="vertical" />
				<TabsTrigger className="  hover:bg-accent" value="flashDeal">
					<Zap size={28} />
				</TabsTrigger>
				<Separator orientation="vertical" />
				<TabsTrigger className=" hover:bg-green-500 bg-accent" value="add">
					<PlusSquare strokeWidth={2} />
				</TabsTrigger>
				<Separator orientation="vertical" />
				<TabsTrigger
					onClick={() => dispatch(toggleMobileSearch())}
					className="hover:bg-accent"
					value="search"
				>
					<Search size={28} />
				</TabsTrigger>
				<Separator orientation="vertical" />
				<TabsTrigger className=" hover:bg-accent" value="search">
					<Link href="/dashboard">
						<img src={faker.image.avatar()} className="w-6 h-6 rounded-full" alt="" />
					</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};

export default MobileBottomNav;
