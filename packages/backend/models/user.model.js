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
		fullName: {
			type: String,
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
		verificationCode: {
			code: {
				type: Number,
				trim: true,
				max: 99999,
				min: 10000,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
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
		},

		bio: {
			type: String,
			trim: true,
			default: "",
		},
		password: {
			type: String,
			min: 6,
		},
		method: {
			type: String,
			enum: ["EMAIL", "GOOGLE"],
			default: "EMAIL",
		},
		refreshToken: {
			type: String,
		},
		avatar: {
			type: String,
			trim: true,
		},
		totalLikes: {
			type: Number,
			default: 0,
		},
		plan: {
			type: {
				type: String,
				enum: ["FREE", "PREMIUM", "ULTIMATE"],
				default: "FREE",
			},
			expiryDate: {
				type: Date,
			},
			createAt: {
				type: Date,
				default: Date.now,
			},
		},

		payments: [
			{
				amount: {
					type: Number,
					default: 0,
				},
				paymentId: {
					type: String,
					trim: true,
				},
				paymentMethod: {
					type: String,
					enum: ["STRIPE", "PAYPAL"],
					trim: true,
				},
				status: {
					type: String,
					enum: ["PENDING", "SUCCESS", "FAILED"],
					default: "PENDING",
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
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

		votedDeals: [
			{
				dealId: {
					type: Schema.Types.ObjectId,
					ref: "Deal",
				},
				voteType: {
					type: String,
					enum: ["up", "down", null],
				},
			},
		],

		savedDeals: [
			{
				type: Schema.Types.ObjectId,
				ref: "Deal",
			},
		],

		sharedDeals: {
			type: Schema.Types.ObjectId,
			ref: "Deal",
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
		},
		process.env.COOKIE_SECRET,
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
		process.env.COOKIE_SECRET,
		{
			expiresIn: "7d",
		}
	);
};

export const User = mongoose.model("User", userSchema);
