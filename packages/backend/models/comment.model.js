import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
	{
		body: {
			type: String,
		},

		upVotes: {
			type: Number,
		},

		downVotes: {
			type: Number,
		},
		replies: {
			type: Schema.Type.ObjectId,
			ref: "Comment",
		},

		// Relational Fields

		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		deal: {
			type: Schema.Types.ObjectId,
			ref: "Deal",
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
		newsletter: {
			type: Schema.Types.ObjectId,
			ref: "Newsletter",
		},
	},
	{
		timestamps: true,
	}
);

export const Comment = mongoose.model("Comment", commentSchema);
