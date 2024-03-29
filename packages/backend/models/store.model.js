import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Store Name is required"],
			trim: true,
			index: true,
			unique: true,
		},
		slug: {
			type: String,
			required: [true, "Store Name is required"],
			trim: true,
			index: true,
			unique: true,
		},
		description: {
			type: String,
			trim: true,
		},
		logo: {
			type: String,
			trim: true,
		},
		level: {
			type: String,
			enum: ["High", "Mid", "Low"],
			default: "Low",
			trim: true,
		},
		link: {
			type: String,
			trim: true,
		},
		linkCount: {
			type: Number,
			default: 0,
			trim: true,
		},
		affiliateLink: {
			type: String,
			trim: true,
		},
		affiliateLinkCount: {
			type: Number,
			default: 0,
			trim: true,
		},

		//count fields

		dealCount: {
			type: Number,
			default: 0,
			trim: true,
		},
		couponCount: {
			type: Number,
			default: 0,
			trim: true,
		},
		postCount: {
			type: Number,
			default: 0,
			trim: true,
		},
		discussionCount: {
			type: Number,
			default: 0,
			trim: true,
		},
		newsletterCount: {
			type: Number,
			default: 0,
			trim: true,
		},

		// Relational Fields

		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},

		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Store = mongoose.model("Store", storeSchema);
