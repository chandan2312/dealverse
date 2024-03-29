import { Router } from "express";
import { test } from "../controllers/test.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Store } from "../models/store.model.js";
import { Category } from "../models/category.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";

//--------------------------- addStore ---------------------------//
export const addStore = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		logo,
		category,
		link,
		affiliateLink = "",
		views = 0,

		dealCount = 0,
		couponCount = 0,
		postCount = 0,
		newsletterCount = 0,

		upvotes = 0,
	} = await req.body;

	const countFields = [dealCount, couponCount, postCount, newsletterCount];

	const countFieldsNotZero = countFields.find((field) => field !== 0);
	//check user role
	if (countFieldsNotZero && req.user.role !== "admin") {
		throw new ApiError(
			401,
			`You are not allowed to change ${countFieldsNotZero} field`
		);
	}

	if (req.user.role !== "admin" && affiliateLink) {
		throw new ApiError(401, `You are not allowed to add affiliateLink`);
	}

	const storeByName = await Store.findOne({
		name: { $regex: new RegExp(name, "i") },
	});

	if (storeByName) {
		return res.status(200).json(new ApiResponse(500, "Store is already added"));
	}

	const userId = req.user._id;
	console.log(userId);
	const slug = slugify(tr(name));

	try {
		const newStore = await Store.create({
			name,
			slug,
			description: JSON.stringify(description),
			logo,
			link,
			affiliateLink,
			category: new mongoose.Types.ObjectId(category),
			dealCount,
			couponCount,
			postCount,
			newsletterCount,
			upvotes,
			user: userId,
		});

		return res
			.status(200)
			.json(new ApiResponse(200, "New Store added", newStore));
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json(new ApiResponse(400, "Something went wrong", error.message));
	}
});

//--------------------------- editStore ---------------------------//
export const editStore = asyncHandler(async (req, res, next) => {
	const {
		id,
		name,
		slug,
		description,
		views,
		affiliateLink,
		website,
		social,

		dealCount,
		couponCount,
		postCount,
		newsletterCount,
		categories,

		user,
		upvotes = 0,
		createdAt,
		updatedAt,
	} = await req.body;

	//does user has created this store or user is admin

	if (!id) {
		throw new ApiError(400, "Please select Store to Edit");
	}

	const foundStore = await Store.findById(id);

	if (!foundStore) {
		throw new ApiError(400, "Store not found");
	}

	if (req.user.role !== "admin" || foundStore.user !== req.user._id) {
		throw new ApiError(401, "You are not allowed to edit this store");
	}

	if (
		req.user.role !== "admin" &&
		(foundStore.dealCount !== dealCount ||
			foundStore.couponCount !== couponCount ||
			foundStore.postCount !== postCount ||
			foundStore.newsletterCount !== newsletterCount)
	) {
		throw new ApiError(
			401,
			"You are not allowed to change dealCount, couponCount, postCount, newsletterCount"
		);
	}

	if (
		req.user.role !== "admin" &&
		!name &&
		!slug &&
		!description &&
		!views &&
		!website &&
		!social.length &&
		!categories.length
	) {
		throw new ApiError(400, "Please provide atleast one field to edit");
	}

	if (
		req.user.role === "admin" &&
		!name &&
		!slug &&
		!description &&
		!views &&
		!website &&
		!affiliateLink &&
		!social.length &&
		!categories.length &&
		!user &&
		!dealCount &&
		!couponCount &&
		!postCount &&
		!newsletterCount &&
		!upvotes &&
		!createdAt &&
		!updatedAt
	) {
		throw new ApiError(400, "Please provide atleast one field to edit");
	}

	try {
		const update = await Store.findByIdAndUpdate(
			id,
			{
				$set: {
					name,
					slug,
					description,
					views,
					website,
					affiliateLink,
					social,

					dealCount,
					couponCount,
					postCount,
					newsletterCount,
					categories,

					user,
					upvotes,
					createdAt,
					updatedAt,
				},
			},
			{ new: true }
		);

		return res.status(201).json(new ApiResponse(201, update, "Store updated"));
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, null, error.message));
	}
});

//--------------------------- deleteStores ---------------------------//
export const deleteStores = asyncHandler(async (req, res, next) => {
	const { idsToDelete, isPermanent } = await req.body;

	if (!idsToDelete.length) {
		throw new ApiError(400, "Please select Store to delete");
	}

	const foundStores = await Store.find({ _id: { $in: idsToDelete } });

	if (!foundStores.length) {
		throw new ApiError(400, "No Stores not found");
	}

	const invalidStore = foundStores.some((store) => {
		return (
			req.user.role !== "admin" ||
			store.user.toString() !== req.user._id.toString()
		);
	});

	if (invalidStore) {
		throw new ApiError(
			401,
			`You are not allowed to delete ${invalidStore.name} store`
		);
	}

	try {
		const deletedStores = await Store.deleteMany({ _id: { $in: idsToDelete } });
		console.log(deletedStores);

		return res
			.status(201)
			.json(new ApiResponse(201, deletedStores, "Store deleted"));
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, null, error.message));
	}
});

