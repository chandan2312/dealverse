import mongoose, { Schema } from "mongoose";

const dealSchema = new Schema(
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
			trim: true,
			maxlength: 500,
			unique: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		dealPhotos: [
			{
				path: { type: String, required: true },
				size: { type: Number, required: true },
				alt: { type: String },
				originalName: { type: String },
			},
		],
		type: {
			type: String,
			enum: ["Deal", "Coupon"],
			required: true,
		},
		code: {
			type: String,
			maxlength: 25,
			trim: true,
		},
		offer: {
			type: String,
			maxlength: 25,
			trim: true,
		},
		views: {
			type: Number,
			default: 0,
			trim: true,
		},
		discountPrice: {
			type: Number,
			required: [true, "Offer Price is required"],
			trim: true,
		},
		originalPrice: {
			type: Number,
			trim: true,
		},
		userLink: {
			type: String,
			required: [true, "Link is required (Offer Page Link)"],
			trim: true,
		},
		affiliateLink: {
			type: String,
			trim: true,
		},
		deliveryPrice: {
			type: Number,
			trim: true,
			default: 0,
		},
		expiryDate: {
			type: Date,
			default: new Date("2050-01-01"),
			trim: true,
		},
		upVotes: {
			type: Number,
			default: 0,
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

		//relational fields

		store: {
			type: Schema.Types.ObjectId,
			ref: "Store",
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		comments: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Category",
			},
		],
	},
	{
		timestamps: true,
	}
);

dealSchema.pre("save", async function (next) {
	const currentUser = await mongoose
		.model("User")
		.findById(this.user)
		.select("isBanned");

	if (currentUser && currentUser.isBanned) {
		const error = new Error("Cannot create a deal for a banned user");
		return next(error);
	}

	//else
	next();
});

export const Deal = mongoose.model("Deal", dealSchema);
