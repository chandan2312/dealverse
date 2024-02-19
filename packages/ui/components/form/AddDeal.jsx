"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { transliterate as tr, slugify } from "transliteration";
import { useState, useRef } from "react";
import { cn } from "../../utils.js";
import * as z from "zod";
import { keywords } from "../../constants/keywords.js";

import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import AddTags from "../custom/AddTags";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import TextEditor from "../custom/TextEditor.jsx";

import { format, set } from "date-fns";
import {
	Check,
	ChevronsUpDown,
	CalendarIcon,
	ArrowLeft,
	ArrowRight,
} from "lucide-react";
import UploadImages from "./UploadImages.jsx";
import { useEffect } from "react";
import AddStore from "./AddStore.jsx";
import FormPopupTemplate from "../custom/FormPopupTemplate.jsx";
import { Type } from "lucide-react";
import { Link } from "lucide-react";
import { toast } from "sonner";
import { addStore } from "../../store/slices/formSlice.js";
import axios from "axios";

const typeEnum = [
	{ label: "Deal", value: "Deal" },
	{ label: "Coupon Code", value: "Coupon" },
];

const categoryEnum = [
	{
		name: "Electronics",
		slug: "electronics",
		_id: "65c7a3092bbd19c7ac95a452",
	},
	{
		name: "Fashion",
		slug: "fashion",
		_id: "65c86877bce948de46e34979",
	},
	{
		name: "Home & Kitchen",
		slug: "home-kitchen",
		_id: "65c7a3362bbd19c7ac95a455",
	},
];

const storeEnum = [
	{ name: "Amazon", _id: "65c852c5f9a66644317178c1" },
	{ name: "Flipkart", _id: "65c852c5f9a66644317178c2" },
	{ name: "Goviralhost", _id: "65c852c5f9a66644317178c8" },
];

const tagEnum = [
	{ name: "Hosting", _id: "65c85f8238f1a35c0a7757b4" },
	{ name: "Free", _id: "65c85fa138f1a35c0a7757b7" },
	{ name: "Web Hosting", _id: "65c85faa38f1a35c0a7757ba" },
	{ name: "Free Credits", _id: "65c85fb438f1a35c0a7757bd" },
];

