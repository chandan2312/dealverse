import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const editAccess = asyncHandler(async (req, res, next) => {
	console.log(req.user);
	console.log(req.body);
	try {
		const id = req.body.id || req.body._id || req.body.idsToEdit[0];
		const slug = req.body.slug || req.body.slugsToEdit[0];

		if (
			req.user._id.toString() !== req.body.user.toString() ||
			req.user._id.toString() !== "admin"
		) {
			throw new ApiError(401, "Unauthorized request");
		}
		next();
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});
