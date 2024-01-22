import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";

//--------------------------- addDeal ---------------------------//

export const addPost = asyncHandler(async (req, res, next) => {
	const {
		title,
		slug,
		body,
		postPhotos,
		postType = "discussion",
		categories = [],
		comments,
		user,
		store = "",
		status,
		views,
		upvotes,
		updatedAt,
	} = await req.body;

	const requiredFields = ["title", "slug", "body"];

	const emptyField = requiredFields.find(
		(field) => !field || field.trim() === ""
	);

	if (emptyField) {
		throw new ApiError(400, `${emptyField} is required`);
	}

	const postBySlug = await Post.findOne({ slug });

	if (postBySlug) {
		throw new ApiError(400, "Post is already published. Change to other");
	}

	const gallery = req.files.postPhotos.map((single, index) => {
		console.log(single);
		return {
			path: `${single.path.replace("public", "")}`,
			size: single.size,
			alt: `${title} - ${index + 1}`,
			originalName: single.originalname,
			type: single.mimetype
				.replace("image/", "")
				.replace("video/", "")
				.replace("audio/", ""),
		};
	});

	try {
		const newPost = await Post.create({
			title,
			slug,
			body,
			postPhotos: gallery,
			postType,
			categories,
			user,
			store,
			status,
			views,
			upvotes,
			updatedAt,
		});

		return res
			.status(201)
			.json(
				new ApiResponse(200, newPost, `${newPost.postType} Added Successfully`)
			);
	} catch (error) {
		console.log(error.message);
		return next(
			new ApiError(500, error.message || "Something went wrong while adding Deal")
		);
	}
});

//--------------------------- editDeal ---------------------------//

export const editPost = asyncHandler(async (req, res, next) => {
	const {
		id,
		title,
		slug,
		body,
		postType,
		categories,
		user,
		store,
		status,
		views,
		upvotes,
		updatedAt,
	} = await req.body;

	console.log(await req.body);

	if (!id) {
		throw new ApiError(400, "Please select Deal to Edit");
	}

	if (
		!title &&
		!slug &&
		!body &&
		!postType &&
		!categories &&
		!user &&
		!store &&
		!status &&
		!views &&
		!upvotes &&
		!updatedAt
	) {
		throw new ApiError(400, `nothing to update`);
	}

	try {
		const postUpdate = await Post.findByIdAndUpdate(
			id,
			{
				$set: {
					title,
					slug,
					body,
					postType,
					categories,
					user,
					store,
					status,
					views,
					upvotes,
					updatedAt,
				},
			},
			{ new: true }
		);

		return res
			.status(201)
			.json(new ApiResponse(202, postUpdate, "Deal Update Successfully"));
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

//--------------------------- deletePosts ---------------------------//

export const deletePosts = asyncHandler(async (req, res, next) => {
	const { idsToEdit, isPermanent } = await req.body;

	if (!idsToEdit.length) {
		throw new ApiError(400, `Please select at least one offer to delete`);
	}

	try {
		if (!isPermanent) {
			const archivedPosts = await Post.updateMany(
				{ _id: { $in: idsToEdit } },
				{ $set: { status: "trash" } }
			);

			return res
				.status(201)
				.json(new ApiResponse(200, archivedPosts, "Offers Archived Successfully"));
		}

		const deletedPosts = await Deal.deleteMany({ _id: { $in: idsToEdit } });

		if (!deletedPosts) {
			throw new ApiError(400, "Post is not found");
		}

		return res
			.status(201)
			.json(
				new ApiResponse(200, deletedPosts, `Post/Discussion Permanently Deleted`)
			);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			message: error.message || "Something went wrong while deleting Offer",
		});
	}
});

//--------------------------- getPost ---------------------------//

export const getPost = asyncHandler(async (req, res, next) => {
	const { slug, id } = await req.query;

	const post = await Post.findOne({ $or: [{ slug }, { _id: id }] });

	if (!post) {
		throw new ApiError(400, "Post not found");
	}

	return res.status(200).json(new ApiResponse(200, deal, "Post is Fetched"));
});

//--------------------------- getPostList ---------------------------//

export const getPostList = asyncHandler(async (req, res, next) => {
	const {
		page = 1,
		limit = 10,
		sortBy = "createdAt",
		sortOrder = "asc",
		searchTerm = "",
		fieldsToInclude = [],
		hotTab = false,
		filterTime = "year", // day, yesterday, week, month, year, 2years
		views = 100,
		postType = "discussion",

		//filters
		filterStores = [],
		filterCategories = [],
		filterUser = "",

		//includes or not

		includeUserData = false,
		includeStoreData = false,
		includeCategoriesData = false,
		includeCommentsData = false,

		categoriesFieldsToInclude = [],
		storeFieldsToInclude = [],
		commentFieldsToInclude = [],
		userFieldsToExclude = [],

		categoriesCountOnly = false,
		storeCountOnly = false,
		userCountOnly = false,
		commentCountOnly = false,
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
				...(filterStores.length > 0 && { store: { $in: filterStores } }),
				...(filterCategories.length > 0 && {
					categories: { $in: filterCategories },
				}),
				...(filterUser && { user: user }),
				...(filterStore && { store: store }),
				// if there is searchTerm, then it won't filter on date
				...(hotTab && !searchTerm && { createdAt: hotTabQuery }),
				...(hotTab &&
					searchTerm && {
						createdAt: {
							$gte: new Date(new Date().setDate(new Date().getDate() - 365)),
						},
					}),
				...(hotTab && { views: { $gte: 100 } }),
				...(searchTerm && {
					$or: [
						{ title: { $regex: searchTerm, $options: "i" } },
						{ description: { $regex: searchTerm, $options: "i" } },
					],
				}),
				...(postType && { postType: postType }),
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
				...(fieldsToInclude.includes("title") && { title: 1 }),
				...(fieldsToInclude.includes("slug") && { slug: 1 }),
				...(fieldsToInclude.includes("body") && { description: 1 }),
				...(fieldsToInclude.includes("postPhotos") && { dealPhotos: 1 }),
				...(fieldsToInclude.includes("views") && { views: 1 }),
				...(fieldsToInclude.includes("postType") && { discountPrice: 1 }),
				...(fieldsToInclude.includes("upVotes") && { originalPrice: 1 }),
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

		// STAGE 5 - Lookup  (if include...Data variable is true)

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

	const posts = await Post.aggregate(pipeline.filter(Boolean));

	return res
		.status(200)
		.json(new ApiResponse(200, deals, "Posts/Discussion is Fetched"));
});
