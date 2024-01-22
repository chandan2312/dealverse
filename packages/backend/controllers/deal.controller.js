import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Deal } from "../models/deal.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";

//--------------------------- addDeal ---------------------------//

export const addDeal = asyncHandler(async (req, res, next) => {
	const {
		title,
		slug,
		description,
		dealPhotos,
		type,
		code,
		offer,
		discountPrice,
		originalPrice,
		userLink,
		deliveryPrice,
		expiryDate,
		views,
		user,
	} = await req.body;

	const requiredFields = [
		"title",
		"description",
		"discountPrice",
		"userLink",
		"type",
	];

	const emptyField = requiredFields.find(
		(field) => !field || field.trim() === ""
	);

	if (emptyField) {
		throw new ApiError(400, `${emptyField} is required`);
	}

	const dealByTitle = await Deal.findOne({ title });

	if (dealByTitle) {
		throw new ApiError(400, "Title already taken. Use another title");
	}
	const dealGallery = req.files.dealPhotos.map((photo, index) => {
		console.log(photo);
		return {
			path: `${photo.path.replace("public", "")}`,
			size: photo.size,
			alt: `${title} - ${index + 1}`,
			originalName: photo.originalname,
			type: photo.mimetype
				.replace("image/", "")
				.replace("video/", "")
				.replace("audio/", ""),
		};
	});

	try {
		const deal = await Deal.create({
			title,
			slug,
			description,
			dealPhotos: dealGallery,
			type,
			code,
			offer,
			discountPrice,
			originalPrice,
			userLink,
			deliveryPrice,
			expiryDate,
			views,
			user,
		});

		return res
			.status(201)
			.json(new ApiResponse(200, deal, "Deal Added Successfully"));
	} catch (error) {
		console.log(error.message);
		return next(
			new ApiError(500, error.message || "Something went wrong while adding Deal")
		);
	}
});

//--------------------------- editDeal ---------------------------//

export const editDeal = asyncHandler(async (req, res, next) => {
	const {
		id,
		title,
		slug,
		description,
		type,
		code,
		offer,
		discountPrice,
		originalPrice,
		userLink,
		deliveryPrice,
		expiryDate,
		categories,
		//admin fields
		views,
		affiliateLink,
		upVotes,
		status,
		comments,
	} = await req.body;

	console.log(await req.body);

	if (!id) {
		throw new ApiError(400, "Please select Deal to Edit");
	}

	if (
		req.user.role !== "admin" &&
		!title &&
		!slug &&
		!description &&
		!discountPrice &&
		!originalPrice &&
		!userLink &&
		!deliveryPrice &&
		!expiryDate &&
		!type &&
		!code &&
		!offer
	) {
		throw new ApiError(400, `nothing to update`);
	}

	//const findDeal

	const currentDeal = await Deal.findById(id);

	if (!currentDeal) {
		throw new ApiError(400, "Deal you want to edit is not available");
	}

	if (
		currentDeal.user.toString() !== req.user._id.toString() ||
		req.user.role !== "admin"
	) {
		throw new ApiError(400, "You dont have access to edit this");
	}

	if (
		req.user.role !== "admin" &&
		(currentDeal.views !== views ||
			currentDeal.affiliateLink !== affiliateLink ||
			currentDeal.upVotes !== upVotes ||
			currentDeal.status !== status ||
			currentDeal.comments.length !== comments.length)
	) {
		throw new ApiError(
			400,
			"You are changing something that you are not allowed to"
		);
	}

	try {
		const updateDeal = await Deal.findByIdAndUpdate(
			id,
			{
				$set: {
					title,
					slug,
					description,
					type,
					code,
					offer,
					discountPrice,
					originalPrice,
					userLink,
					deliveryPrice,
					expiryDate,
					categories,
					//admin fields
					views,
					affiliateLink,
					upVotes,
					status,
					comments,
				},
			},
			{ new: true }
		);

		return res
			.status(201)
			.json(new ApiResponse(202, updateDeal, "Deal Update Successfully"));
	} catch (error) {
		console.log(error.message);
		return next(
			new ApiError(
				500,
				error.message || "Something went wrong while updating Deal"
			)
		);
	}
});

//--------------------------- deleteDeals ---------------------------//

export const deleteDeals = asyncHandler(async (req, res, next) => {
	const { idsToDelete, isPermanent } = await req.body;

	if (!idsToDelete.length) {
		throw new ApiError(400, `Please select at least one offer to delete`);
	}

	const foundDeals = await Deal.find({ _id: { $in: idsToDelete } });

	if (!foundDeals.length) {
		throw new ApiError(400, "No Stores not found");
	}

	const invalidDeal = foundDeals.some((deal) => {
		return (
			req.user.role !== "admin" || deal.user.toString() !== req.user._id.toString()
		);
	});

	if (inValidStore) {
		throw new ApiError(
			401,
			`You are not allowed to delete "${invalidStore.title}" deal`
		);
	}

	try {
		if (!isPermanent) {
			const archivedDeals = await Deal.updateMany(
				{ _id: { $in: idsToDelete } },
				{ $set: { status: "trash" } }
			);

			return res
				.status(201)
				.json(new ApiResponse(200, archivedDeals, "Deals Archived Successfully"));
		}

		const deletedDeals = await Deal.deleteMany({ _id: { $in: idsToDelete } });

		if (!deletedDeals) {
			throw new ApiError(400, "Deals is not found");
		}

		return res
			.status(201)
			.json(
				new ApiResponse(
					200,
					deletedDeals,
					"Offers Permanently Deleted Successfully"
				)
			);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			message: error.message || "Something went wrong while deleting Offer",
		});
	}
});

