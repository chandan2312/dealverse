import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Deal } from "../models/deal.model.js";
import { Category } from "../models/category.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";
import { Tag } from "../models/tag.model.js";
import { Comment } from "../models/comment.model.js";

//--------------------------- addDeal ---------------------------//

export const addDeal = asyncHandler(async (req, res, next) => {
	const {
		title,
		link,
		description,
		images,
		offer,
		type,
		store,
		code,
		discountPrice,
		originalPrice,
		deliveryPrice,
		expiryDate,

		category,
		tags,
	} = await req.body;

	console.log(images);

	const currCategory = await Category.findById(category);

	const slug = `${slugify(tr(title)).slice(0, 50)}-${
		currCategory && currCategory.slug
	}`;

	const dealByTitle = await Deal.findOne({ title });

	if (dealByTitle) {
		return res
			.status(200)
			.json(new ApiResponse(500, "Title already taken. Change it"));
	}

	const tagIds = [];

	for (const tag of tags) {
		const tg = await Tag.findOne({ name: tag });
		if (tg) {
			tagIds.push(tg._id);
		} else {
			const newTag = await Tag.create({
				name: tag,
				slug: slugify(tr(tag)),
				user: req.user._id,
			});
			tagIds.push(newTag._id);
		}
	}

	try {
		const deal = await Deal.create({
			title,
			slug,
			link,
			description,
			images,
			offer,
			type,
			store: new mongoose.Types.ObjectId(store),
			code,
			discountPrice,
			originalPrice,
			deliveryPrice,
			expiryDate,

			category: new mongoose.Types.ObjectId(category),
			tags: tagIds,

			user: req.user._id,
		});

		return res
			.status(200)
			.json(new ApiResponse(200, "Deal Added Successfully", deal));
	} catch (error) {
		console.log(error.message);
		return res
			.status(200)
			.json(new ApiResponse(500, "Something went wrong", error.message));
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

async function populateNested(Model, path, doc) {
	if (!doc[path]) {
		return doc;
	}

	doc = await Model.populate(doc, {
		path: path,
		populate: {
			path: "replies",
			populate: {
				path: "user",
				select: "-password -refreshToken -ip4Address -ip6Address",
			},
		},
		populate: {
			path: "user",
		},
	});

	const promises = doc[path].map((subDoc) =>
		populateNested(Model, "replies", subDoc)
	);
	await Promise.all(promises);

	return doc;
}

//--------------------------- getDeal ---------------------------//

export const getDeal = asyncHandler(async (req, res, next) => {
	const {
		slug,
		id,
		includeCategory = true,
		includeTags = true,
		includeUser = true,
		includeStore = true,
		includeComments = true,
	} = await req.body;

	try {
		const deal = await Deal.findOne({
			...(slug && { slug }),
			...(id && { _id: mongoose.Types.ObjectId(id) }),
		})
			.populate(includeStore && "store")
			.populate(includeCategory && "category")
			.populate(includeTags && "tags")
			.populate(includeComments && "comments")
			// .populate(includeComments && "comments")
			.populate("user", "-password -refreshToken -ip4Address -ip6Address")
			.exec();

		// if (includeComments) {
		// 	await populateNested(Deal, "comments", deal);
		// }

		if (!deal) {
			throw new ApiError(400, "Error Finding Deal");
		}

		return res.status(200).json(new ApiResponse(200, "Store is Fetched", deal));
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, error.message, error));
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

		//populate
		populateUser = true,
		populateStore = true,
		populateTags = true,
		populateCategory = true,
		populateComments = true,

		//filters
		filterStores = [],
		filterCategories = [],
		filterPriceRange = [],
		filterHideExpired = false,
		filterUser = "",
		filterStore = "",
	} = await req.body;

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
		// ... other cases
		default:
			hotTabQuery = null;
	}

	let query = Deal.find();

	// ---------------- Populate --------------------

	if (populateUser) {
		query = query.populate("user");
	}

	if (populateStore) {
		query = query.populate("store");
	}

	if (populateTags) {
		query = query.populate("tags");
	}

	if (populateCategory) {
		query = query.populate("category");
	}

	if (populateComments) {
		query = query.populate("comments");
	}

	// ---------------- Filter --------------------

	if (filterStores.length > 0) {
		query = query.where("store").in(filterStores);
	}

	if (filterCategories.length > 0) {
		query = query.where("categories").in(filterCategories);
	}

	if (filterUser) {
		query = query.where("user", user);
	}

	if (filterStore) {
		query = query.where("store", store);
	}

	if (filterPriceRange.length > 0) {
		query = query
			.where("discountPrice")
			.gte(filterPriceRange[0])
			.lte(filterPriceRange[1] ? filterPriceRange[1] : 1000000);
	}

	if (filterHideExpired) {
		query = query.where("expiryDate").gte(currentTime);
	}

	if (hotTab && !searchTerm) {
		query = query.where("createdAt", hotTabQuery);
	}

	if (hotTab && searchTerm) {
		query = query
			.where("createdAt")
			.gte(new Date(new Date().setDate(new Date().getDate() - 30)));
	}

	if (hotTab) {
		query = query.where("views").gte(100);
	}

	if (searchTerm) {
		query = query.or([
			{ title: new RegExp(searchTerm, "i") },
			{ description: new RegExp(searchTerm, "i") },
		]);
	}

	if (hotTab) {
		query = query.sort({ views: -1 });
	}

	if (filterPriceRange.length) {
		query = query.sort({ discountPrice: sortOrder === "desc" ? -1 : 1 });
	}

	if (fieldsToInclude.length) {
		let projection = {};
		fieldsToInclude.forEach((field) => (projection[field] = 1));
		query = query.select(projection);
	}

	const deals = await query.exec();

	return res.status(200).json(new ApiResponse(200, "Deals are fetched", deals));
});

export const getDealComments = asyncHandler(async (req, res, next) => {
	const {
		dealId,
		slug,
		page = 1,
		limit = 10,
		sortBy = "createdAt",
		sortOrder = "asc",
	} = await req.body;

	try {
		const deal = await Deal.findOne({
			...(slug && { slug }),
			...(dealId && { _id: mongoose.Types.ObjectId(dealId) }),
		}).populate("comments");

		await populateNested(Deal, "comments", deal);

		return res
			.status(200)
			.json(new ApiResponse(200, "Comments are fetched", deal.comments));
	} catch (error) {
		console.log(error.message);
		return res.status(500).json(new ApiResponse(500, error.message, error));
	}
});
