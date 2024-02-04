"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../utils.js";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea.jsx";
import UploadImages from "./UploadImages.jsx";

const typeEnum = [
	{ label: "Deal", value: "Deal" },
	{ label: "Coupon Code", value: "CouponCode" },
];
export default function AddDeal() {
	const formSchema = z.object({
		title: z.string().min(1).max(255),
		slug: z.string().min(1).max(255),
		description: z.string().min(1).max(255),
		type: z.string(),
		offer: z.string().min(1).max(255),
		code: z.string().min(1).max(255).optional(),
		store: z.string().min(1).max(255),
		offerLink: z.string().min(1).max(255),
		discountPrice: z.string().min(1).max(255).optional(),
		originalPrice: z.string().min(1).max(255).optional(),
		deliveryPrice: z.string().optional(),
		category: z.string().min(1).max(255),
		tags: z.string().min(1).max(255).optional(),
		expiryDate: z.date().optional(),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "string",
			slug: "string",
			description: "string",
			offer: "string",
			code: "string",
			store: "string",
			offerLink: "string",
			discountPrice: "string",
			originalPrice: "string",
			deliveryPrice: "true",
			category: "string",
			tags: "string",
		},
	});

	function onSubmit(values) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<h1 className="px-4 lg:px-6 py-6 text-xl lg:text-2xl font-semibold">
				Add New Deal / Coupon
			</h1>
			<form
				noValidatflex-grow
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 "
			>
				<div className="flex gap-2">
					<div className="flex-grow">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Slug</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Type</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-[200px] justify-between",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value
														? typeEnum.find((item) => item.value === field.value)?.label
														: "Select item"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search myEnum359..." />
												<CommandEmpty>No type found.</CommandEmpty>
												<CommandGroup>
													{typeEnum.map((item) => (
														<CommandItem
															value={item.label}
															key={item.value}
															onSelect={() => {
																form.setValue("type", item.value);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	item.value === field.value ? "opacity-100" : "opacity-0"
																)}
															/>
															{item.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="offer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Offer</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coupon Code</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="store"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Store</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="offer-link"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Offer Link</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="discount-price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Discount Price</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="original-price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Original Price</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="delivery-price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Delivery Price</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="tags"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tags</FormLabel>
									<FormControl>
										<Input placeholder="Placeholder" {...field} />
									</FormControl>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="expiry-date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Expiry Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Placeholder</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												// disabled={(date) =>
												//   date > new Date() || date < new Date("1900-01-01")
												// }
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormDescription>Description</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex-shrink">
						<UploadImages />
					</div>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