//--------------------------- getDeal ---------------------------//

export const getDeal = asyncHandler(async (req, res, next) => {
	const { slug, id } = await req.query;

	try {
		const deal = await Deal.aggregate(
			[
				{
					$match: {
						...(slug && { slug }),
						...(id && { _id: mongoose.Types.ObjectId(id) }),
					},
				},
				{
					$lookup: {
						from: "categories",
						localField: "categories",
						foreignField: "_id",
						as: "categories",
					},
				},
				{
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
				{
					$lookup: {
						from: "stores",
						localField: "store",
						foreignField: "_id",
						as: "user",
					},
				},
			].filter(Boolean)
		);

		if (!store) {
			throw new ApiError(400, "Store not found");
		}

		return res.status(200).json(new ApiResponse(200, deal, "Store is Fetched"));
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, null, error.message));
	}
});

//--------------------------- getDealList ---------------------------//

export const getDealList = asyncHandler(async (req, res, next) => {
	const {
		page = 1,
		limit = 10,
		sortBy = "createdAt",
		sortOrder = "asc",
		searchTerm = "",
		fieldsToInclude = [],
		hotTab = false,
		filterTime = "week", // day, yesterday, week, month, year
		views = 100,

		//filters
		filterStores = [],
		filterCategories = [],
		filterPriceRange = [],
		filterHideExpired = false,
		filterUser = "",
		filterStore = "",

		//includes or not

		includeUserData = false,
		includeStoreData = false,
		includeCategoriesData = false,
		includeCommentsData = false,

		categoriesFieldsToInclude = [],
		storeFieldsToInclude = [],
		userFieldsToExclude = [],
		commentFieldsToInclude = [],

		categoriesCountOnly = false,
		storeCountOnly = false,
		userCountOnly = false,
		commentCountOnly = false,
	} = await req.body;

	console.log(req.body);

	let currentTime;
	if (filterHideExpired) {
		currentTime = new Date();
	}

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
		default:
			hotTabQuery = null;
	}

	const pipeline = [
		// STAGE 1 - Match Stage
		{
			$match: {
				...(filterStores.length > 0 && { store: { $in: filterStores } }),
				...(filterCategories.length > 0 && {
					categories: { $in: filterCategories },
				}),
				...(filterUser && { user: user }),
				...(filterStore && { store: store }),
				...(filterPriceRange.length > 0 && {
					discountPrice: {
						$gte: filterPriceRange[0],
						$lte: filterPriceRange[1] ? filterPriceRange[1] : 1000000,
					},
				}),
				...(filterHideExpired && { expiryDate: { $gte: currentTime } }),
				// if there is searchTerm, then it won't filter on date
				...(hotTab && !searchTerm && { createdAt: hotTabQuery }),
				...(hotTab &&
					searchTerm && {
						createdAt: {
							$gte: new Date(new Date().setDate(new Date().getDate() - 30)),
						},
					}),
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

		// STAGE 3 - Sort on Price (if priceRange Filter)
		filterPriceRange.length && {
			$sort: {
				discountPrice: sortOrder === "desc" ? -1 : 1,
			},
		},

		// STAGE 4 - project fields if the array is not empty

		fieldsToInclude.length && {
			$project: {
				_id: 1,
				...(fieldsToInclude.includes("title") && { title: 1 }),
				...(fieldsToInclude.includes("slug") && { slug: 1 }),
				...(fieldsToInclude.includes("description") && { description: 1 }),
				...(fieldsToInclude.includes("dealPhotos") && { dealPhotos: 1 }),
				...(fieldsToInclude.includes("views") && { views: 1 }),
				...(fieldsToInclude.includes("discountPrice") && { discountPrice: 1 }),
				...(fieldsToInclude.includes("originalPrice") && { originalPrice: 1 }),
				...(fieldsToInclude.includes("userLink") && { userLink: 1 }),
				...(fieldsToInclude.includes("affiliateLink") && { affiliateLink: 1 }),
				...(fieldsToInclude.includes("deliveryPrice") && { deliveryPrice: 1 }),
				...(fieldsToInclude.includes("expiryDate") && { expiryDate: 1 }),
				...(fieldsToInclude.includes("upVotes") && { upVotes: 1 }),
				...(fieldsToInclude.includes("status") && { status: 1 }),
				...(fieldsToInclude.includes("createdAt") && { createdAt: 1 }),
				...(fieldsToInclude.includes("updatedAt") && { updatedAt: 1 }),

				//relational fields

				...(fieldsToInclude.includes("store") && { store: 1 }),
				...(fieldsToInclude.includes("categories") && { categories: 1 }),
				...(fieldsToInclude.includes("user") && { user: 1 }),
				...(fieldsToInclude.includes("comments") && { comments: 1 }),
			},
		},

		// STAGE 5 - Lookup Store (if include...Data variable is true)

		includeStoreData &&
			!storeCountOnly && {
				$lookup: {
					from: "stores",
					localField: "store",
					foreignField: "_id",
					as: "store",
				},
			},

		includeCategoriesData &&
			!categoriesCountOnly && {
				$lookup: {
					from: "categories",
					localField: "categories",
					foreignField: "_id",
					as: "categories",
				},
			},

		includeUserData &&
			!userCountOnly && {
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

		includeCommentsData &&
			!commentCountOnly && {
				$lookup: {
					from: "comments",
					localField: "comments",
					foreignField: "_id",
					as: "comments",
				},
			},

		// STAGE 6 - Counts Only  (if ...CountOnly true)
	];

	const deals = await Deal.aggregate(pipeline.filter(Boolean));

	return res.status(200).json(new ApiResponse(200, deals, "Deal is Fetched"));
});
