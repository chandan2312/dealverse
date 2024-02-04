import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
	console.log("🚨🚨🚨 Console");
	console.log(req.path);

	//for login and register routes
	if (req.url === "/login" || req.url === "/register") {
		try {
			const token =
				req.cookies?.accessToken ||
				req.header("Authorization")?.replace("Bearer ", "");
			if (!token) {
				next();
			}
			if (token) {
				const decodedToken = jwt.verify(token, "chax123");
				const user = await User.findById(decodedToken?._id).select(
					"-password -refreshToken"
				);
				if (!user) {
					next();
				} else {
					res.redirect("/dashboard");
				}
			}
		} catch (error) {
			console.log(error.message);
			throw new ApiError(401, error?.message || "Invalid access token");
		}
	} else {
		//for dashboard and other secured routes

		try {
			const token =
				req.cookies?.accessToken ||
				req.header("Authorization")?.replace("Bearer ", "");

			// console.log(token);
			if (!token) {
				//redirect to login
				res.redirect("/login");
			}

			const decodedToken = jwt.verify(token, "chax123");

			const user = await User.findById(decodedToken?._id).select(
				"-password -refreshToken"
			);
			if (!user) {
				//redirect to login
				res.redirect("/login");
			}
			req.user = user;
			next();
		} catch (error) {
			throw new ApiError(401, error?.message || "Invalid access token");
		}
	}
});