export default function AddDeal({ lang, server }) {
	const dispatch = useDispatch();
	const formSchema = z.object({
		title: z
			.string()
			.min(1, { message: "Title is required" })
			.max(255, { message: "Title is long" }),
		type: z.string().min(1, { message: "Please, select a type" }),
		offer: z
			.string()
			.min(1, { message: "Offer is required" })
			.max(20, { message: "Offer should be most 20 characters long." }),
		code: z.string().min(1).max(255).optional(),
		offerLink: z.string().min(1, "Product Or Page Link is required").max(255),
		discountPrice: z
			.string()
			.max(15, { message: "Amount is Too High" })
			.optional(),
		originalPrice: z
			.string()
			.max(15, { message: "Amount is Too High" })
			.optional(),
		deliveryPrice: z
			.string()
			.max(15, { message: "Amount is Too High" })
			.optional(),
		category: z.string().min(1, "Select or Create a category"),
		expiryDate: z.date().optional(),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			offer: "",
			code: "",
			offerLink: "",
			discountPrice: "",
			originalPrice: "",
			deliveryPrice: "",
			category: "",
		},
	});

	const [formData, setFormData] = useState({
		title: "",
		link: "",
		description: "",
		type: "",
		store: "",
		category: "",
		tags: "",
		images: "",
	});

	const [currStep, setCurrStep] = useState(1);
	const maxStep = 5;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const description = useSelector((state) => state.form.description);
	const images = useSelector((state) => state.form.images);
	const tags = useSelector((state) => state.form.tags);
	const addedStore = useSelector((state) => state.form.addedStore);

	const onSubmit = async (e) => {
		setIsSubmitting(true);
		const obj = {
			title: form.getValues("title"),
			link: form.getValues("offerLink"),
			description: description,
			images: images,
			offer: form.getValues("offer"),
			store: addedStore._id,
			type: form.getValues("type"),
			code: form.getValues("code"),

			discountPrice: form.getValues("discountPrice") || 0,
			originalPrice: form.getValues("originalPrice") || 0,
			deliveryPrice: form.getValues("deliveryPrice") || 0,
			expiryDate: form.getValues("expiryDate"),

			category: form.getValues("category"),
			tags: tags,
		};

		console.log("obj");
		console.log(obj);

		const res = await axios.post(`${server}/api/v1/deal/add-deal`, obj);
		const response = await res.data;

		console.log(response);

		const { statusCode, message } = response;
		if (statusCode === 200) {
			console.log("Deal Added Successfully");
			const data = response.data;

			toast("New Deal Submitted", {
				description: "New Deal is added & will be public after approval",
			});

			setIsSubmitting(false);

			setTimeout(() => {
				window.location = `/deal/${data.slug}`;
			}, 1000);
		} else {
			toast(`Error Occured (${statusCode})`, {
				description: `${message}`,
			});
		}
	};

	const handleImages = (arr) => {
		setFormData((prev) => ({
			...prev,
			images: arr,
		}));
	};

	const handleTextEditor = (text) => {
		console.log(text);
		setFormData((prev) => ({
			...prev,
			description: text,
		}));
	};

	return (
		<>
			<Card className=" ">
				<div className="flex flex-end text-semibold text-sm items-center px-2 lg:px-3 py-1">
					{currStep} / {maxStep} steps
				</div>
				<CardContent className="overflow-y-scroll">
					{/* --------------------------- FORM --------------------------- */}

					<Form {...form}>
						<form
							noValidatflex-grow
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-2 w-full text-left"
						>
							<div className="flex max-md:flex-col gap-2">
								<div className="flex-grow w-full">
									{/* ------------------------- STEP 1 ------------------------ */}
									{currStep === 1 && (
										<>
											<FormField
												control={form.control}
												name="title"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="flex items-center gap-2 ">
															<Type />
															Title <span className="text-xs">*</span>
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Add Title"
																value={formData.title}
																onChangeCapture={(e) => {
																	setFormData((prev) => ({
																		...prev,
																		title: e.target.value,
																	}));
																}}
																{...field}
															/>
														</FormControl>
														{/* <FormMessage /> */}
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="offerLink"
												render={({ field }) => (
													<FormItem className="mt-2">
														<FormLabel className="flex items-center gap-2 ">
															<Link />
															Link <span className="text-xs">(affiliate) *</span>
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Add product, page or affiliate link"
																value={formData.link}
																onChangeCapture={(e) => {
																	setFormData((prev) => ({
																		...prev,
																		link: e.target.value,
																	}));
																}}
																{...field}
															/>
														</FormControl>
														{/* <FormMessage /> */}
													</FormItem>
												)}
											/>

											<div>
												<UploadImages
													handleImages={handleImages}
													lang={lang}
													server={server}
												/>
											</div>
										</>
									)}

									{/* ------------------------- step 2 ------------------------ */}

									{currStep === 2 && (
										<>
											<div className=" pt-2">
												<FormField
													control={form.control}
													name="offer"
													render={({ field }) => (
														<FormItem className="flex flex-col pt-2">
															<FormLabel className="text-left py-1 ">
																Offer <span className="text-xs">*</span>
															</FormLabel>
															<FormControl>
																<Input placeholder="30% Off" {...field} />
															</FormControl>
															{/* <FormMessage /> */}
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name=""
													render={({ field }) => (
														<FormItem className=" flex flex-col pt-2">
															<FormLabel className="text-left py-1 ">
																Store <span className="text-xs">*</span>
															</FormLabel>
															<Popover className="pt-3 ">
																<PopoverTrigger asChild>
																	<FormControl>
																		<Button
																			variant="outline"
																			role="combobox"
																			className={cn(
																				"w-full justify-between",
																				!addedStore.name && "text-muted-foreground"
																			)}
																		>
																			{addedStore.name ? addedStore.name : "Search Store"}
																			<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																		</Button>
																	</FormControl>
																</PopoverTrigger>
																<PopoverContent className="w-full p-0">
																	<Command>
																		<CommandInput placeholder="Amazon" />
																		<CommandEmpty>
																			No store found.{" "}
																			<FormPopupTemplate
																				lang={lang}
																				server={server}
																				buttonText="Add Store"
																				buttonClass="px-1"
																				component={<AddStore lang={lang} server={server} />}
																				title="Add New Store"
																			/>
																		</CommandEmpty>
																		<CommandGroup>
																			{storeEnum.map((item) => (
																				<CommandItem
																					value={item.name}
																					key={item.name}
																					onSelect={() => {
																						dispatch(
																							addStore({
																								name: item.name,
																								_id: item._id,
																							})
																						);
																					}}
																				>
																					<Check
																						className={cn(
																							"mr-2 h-4 w-4",
																							item._id === addedStore._id ? "opacity-100" : "opacity-0"
																						)}
																					/>
																					{item.name}
																				</CommandItem>
																			))}
																		</CommandGroup>
																	</Command>
																</PopoverContent>
															</Popover>
															{/* <FormMessage /> */}
														</FormItem>
													)}
												/>
											</div>

											<div className=" gap-3 pt-2">
												<FormField
													control={form.control}
													name="type"
													render={({ field }) => (
														<FormItem className=" flex flex-col pt-2">
															<FormLabel className="text-left py-1 ">
																Type <span className="text-xs">*</span>
															</FormLabel>
															<Popover className="pt-3">
																<PopoverTrigger asChild>
																	<FormControl>
																		<Button
																			variant="outline"
																			role="combobox"
																			className={cn(
																				"w-full justify-between",
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
																		<CommandInput placeholder="Search type..." />
																		<CommandEmpty>No type found.</CommandEmpty>
																		<CommandGroup>
																			{typeEnum.map((item) => (
																				<CommandItem
																					value={item.label}
																					key={item.value}
																					onSelect={() => {
																						form.setValue("type", item.value);
																						setFormData({ ...formData, type: item.value });
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
															{/* <FormMessage /> */}
														</FormItem>
													)}
												/>

												{formData.type === "Coupon" && (
													<FormField
														control={form.control}
														name="code"
														render={({ field }) => (
															<FormItem className=" flex flex-col pt-2">
																<FormLabel className="text-left py-1 ">Coupon Code</FormLabel>
																<FormControl>
																	<Input placeholder="GETFIRST" {...field} />
																</FormControl>
																{/* <FormMessage /> */}
															</FormItem>
														)}
													/>
												)}
											</div>
										</>
									)}

									{/* ------------------------- STEP 3 ------------------------ */}

									{currStep === 3 && (
										<>
											<FormField
												control={form.control}
												name="discountPrice"
												render={({ field }) => (
													<FormItem className="col-span-6 lg:col-span-3 flex flex-col pt-2">
														<FormLabel>
															Discount Price <span className="text-xs">(optional)</span>
														</FormLabel>
														<FormControl>
															<Input
																type="number"
																placeholder={`${keywords.currency[lang]} 99`}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="originalPrice"
												render={({ field }) => (
													<FormItem className="col-span-6 lg:col-span-3 flex flex-col pt-2">
														<FormLabel>
															Original Price <span className="text-xs">(optional)</span>
														</FormLabel>
														<FormControl>
															<Input
																type="number"
																placeholder={`${keywords.currency[lang]} 129`}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="deliveryPrice"
												render={({ field }) => (
													<FormItem className="col-span-6 lg:col-span-3 flex flex-col pt-2">
														<FormLabel>
															Delivery Price <span className="text-xs">(optional)</span>
														</FormLabel>
														<FormControl>
															<Input
																placeholder={`${keywords.currency[lang]} 4.99`}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="expiryDate"
												render={({ field }) => (
													<FormItem className="col-span-6 lg:col-span-3 flex flex-col pt-2">
														<FormLabel>
															Expiry Date <span className="text-xs">(optional)</span>
														</FormLabel>
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
																			<span>Deal Expiry Date</span>
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
														<FormMessage />
													</FormItem>
												)}
											/>
										</>
									)}

									{/* ------------------------- STEP 4 ------------------------ */}

									{currStep === 4 && (
										<>
											<FormField
												control={form.control}
												name=""
												render={({ field }) => (
													<FormItem className="mt-4">
														<FormLabel>
															Description <span className="text-xs">*</span>
														</FormLabel>
														<FormControl>
															{/* <Textarea placeholder="Description" {...field} /> */}
															<TextEditor lang={lang} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</>
									)}

									{/* ------------------------- STEP 5 ------------------------ */}

									{currStep === 5 && (
										<>
											<FormField
												control={form.control}
												name="category"
												render={({ field }) => (
													<FormItem className="mt-4 flex flex-col">
														<FormLabel>
															Category <span className="text-xs">*</span>
														</FormLabel>
														<Popover className="pt-3">
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
																			? categoryEnum.find((item) => item._id === field.value)?.name
																			: "Select Category"}
																		<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent className="w-[200px] p-0">
																<Command>
																	<CommandInput placeholder="Search Categories" />
																	<CommandEmpty>No Categories.</CommandEmpty>
																	<CommandGroup>
																		{categoryEnum.map((item) => (
																			<CommandItem
																				value={item.name}
																				key={item.name}
																				onSelect={() => {
																					form.setValue("category", item._id);
																				}}
																			>
																				<Check
																					className={cn(
																						"mr-2 h-4 w-4",
																						item._id === field.value ? "opacity-100" : "opacity-0"
																					)}
																				/>
																				{item.name}
																			</CommandItem>
																		))}
																	</CommandGroup>
																</Command>
															</PopoverContent>
														</Popover>
														{/* <FormMessage /> */}
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name=""
												render={({ field }) => (
													<FormItem className="mt-4 flex flex-col">
														<FormLabel>
															Tags <span className="text-xs">(optional)</span>
														</FormLabel>

														<AddTags lang={lang} tagEnum={tagEnum} />

														{/* <FormMessage /> */}
													</FormItem>
												)}
											/>
										</>
									)}

									<div className="py-3 px-2 lg:px-3 flex items-center justify-between">
										{currStep !== 1 ? (
											<Button
												onClick={() => {
													if (currStep > 1) setCurrStep(currStep - 1);
													if (currStep === 1) setCurrStep(1);
												}}
											>
												<ArrowLeft />
												Back
											</Button>
										) : (
											<div></div>
										)}

										{currStep !== maxStep ? (
											<Button
												onClick={() => {
													if (currStep < maxStep) setCurrStep(currStep + 1);
													if (currStep === maxStep) setCurrStep(maxStep);
												}}
											>
												Next
												<ArrowRight />
											</Button>
										) : (
											<Button
												type="submit"
												onClick={(e) => form.handleSubmit(onSubmit(e))}
											>
												Submit
											</Button>
										)}
									</div>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}
