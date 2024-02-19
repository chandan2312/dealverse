import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
		},

		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

export const Tag = mongoose.model("Tag", tagSchema);
