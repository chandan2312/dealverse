import mongoose, { Schema } from "mongoose";

const badgeSchema = new Schema({
	name: {
		type: String,
		required: [true, "Badge Name is required"],
		trim: true,
		index: true,
		unique: true,
	},
	slug: {
		type: String,
		required: [true, "Badge Slug is required"],
		trim: true,
		unique: true,
	},
	description: {
		type: String,
		trim: true,
	},
	logo: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},

	//relational Fields

	users: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

export const Badge = mongoose.model("Badge", badgeSchema);
