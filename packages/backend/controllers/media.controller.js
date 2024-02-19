import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";
import axios from "axios";
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import mime from "mime-types";

export const addImages = asyncHandler(async (req, res, next) => {
	try {
		const __dirname = path.resolve();
		const storage = new Storage({
			keyFilename: path.join(__dirname, "../../storage.json"),
			projectId: "coupon-website-main",
		});
		const bucket = storage.bucket("mediaa");

		const uploadedData = [];

		await Promise.all(
			req.files.map(async (item) => {
				let extension = item.mimetype.split("/")[1];
				const randomSuffix = Math.floor(Math.random() * 1000000);
				const rawFilename = item.filename
					.replace(".jpeg", "")
					.replace(".jpg", "")
					.replace(".png", "")
					.replace(".webp", "")
					.replace(".svg", "")
					.replace(".ico", "");
				console.log(rawFilename);
				const newFilename = `${req.body.folder}/${req.body.subfolder}/${rawFilename}_${randomSuffix}.${extension}`;
				const fileUpload = await bucket.file(newFilename);

				uploadedData.push({
					fileUrl: `https://storage.googleapis.com/mediaa/${req.body.folder}/${
						req.body.subfolder
					}/${fileUpload.name.split("/").pop()}`,
					fileSize: item.size,
					fileName: fileUpload.name.split("/").pop(),
				});

				const stream = fileUpload.createWriteStream({
					metadata: {
						contentType: `${item.mimetype}`,
					},
				});

				const localFileStream = fs.createReadStream(item.path);
				localFileStream.pipe(stream);

				const streamFinished = await new Promise((resolve, reject) => {
					stream.on("finish", () => {
						try {
							if (fs.existsSync(item.path)) {
								fs.unlinkSync(item.path);
							}
							resolve();
						} catch (err) {
							console.error(`Error deleting local file: ${err}`);
							reject(err);
						}
					});
					stream.on("error", reject);
				});

				await streamFinished;
			})
		);

		if (uploadedData.length) {
			res.status(200).json(new ApiResponse(200, "Files uploaded", uploadedData));
		} else {
			res.status(200).json(new ApiResponse(500, "Files Upload Error"));
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json(new ApiError(500, `${error.message}`, error.message));
	}
});

export const addImagesByUrls = asyncHandler(async (req, res, next) => {
	try {
		let urls = req.body.imagesByUrls;

		console.log(urls);

		const __dirname = path.resolve();
		const storage = new Storage({
			keyFilename: path.join(__dirname, "../../storage.json"),
			projectId: "coupon-website-main",
		});
		const bucket = storage.bucket("mediaa");

		const uploadedData = [];

		const upload = await urls.map(async (url) => {
			try {
				const response = await axios.get(url, { responseType: "arraybuffer" });
				const imageData = Buffer.from(response.data, "binary");
				let extension = await mime.lookup(url);
				extension = extension.split("/")[1];

				const size = Buffer.byteLength(imageData, "binary");

				// let extension = url.split(".").pop();
				const randomSuffix = Math.floor(Math.random() * 1000000);
				let rawFilename = url.split("/").pop().split(".")[0];
				if (req.body.title) {
					rawFilename = slugify(tr(req.body.title));
				}
				if (req.body.name) {
					rawFilename = slugify(tr(req.body.name));
				}
				const newFilename = `${req.body.folder}/${req.body.subfolder}/${rawFilename}_${randomSuffix}.${extension}`;
				const fileUpload = bucket.file(newFilename);

				uploadedData.push({
					fileUrl: `https://storage.googleapis.com/mediaa/${req.body.folder}/${
						req.body.subfolder
					}/${fileUpload.name.split("/").pop()}`,
					fileSize: size,
					fileName: fileUpload.name.split("/").pop(),
				});

				const stream = await fileUpload.createWriteStream({
					metadata: {
						contentType: `image/${extension}`,
					},
				});

				await stream.end(imageData);

				await new Promise((resolve, reject) => {
					stream.on("finish", resolve);
					stream.on("error", reject);
				});

				res.status(200).json(new ApiResponse(200, "Files uploaded", uploadedData));
			} catch (error) {
				console.error(`Error uploading image from URL ${url}: ${error}`);
				return null;
			}
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json(new ApiError(500, `${error.message}`, error.message));
	}
});

export const deleteImage = asyncHandler(async (req, res, next) => {
	const __dirname = path.resolve();
	const storage = new Storage({
		keyFilename: path.join(__dirname, "../../storage.json"),
		projectId: "coupon-website-main",
	});
	const bucket = storage.bucket("mediaa");

	const deleteData = [];

	console.log(req.body);

	const filename = req.body.fileUrl.replace(
		"https://storage.googleapis.com/mediaa/",
		""
	);

	console.log(filename);

	const file = bucket.file(filename);
	const [exists] = await file.exists();

	if (exists) {
		await file.delete();
		deleteData.push(filename);
		res.status(200).json(new ApiResponse(200, "Files deleted", deleteData));
	} else {
		res.status(404).json(new ApiError(404, "File not found", "File not found"));
	}
});

export const getImages = asyncHandler(async (req, res, next) => {});