//--------------------------- getStore ---------------------------//
export const getStore = asyncHandler(async (req, res, next) => {
	const { slug } = await req.body;

	console.log("slug from store	controller", slug);

	try {
		const store = await Store.findOne({
			slug: slug,
		})
			.populate("category")
			.populate("user");

		if (!store) {
			return res.status(400).json(new ApiResponse(400, "store not found", null));
		}
		return res.status(200).json(new ApiResponse(200, "Store is Fetched", store));
	} catch (error) {
		console.log(error.message);
		return res
			.status(400)
			.json(new ApiResponse(400, "Erro finding the store", error.message));
	}
});

//--------------------------- getStoreList ---------------------------//
export const getStoreList = asyncHandler(async (req, res, next) => {
	const {
		page = 1,
		limit = 10,
		sortBy = "createdAt",
		level,
		sortOrder = "asc",
		searchTerm = "",
		fieldsToInclude = [],
		hotTab = false,
		views = 100,

		//filters
		filterCategories = [],

		//includes or not

		includeUserData = false,
		includeCategoriesData = false,
	} = await req.body;

	let currentTime = new Date();

	let hotTabQuery;
	switch (filterTime) {
		case "day":
			hotTabQuery = {
				$gte: new Date(new Date().setDate(new Date().getDate() - 1)),
			};
			break;

		case "yesterday":
			hotTabQuery = {
				$gte: new Date(new Date().setDate(new Date().getDate() - 2)),
				$lte: new Date(new Date().setDate(new Date().getDate() - 1)),
			};
			break;

		case "week":
			hotTabQuery = {
				$gte: new Date(new Date().setDate(new Date().getDate() - 7)),
			};
			break;

		case "month":
			hotTabQuery = {
				$gte: new Date(new Date().setDate(new Date().getDate() - 30)),
			};
			break;

		case "year":
			hotTabQuery = {
				$gte: new Date(new Date().setDate(new Date().getDate() - 365)),
			};
			break;
		case "2year":
			hotTabQuery = {
				$gte: new Date(new Date().setDate(new Date().getDate() - 365 * 2)),
			};
			break;
		default:
			hotTabQuery = null;
	}

	const pipeline = [
		// STAGE 1 - Match Stage
		{
			$match: {
				...(filterCategories.length > 0 && {
					categories: { $in: filterCategories },
				}),
				// if there is searchTerm, then it won't filter on date
				...(hotTab && !searchTerm && { createdAt: hotTabQuery }),
				...(hotTab && { views: { $gte: 100 } }),
				...(searchTerm && {
					$or: [
						{ title: { $regex: searchTerm, $options: "i" } },
						{ description: { $regex: searchTerm, $options: "i" } },
					],
				}),
			},
		},

		// STAGE 2 - Sort on Views (if hotTab)
		hotTab && {
			$sort: {
				views: -1,
			},
		},

		// STAGE 4 - project fields if the array is not empty

		fieldsToInclude.length && {
			$project: {
				_id: 1,
				...(fieldsToInclude.includes("name") && { name: 1 }),
				...(fieldsToInclude.includes("slug") && { slug: 1 }),
				...(fieldsToInclude.includes("description") && { description: 1 }),
				...(fieldsToInclude.includes("storeLogo") && { storeLogo: 1 }),
				...(fieldsToInclude.includes("level") && { level: 1 }),
				...(fieldsToInclude.includes("affiliateLink") && { affiliateLink: 1 }),
				...(fieldsToInclude.includes("website") && { website: 1 }),
				...(fieldsToInclude.includes("social") && { social: 1 }),
				...(fieldsToInclude.includes("level") && { level: 1 }),
				...(fieldsToInclude.includes("count") && { dealCount: 1 }),
				...(fieldsToInclude.includes("count") && { couponCount: 1 }),
				...(fieldsToInclude.includes("count") && { postCount: 1 }),
				...(fieldsToInclude.includes("count") && { discussionCount: 1 }),
				...(fieldsToInclude.includes("count") && { newsLetterCount: 1 }),

				//relational fields

				...(fieldsToInclude.includes("categories") && { categories: 1 }),
				...(fieldsToInclude.includes("user") && { user: 1 }),
			},
		},

		// STAGE 5 - Lookup  (if include...Data variable is true)

		includeCategoriesData && {
			$lookup: {
				from: "categories",
				localField: "categories",
				foreignField: "_id",
				as: "categories",
			},
		},

		includeUserData && {
			$lookup: {
				from: "users",
				localField: "user",
				foreignField: "_id",
				pipeline: [
					{
						$project: {
							password: 0,
							refreshToken: 0,
							ip4Address: 0,
							ip6Address: 0,
						},
					},
				],

				as: "user",
			},
		},
	];

	const stores = await Store.aggregate(pipeline.filter(Boolean));

	return res.status(200).json(new ApiResponse(200, stores, "Stores is Fetched"));
});
