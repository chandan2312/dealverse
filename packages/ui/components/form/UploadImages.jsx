"use client";

import React from "react";
import { Input } from "../ui/input";
import { useState } from "react";
import AlertCard from "../custom/AlertCard";
import { Button } from "../ui/button";
import axios from "axios";
import { keywords } from "../../constants/keywords";
import { Trash2 } from "lucide-react";
import { Image } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../store/slices/formSlice";
import { Upload } from "lucide-react";
import { Loader } from "lucide-react";

const UploadImages = ({ handleImages, lang, server }) => {
	const [localImages, setLocalImages] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [externalImageUrl, setExternalImageUrl] = useState("");
	const uploadedImages = useSelector((state) => state.form.images);

	const [uploadedProgress, setUploadedProgress] = useState(0);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const files = document.getElementById("files");

		console.log(files);

		const formData = new FormData();
		for (let i = 0; i < files.files.length; i++) {
			formData.append("files", files.files[i]);
		}
		formData.append("folder", "india");
		formData.append("subfolder", "temp");

		setIsUploading(true);

		const res = await axios.post(`${server}/api/v1/media/add-images`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		const response = res.data;
		if (response.statusCode === 200) {
			dispatch(addImage(...response.data));
			handleImages([...uploadedImages, ...response.data]);
		}

		setIsUploading(false);
	};

	const handleUploadByUrl = async (e) => {
		e.preventDefault();

		setIsUploading(true);

		const res = await axios.post(`${server}/api/v1/media/add-images-by-urls`, {
			imagesByUrls: [externalImageUrl],
			folder: "india",
			subfolder: "temp",
		});

		const response = res.data;
		if (response.statusCode === 200) {
			console.log(response.data);
			dispatch(addImage(...response.data));
		}

		setExternalImageUrl("");
		setIsUploading(false);
	};

	const handleDeleteImage = async (image) => {
		const selectedImg = uploadedImages.find(
			(img) => img.fileUrl === image.fileUrl
		);
		const newImages = uploadedImages.filter(
			(img) => img.fileUrl !== image.fileUrl
		);
		const res = await axios.post(`${server}/api/v1/media/delete-image`, {
			fileUrl: selectedImg.fileUrl,
		});

		const response = res.data;
		if (response.statusCode === 200) {
			dispatch(deleteImage(selectedImg.fileUrl));
		}
	};

	console.log("uploadedImages");
	console.log(uploadedImages);

	return (
		<>
			<div className="pt-4 font-semibold text-left  ">
				<Image />
				Upload Files
			</div>

			<div className=" bg-primary shadow-lg  p-2 border-2 my-4 md:mx-4 rounded-2xl">
				<div className=" w-full max-w-[550px] ">
					<form id="form" className="py-3 px-2" method="POST">
						{/* ------------------------------ By Files -------------------------- */}

						<div className="">
							<label className="block text-sm py-2  text-left ">File(s)</label>
							<div className="mb-3 grid-cols-12">
								<input
									accept=".png, .jpg, .jpeg, .webp, .svg"
									multiple={true}
									type="file"
									name="files"
									id="files"
									className="col-span-9 w-64"
									onChange={(e) => {
										setLocalImages([...localImages, e.target.files]);
									}}
								/>

								<Button
									onClick={handleSubmit}
									className={`col-span-2 hover:shadow-form px-1 rounded-md ${
										isUploading ? "bg-accent2" : "bg-accent"
									} px-2 text-center text-base font-semibold text-accent-foreground outline-none`}
								>
									{isUploading ? <Loader /> : <Upload />}
								</Button>
							</div>
						</div>

						{/* ------------------------------ By URL -------------------------- */}

						<div className="mb-2">
							<label for="email" className="text-sm py-2 block text-left">
								By URL
							</label>

							<div className="flex gap-1">
								<Input
									type="text"
									name="url"
									id="url"
									placeholder="https://example.com/image.png"
									onChange={(e) => setExternalImageUrl(e.target.value)}
									value={externalImageUrl}
									readOnly={isUploading}
									className="h-8"
								/>
								<Button
									size="sm"
									onClick={handleUploadByUrl}
									disabled={!externalImageUrl || !externalImageUrl.trim()}
									className="h-8 ml-2"
								>
									{isUploading ? <Loader /> : <Upload />}
								</Button>
							</div>
						</div>

						{/* ------------------------------  PREVIEW -------------------------- */}
						<div className="flex gap-2 flex-wrap">
							{uploadedImages.map((image, index) => {
								return (
									<div
										key={index}
										className="relative border p-2 rounded-lg w-24 h-24 md:col-span-3 lg:col-span-2 object-cover"
									>
										<div
											onClick={() => handleDeleteImage(image)}
											className="absolute top-1 right-1 cursor-pointer"
										>
											<Trash2 />
										</div>
										<img
											src={image.fileUrl}
											title={image.fileName}
											alt={image.fileName}
											className="object-cover rounded-md"
										/>

										<div>
											<span className="line-clamp-1 text-sm w-full text-center overflow-x-hidden">
												{image.fileName}
											</span>
											<span className="text-sm font-semibold block py-1 w-full text-center overflow-x-hidden">
												{image.fileSize}
											</span>
										</div>
									</div>
								);
							})}
						</div>

						{uploadedImages.length + localImages.length > 6 && (
							<AlertCard
								title="Limit Exceeded"
								variant="destructive"
								message="You can only upload 6 files at Most. Please try again."
							/>
						)}
					</form>
				</div>
			</div>

			{/* <div className='py-3'>

.
			</div> */}
		</>
	);
};

export default UploadImages;
