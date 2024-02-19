import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
	if (!req?.cookies?.accessToken) {
		res.status(200).json(new ApiResponse(401, "Please Login First", null));
	}

	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			res.status(200).json(new ApiResponse(401, "No Authorized User", null));
		}

		const decodedToken = jwt.verify(token, process.env.COOKIE_SECRET);

		const user = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);
		if (!user) {
			res.redirect("/login");
		}
		req.user = user;

		next();
	} catch (error) {
		res.status(200).json(new ApiResponse(401, "No Authorized User", null));
	}
	// 	}
});
