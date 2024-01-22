import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			index: true,
			maxlength: 500,
		},

		slug: {
			type: String,
			required: [true, "Slug is required"],
			trim: true,
			maxlength: 500,
		},

		body: {
			type: String,
			required: [true, "Content is required"],
			trim: true,
		},

		postPhotos: [
			{
				filename: { type: String },
				url: { type: String },
				alt: { type: String },
				size: { type: Number },
			},
		],

		postType: {
			type: String,
			enum: ["discussion", "post"],
			default: "discussion",
		},

		views: {
			type: Number,
			default: 0,
			trim: true,
		},

		upVotes: {
			type: Number,
			default: 0,
			trim: true,
		},
		status: {
			type: String,
			enum: [
				"draft",
				"pending",
				"published",
				"expired",
				"rejected",
				"trash",
				"spam",
			],

			default: "draft",
		},

		// Relational Fields

		comments: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Category",
				// required: true,
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		store: {
			type: Schema.Types.ObjectId,
			ref: "Store",
		},
	},
	{
		timestamps: true,
	}
);

export const Post = mongoose.model("Post", postSchema);
