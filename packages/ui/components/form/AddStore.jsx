"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import TextEditor from "../custom/TextEditor";
import { Upload } from "lucide-react";
import { set } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "../ui/command";
import { Check } from "lucide-react";
import { cn } from "../../utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addStore } from "../../store/slices/formSlice";

export default function AddStore({ lang, server }) {
	const dispatch = useDispatch();
	const formSchema = z.object({
		storeName: z.string().min(1, { message: "Name is required" }).max(50),
		storeLink: z.string().min(1, { message: "Link is required" }).max(100),
	});
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			storeName: "",
			storeLink: "",
		},
	});

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

	// -------------------- upload logo -------------------

	const [localImage, setLocalImage] = useState("");
	const [externalImage, setExternalImage] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [uploadedImage, setUploadedImage] = useState({});
	const addedStore = useSelector((state) => state.form.addedStore);
	const [selectedCategory, setSelectedCategory] = useState({});

	const handleUpload = async (e) => {
		e.preventDefault();
		setIsUploading(true);

		const file = document.getElementById("file");
		console.log(file.files[0]);
		const formData = new FormData();

		formData.append("files", file.files[0]);
		formData.append("folder", "india");
		formData.append("subfolder", "store");

		const res = await axios.post(`${server}/api/v1/media/add-images`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		const response = res.data;

		if (response.statusCode === 200) {
			setUploadedImage(response.data[0]);
		}

		setIsUploading(false);
	};

	// -------------------- upload logo by url -------------------

	console.log(externalImage);

	const handleUrlUpload = async (e) => {
		e.preventDefault();
		setIsUploading(true);

		const res = await axios.post(`${server}/api/v1/media/add-images-by-urls`, {
			imagesByUrls: [externalImage],
			folder: "india",
			subfolder: "store",
		});

		const response = res.data;

		if (response.statusCode === 200) {
			setUploadedImage(response.data[0]);
		} else {
			// show error
		}

		setExternalImage("");
		setIsUploading(false);
	};

	// -------------------- onsubmit -------------------

	const [content, setContent] = useState("");

	async function onSubmit(values) {
		const obj = {
			logo: uploadedImage.fileUrl,
			name: values.storeName,
			link: values.storeLink,
			description: content,
			category: selectedCategory.id,
		};
		console.log(obj);

		const res = await axios.post(`${server}/api/v1/store/add-store`, obj);
		const response = res.data;
		console.log(response);
		if (response.statusCode === 200) {
			toast(response.message, {
				description: `${response.data.name} || ${response.data.link}`,
			});

			dispatch(
				addStore({
					name: response.data.name,
					id: response.data._id,
				})
			);

			//close the popup
			setIsSubmitted(true);
		} else {
			toast(response.message, {
				description: `${response.data}`,
			});
		}
	}

	if (isSubmitted) {
		return (
			<div className="flex flex-col items-center justify-center p-2 w-full min-h-[60vh]">
				<div className="py-4 text-green-500 font-semibold">
					Store added successfully
				</div>
				<div className="py-2">close the popup</div>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2 overflow-y-scroll max-h-[100vh]"
			>
				<FormField
					control={form.control}
					name=""
					render={({ field }) => (
						<FormItem className="pt-1">
							<FormLabel>Logo</FormLabel>

							<div className=" grid grid-cols-12 gap-2 px-6 py-4 border border-slate-400 rounded-lg">
								<div className="col-span-3 w-full flex items-center justify-center">
									{uploadedImage?.fileUrl ? (
										<Image
											alt="add store"
											src={`${uploadedImage.fileUrl}`}
											width={48}
											height={48}
										/>
									) : (
										<Image
											alt="store logo"
											src={`https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png`}
											width={48}
											height={48}
										/>
									)}
								</div>
								<div className="col-span-9 w-full">
									<div className="flex gap-1">
										<Input
											type="file"
											accept=".png, .jpg, .jpeg, .webp, .svg"
											id="file"
											onChange={(e) => setLocalImage(e.target.value)}
											className=" border-2"
										/>
										<Button
											onClick={handleUpload}
											className={`text-sm ${isUploading && "bg-secondary"}`}
											size="sm"
										>
											{isUploading ? <Loader /> : <Upload />}
										</Button>
									</div>

									<div>
										<FormLabel className="text-xs">Upload by url</FormLabel>

										<FormControl>
											<div className="flex gap-1">
												<Input
													type="text"
													name="url"
													id="url"
													placeholder="https://example.com/amazon.png"
													onChange={(e) => setExternalImage(e.target.value)}
													value={externalImage}
													readOnly={isUploading}
													// {...field}
												/>
												<Button
													onClick={handleUrlUpload}
													className={`text-sm ${isUploading && "bg-secondary"}`}
													size="sm"
												>
													<Upload />
												</Button>
											</div>
										</FormControl>
									</div>
								</div>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="storeName"
					render={({ field }) => (
						<FormItem className=" flex  items-center gap-2">
							<FormLabel>Store Name</FormLabel>
							<FormControl>
								<Input placeholder="Amazon" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="storeLink"
					render={({ field }) => (
						<FormItem className="pt-1 flex items-center gap-2">
							<FormLabel>Website Link</FormLabel>
							<FormControl>
								<Input placeholder="https://amazon.com (official)" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name=""
					render={() => (
						<FormItem className="mt-1 flex items-center gap-2">
							<FormLabel>
								Category <span className="text-xs">*</span>
							</FormLabel>
							<Popover className="pt-1">
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between",
												!selectedCategory?._id && "text-muted-foreground"
											)}
										>
											{selectedCategory?.name || "Select Category"}
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
														setSelectedCategory(item);
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															item._id === selectedCategory._id ? "opacity-100" : "opacity-0"
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
						<FormItem className="pt-3">
							<FormLabel>
								About Store <span className="text-xs ">(optional)</span>
							</FormLabel>
							<FormControl>
								<ReactQuill
									modules={modules}
									theme="snow"
									placeholder="Write content here..."
									onChange={setContent}
									className="bg-primary text-primary-foreground my-6"
									// value={value}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <div className="grid grid-cols-12 gap-3">
					<FormField
						control={form.control}
						name="instagram"
						render={({ field }) => (
							<FormItem className="col-span-12 md:col-span-12 pt-3">
								<FormLabel>
									Instagram <span className="text-xs ">(optional)</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Placeholder" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="twitter"
						render={({ field }) => (
							<FormItem className="col-span-12 md:col-span-12  pt-3">
								<FormLabel>
									Twitter <span className="text-xs ">(optional)</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Placeholder" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="youtube"
						render={({ field }) => (
							<FormItem className="col-span-12 md:col-span-12  pt-3">
								<FormLabel>
									Youtube <span className="text-xs ">(optional)</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Placeholder" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div> */}
				<div className="flex justify-end">
					<Button className="fixed bottom-1 right-1" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}

const modules = {
	toolbar: [
		[{ font: [] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike"],
		[{ color: [] }, { background: [] }],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }, { align: [] }],
		["link", "image", "video"],
		["clean"],
	],
};
