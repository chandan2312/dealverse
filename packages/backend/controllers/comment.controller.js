import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";

//--------------------------- addComment ---------------------------//
export const addComment = asyncHandler(async (req, res, next) => {
	const { body, user, deal, post, newsletter } = await req.body;

	const requiredFields = ["body", "user"];
	const type = ["deal", "post", "newsletter"];

	const emptyField = requiredFields.find(
		(field) => !field || field.trim() === ""
	);

	if (!deal && !post && !newsletter) {
		throw new ApiError(400, `One of ${type} is required to attach comment`);
	}

	if (emptyField) {
		throw new ApiError(400, `${emptyField} is required`);
	}

	if (user) {
		const userExist = await User.findById(user);
		if (!userExist) {
			throw new ApiError(400, `User does not exist`);
		}

		if (userExist._id.toString() !== req.user._id.toString()) {
			throw new ApiError(
				400,
				`Different user is trying to add comment instead of ${req.user._id}`
			);
		}
	}

	try {
		const newComment = await Comment.create({
			body,
			replies,
			user,
			deal,
			post,
			newsletter,
		});

		if (!newComment) {
			throw new ApiError(400, `Comment not created`);
		}

		const apiResponse = new ApiResponse(
			201,
			newComment,
			"Comment created successfully"
		);

		return res
			.status(201)
			.json(new ApiResponse(200, newComment, "Comment Added Successfully"));
	} catch (error) {
		console.log(error.message);
		return res
			.status(201)
			.json(new ApiResponse(200, error.message, "Some Error in adding comment"));
		next(error);
	}
});

//--------------------------- editComment ---------------------------//
export const editComment = asyncHandler(async (req, res, next) => {
	const { id, body } = await req.body;

	if (!id) {
		throw new ApiError(400, "Please select Comment to Edit");
	}

	const existedComment = await Comment.findById(id);

	//check if comment exist
	//check if user is same as the one who created the comment
	//check if there is change in content of the comment

	if (!existedComment) {
		throw new ApiError(400, "Comment does not exist");
	}

	if (existedComment.user.toString() !== req.user._id.toString()) {
		throw new ApiError(400, "Different user is trying to edit comment");
	}

	if (body === existedComment.body) {
		throw new ApiError(400, "No Changes Made by User");
	}

	try {
		const editComment = await Comment.findByIdAndUpdate(id, {
			$set: {
				body,
				deal,
			},
            {
                new: true
            },
		});

        if (!editComment) {
            throw new ApiError(400, `Comment not edited`);
        }

        res.status(201).json(new ApiResponse(200, editComment, "Comment edited successfully"));
	} catch (error) {
		console.log(error.message);
		res
			.status(400)
			.json(new ApiError(400, error.message, "Some Error in editing comment"));
	}
});

//---------------------------deleteComment ---------------------------//
export const deleteComment = asyncHandler(async (req, res, next) => {

const { idsToDelete } = await req.body;

	if (!idsToDelete.length) {
		throw new ApiError(400, `Please select at least one comment to delete`);
	}

	try {

		const deletedComments = await Comment.deleteMany({ _id: { $in: idsToDelete } });

		if (!deletedComments.n) {
			throw new ApiError(400, "Comment is not found");
		}

		return res
			.status(201)
			.json(
				new ApiResponse(
					200,
					deletedComments,
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

//--------------------------- getComment ---------------------------//
export const getComment = asyncHandler(async (req, res, next) => {

    const { id } = await req.query;

    if(!id) {
        throw new ApiError(400, `Please select Comment to get`);
    }

	try {
		const comment = await Comment.aggregate(
			[
				{
					$match: {
						...(id && { _id: mongoose.Types.ObjectId(id) }),
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
				}
			].filter(Boolean)
		);

		if (!comment) {
			throw new ApiError(400, "Comment not found");
		}

		return res.status(200).json(new ApiResponse(200, comment, "Store is Fetched"));
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, null, error.message));
	}


});

//--------------------------- getCommentList ---------------------------//
export const getCommentList = asyncHandler(async (req, res, next) => {

const {
		page = 1,
		limit = 10,
		sortBy = "createdAt", //mostReplies
		searchTerm = "",

	} = await req.body;


	const pipeline = [
		// STAGE 1 - Match Stage
		{
			$match: {
				...(filterCategories.length > 0 && {
					categories: { $in: filterCategories },
				}),
				// if there is searchTerm, then it won't filter on date
				...(searchTerm && {
					$or: [
						{ body: { $regex: searchTerm, $options: "i" } }	],
				}),
			},
		},

		// STAGE 5 - Lookup  (if include...Data variable is true)

{
			$lookup: {
				from: "comments",
				localField: "replies",
				foreignField: "_id",
				as: "replies",
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
	];

	const comments = await Comment.aggregate(pipeline.filter(Boolean));

	return res.status(200).json(new ApiResponse(200, comments, "Comments List is Fetched"));


});
