import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { User } from "../models/user.model.js";

const isBanned = asyncHandler(async (req, res, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(token, "chax123");

		const user = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);

		if (!user) {
			throw new ApiError(401, "Invalid Access Token");
		}

		if (user.isBanned) {
			throw new ApiError(401, "Sorry, you are restricted");
		}
		next();
	} catch (error) {
		console.log(error.message);
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});
