import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";
import { Deal } from "../models/deal.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

//--------------------------- addComment ---------------------------//
export const addComment = asyncHandler(async (req, res, next) => {
	const { docId, type, body, parent } = await req.body;

	try {
		const newComment = await Comment.create({
			body,
			[type]: docId,
			user: req.user._id,
			parent: parent,
		});

		if (!newComment) {
			return res.status(500).json(new ApiResponse(500, "Comment Not Added", null));
		}

		// add to deal or post

		if (!parent) {
			const Model = type === "deal" ? Deal : Post;
			await Model.findByIdAndUpdate(docId, {
				$push: { comments: newComment._id },
			});
		}

		// add to parent comment

		if (parent) {
			await Comment.findByIdAndUpdate(parent, {
				$push: { replies: newComment._id },
			});

			// const parentComment = await Comment.findById(parent);
			// if (!parentComment) {
			// 	return res
			// 		.status(400)
			// 		.json(new ApiResponse(400, "Parent Comment not found", null));
			// }

			// if (parentComment?.replies?.length === 0) {
			// 	parentComment.replies = [newComment._id];
			// } else {
			// 	parentComment.replies.push(newComment._id);
			// }
			// await parentComment.save();
		}

		// increase comment count of user

		const user = await User.findByIdAndUpdate(req.user._id, {
			$inc: { commentsCount: 1 },
		});

		return res
			.status(200)
			.json(new ApiResponse(200, "Comment Added Successfully", newComment));
	} catch (error) {
		console.log(error);
		return res.status(400).json(new ApiResponse(400, error.message, error));
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
		const editComment = await Comment.findByIdAndUpdate(
			id,
			{
				$set: {
					body,
					deal,
				},
			},
			{
				new: true,
			}
		);

		if (!editComment) {
			throw new ApiError(400, `Comment not edited`);
		}

		res
			.status(201)
			.json(new ApiResponse(200, editComment, "Comment edited successfully"));
	} catch (error) {
		console.log(error.message);
		res
			.status(400)
			.json(new ApiError(400, error.message, "Some Error in editing comment"));
	}
});

// nested comments delete recursively

async function deleteNestedComments(
	commentIds,
	currUserId,
	deletedComments = [],
	deletedReplies = [],
	userDeletedComments = []
) {
	const commentsToDelete = await Comment.find({ _id: { $in: commentIds } });

	const replyIdsToDelete = commentsToDelete.flatMap(
		(comment) => comment.replies
	);

	if (replyIdsToDelete.length > 0) {
		await deleteNestedComments(
			replyIdsToDelete,
			deletedComments,
			deletedReplies,
			userDeletedComments
		);
	}

	// if comment has not parent id, mean it is the parent, so delete from deal or post
	const parentComments = commentsToDelete.filter((comment) => !comment.parent);

	for (let comment of parentComments) {
		if (comment.deal) {
			await Deal.findByIdAndUpdate(comment.deal, {
				$pull: { comments: comment._id },
			});
		} else if (comment.post) {
			await Post.findByIdAndUpdate(comment.post, {
				$pull: { comments: comment._id },
			});
		}
	}

	// Filter comments by user's ID
	const userCommentsToDelete = commentsToDelete.filter(
		(comment) => comment.user.toString() === currUserId.toString()
	);
	userDeletedComments.push(
		...userCommentsToDelete.map((comment) => comment._id)
	);

	await Comment.deleteMany({ _id: { $in: commentIds } });

	deletedComments.push(...commentsToDelete.map((comment) => comment._id));
	deletedReplies.push(...replyIdsToDelete);

	return { deletedComments, deletedReplies, userDeletedComments };
}

//---------------------------deleteComment ---------------------------//
export const deleteComments = asyncHandler(async (req, res, next) => {
	const { idsToDelete } = await req.body;

	if (!idsToDelete?.length) {
		return res
			.status(204)
			.json(new ApiResponse(204, "No Comments to delete", null));
	}

	try {
		const filter =
			req.user.role !== "admin"
				? { _id: { $in: idsToDelete }, user: req.user._id }
				: { _id: { $in: idsToDelete } };

		const currUserId = req.user._id;

		const { deletedComments, deletedReplies, userDeletedComments } =
			await deleteNestedComments(idsToDelete, currUserId);

		console.log("userDeletedComments", userDeletedComments);

		if (!deletedComments.length) {
			return res
				.status(204)
				.json(new ApiResponse(204, "No Comments to delete", null));
		}

		// Remove deleted comments from parent comments
		await Comment.updateMany(
			{ replies: { $in: deletedReplies } },
			{ $pull: { replies: { $in: deletedReplies } } }
		);

		// Delete from deal or post
		//done in deleteNestedComments fn

		// Decrease count of comments on user model
		await User.findByIdAndUpdate(req.user._id, {
			$inc: { commentsCount: -userDeletedComments.length },
		});

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					`${deletedComments?.length} Comments permanently deleted successfully`,
					deletedComments
				)
			);
	} catch (error) {
		console.log(error);
		return res.status(500).json(new ApiResponse(500, error?.message, error));
	}
});

//--------------------------- getComment ---------------------------//
export const getComment = asyncHandler(async (req, res, next) => {
	const { id } = await req.query;

	if (!id) {
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
				},
			].filter(Boolean)
		);

		if (!comment) {
			throw new ApiError(400, "Comment not found");
		}

		return res
			.status(200)
			.json(new ApiResponse(200, comment, "Store is Fetched"));
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
					$or: [{ body: { $regex: searchTerm, $options: "i" } }],
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

	return res
		.status(200)
		.json(new ApiResponse(200, comments, "Comments List is Fetched"));
});
