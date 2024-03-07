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
			trim: true,
		},
		images: [
			{
				fileName: { type: String },
				fileUrl: { type: String, required: true },
				fileSize: { type: Number },
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
			trim: true,
		},
		originalPrice: {
			type: Number,
			trim: true,
		},
		link: {
			type: String,
			required: [true, "Link is required (Offer Page Link)"],
			trim: true,
		},
		linkCount: {
			type: Number,
			default: 0,
		},
		affiliateLink: {
			type: String,
			trim: true,
		},
		affiliateLinkCount: {
			type: Number,
			default: 0,
		},
		linkClickHistory: {
			last: {
				type: String,
				enum: ["USER", "OUR", null],
			},
			secondLast: {
				type: String,
				enum: ["USER", "OUR", null],
			},
			thirdLast: {
				type: String,
				enum: ["USER", "OUR", null],
			},
		},
		deliveryPrice: {
			type: Number,
			trim: true,
			default: 0,
		},
		expiryDate: {
			type: Date,
			// default: new Date("2050-01-01"),
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
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
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
