import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: [true, "Username is required"],
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		ip4Address: {
			type: String,
			trim: true,
		},
		ip6Address: {
			type: String,
			trim: true,
		},

		country: {
			type: String,
			trim: true,
			required: true,
		},
		fullName: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			index: true,
		},
		bio: {
			type: String,
			trim: true,
			default: "",
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			min: 6,
		},
		refreshToken: {
			type: String,
		},
		avatar: {
			type: String,
			trim: true,
			required: true,
		},
		totalLikes: {
			type: Number,
			default: 0,
		},
		role: {
			type: String,
			enum: ["user", "admin", "writer", "moderator", "robot"],
			default: "user",
		},
		isBanned: {
			type: Boolean,
			default: false,
		},

		//countFields

		dealsCount: {
			type: Number,
			default: 0,
		},

		commentsCount: {
			type: Number,
			default: 0,
		},

		postsCount: {
			type: Number,
			default: 0,
		},

		// Relational Fields

		savedDeals: {
			type: Schema.Types.ObjectId,
			ref: "Deal",
			default: [],
		},

		sharedDeals: {
			type: Schema.Types.ObjectId,
			ref: "Deal",
			default: [],
		},
	},

	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullName: this.fullName,
		},
		"chax123",
		{
			expiresIn: "1d",
		}
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		"chax123",
		{
			expiresIn: "7d",
		}
	);
};

export const User = mongoose.model("User", userSchema);
