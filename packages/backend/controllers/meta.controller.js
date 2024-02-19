import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Tag } from "../models/tag.model.js";
import { Category } from "../models/category.model.js";

import { transliterate as tr, slugify } from "transliteration";

export const addTag = asyncHandler(async (req, res, next) => {
	const { name } = req.body;

	//find existing tag

	const slug = slugify(tr(name));

	try {
		const tag = await Tag.create({
			name,
			slug,
			user: req.user._id,
		});

		res.status(200).json(new ApiResponse(200, "Tag Added", tag));
	} catch (error) {
		console.log(error.message);
		res
			.status(200)
			.json(new ApiResponse(500, `Something went wrong`, error.message));
	}
});

// ----------------------------- Add Category -----------------------------

export const addCategory = asyncHandler(async (req, res, next) => {
	const { name } = req.body;

	const slug = slugify(tr(name));
	try {
		const category = await Category.create({
			name,
			slug,
			user: req.user._id,
		});

		res.status(200).json(new ApiResponse(200, "Category Added", category));
	} catch (error) {
		console.log(error.message);
		res
			.status(200)
			.json(new ApiResponse(500, `Something went wrong`, error.message));
	}
});
