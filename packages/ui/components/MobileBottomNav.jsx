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
import FormDialog from "./custom/FormDialog";
import AddDeal from "./form/AddDeal";
import Profile from "./custom/Profile";

const MobileBottomNav = ({ lang, server, tabList }) => {
	const dispatch = useDispatch();
	return (
		<Tabs defaultValue="account" className="w-full h-6 mx-auto px-auto">
			<TabsList className=" px-2 py-0 m-0 rounded-t-lg shadow-lg w-full  h-10 flex items-center justify-between md:hidden fixed bottom-0 ">
				<TabsTrigger
					className=" hover:bg-accent hover:text-accent-foreground"
					value="home"
				>
					<Home size={28} />
				</TabsTrigger>
				{/* <Separator orientation="vertical" /> */}
				<TabsTrigger
					className=" hover:bg-accent hover:text-accent-foreground"
					value="flashDeal"
				>
					<Zap size={28} />
				</TabsTrigger>
				{/* <Separator orientation="vertical" /> */}
				<TabsTrigger
					className="bg-accent text-accent-foreground hover:bg-accent2 hover:text-accent2-foreground"
					value="add"
				>
					<FormDialog
						lang={lang}
						server={server}
						buttonText={
							<span>
								<PlusSquare strokeWidth={2} />
							</span>
						}
						title="Add New Deal"
						component={<AddDeal lang={lang} server={server} />}
					/>
				</TabsTrigger>
				{/* <Separator orientation="vertical" /> */}
				<TabsTrigger
					onClick={() => dispatch(toggleMobileSearch())}
					className="hover:bg-accent hover:text-accent-foreground "
					value="search"
				>
					<Search size={28} />
				</TabsTrigger>
				{/* <Separator orientation="vertical" /> */}
				<TabsTrigger className="bg-transparent " value="user">
					<Profile lang={lang} isMobile={true} server={server} />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};

export default MobileBottomNav;
