"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { toast } from "./ui/use-toast";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

import {
	Flame,
	Newspaper,
	Zap,
	CircleUserRound,
	Filter,
	Copy,
} from "lucide-react";

import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

//form

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const items = [
	{
		id: "applications",
		label: "Applications",
	},
	{
		id: "desktop",
		label: "Desktop",
	},
	{
		id: "downloads",
		label: "Downloads",
	},
	{
		id: "documents",
		label: "Documents",
	},
];

const FormSchema = z.object({
	items: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});

const Filters = () => {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: ["recents", "home"],
		},
	});

	function onSubmit(data) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<div className="flex justify-between mx-4">
			<Tabs defaultValue="account" className="w-full mx-auto px-auto">
				<TabsList>
					<TabsTrigger value="popular">
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
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* filters */}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="rounded-full">
						<Filter /> <span className="px-1">Filters</span>{" "}
						<Badge className="!bg-accent">2</Badge>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-auto bg-primary">
					<DropdownMenuSeparator className="my-2" />

					{/* ----------------- Form ------------------- */}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="items"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="text-base">Filters</FormLabel>
										</div>
										{items.map((item) => (
											<FormField
												key={item.id}
												control={form.control}
												name="items"
												render={({ field }) => {
													return (
														<FormItem
															key={item.id}
															className="flex flex-row items-start space-x-3 space-y-0"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item.id)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([...field.value, item.id])
																			: field.onChange(
																					field.value?.filter((value) => value !== item.id)
																				);
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">{item.label}</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Filters;
