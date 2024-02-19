import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";
import fs from "fs";
import { Storage } from "@google-cloud/storage";

export const addImages = asyncHandler(async (req, res) => {
	const __dirname = path.resolve();
	const storage = new Storage({
		keyFilename: path.join(__dirname, "../../storage.json"),
		projectId: "coupon-website-main",
	});
	const bucket = storage.bucket("mediaa");

	try {
		let uploadedData = [];
		if (req.files.length) {
			const uploadedPromises = req.files.temp.map(async (file) => {
				const localFilePath = file.path;

				const randomSuffix = Math.floor(Math.random() * 1000000);
				const extension = file.mimetype.split("/")[1];
				const rawFilename = file.filename.split(".")[0];
				console.log(rawFilename);
				const newFilename = `${req.body.folder}/${req.body.subfolder}/${rawFilename}_${randomSuffix}.${extension}`;

				const fileUpload = bucket.file(newFilename);

				uploadedData.push({
					filename: `https://storage.googleapis.com/mediaa/${req.body.folder}/${
						req.body.subfolder
					}/${fileUpload.name.split("/").pop()}`,
					size: file.size,
				});

				const stream = fileUpload.createWriteStream({
					metadata: {
						contentType: file.mimetype,
					},
				});

				const localFileStream = fs.createReadStream(localFilePath);
				localFileStream.pipe(stream);

				return new Promise((resolve, reject) => {
					stream.on("finish", () => {
						fs.unlink(localFilePath, (err) => {
							if (err) {
								console.error(`Error deleting local file: ${err}`);
								reject(err);
							} else {
								resolve();
							}
						});
					});
					stream.on("error", reject);
				});
			});

			const result = await Promise.all(uploadedPromises);
		}

		res.status(200).json(new ApiResponse(200, "Files uploaded", uploadedData));
	} catch (error) {
		console.log(error);
		res.status(500).json(new ApiError(500, "Error", error));
	}
});
