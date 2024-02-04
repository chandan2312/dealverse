import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ip, ipv6, mac } from "address";

const generateAccessAndRefereshTokens = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			error.message || "Something went wrong while generating tokens"
		);
	}
};

//---------------------------- registerUser --------------------------//

const registerUser = asyncHandler(async (req, res, next) => {
	console.log(await req.body);
	const { fullName, email, username, password, website } = await req.body;

	//check user in db if exist
	try {
		const existedUserByEmail = await User.findOne({ email });
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, error.message));
	}

	try {
		const existedUserByUsername = await User.findOne({
			username: username.toLowerCase(),
		});
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, error.message));
	}

	//check ip
	const ip4Address = ip();
	const ip6Address = ipv6();
	console.log(ip4Address, ip6Address);

	//create user
	const user = await User.create({
		fullName,
		email,
		password,
		username: username.toLowerCase(),
		website,
		ip4Address,
		ip6Address,
	});
	if (!user) {
		return res.status(500).json(new ApiResponse(500, "something went wrong"));
	}
	console.log("user is registered successfully");
	//to show to users
	const userDetails = {
		id: user._id,
		fullName: user.fullName,
		// avatar: user.avatar,
		email: user.email,
		username: user.username,
		createAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
	console.log(userDetails);

	return res
		.status(200)
		.json(new ApiResponse(200, "User registered Successfully", userDetails));
});

//---------------------------- loginUser --------------------------//

const loginUser = asyncHandler(async (req, res, next) => {
	const { email = "", username = "", password } = await req.body;

	const user = await User.findOne({
		// $or: [{ email }],
		email: email,
	});
	if (!user) {
		return res
			.status(200)
			.json(new ApiResponse(400, "Invalida Username or Email"));
	}

	const isMatch = await user.isPasswordCorrect(password);
	if (!isMatch) {
		return res.status(200).json(new ApiResponse(400, "InValid Password"));
	}

	const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
		user._id
	);

	const userDetails = {
		id: user._id,
		fullName: user.fullName,
		email: user.email,
		username: user.username,
		website: user.website,
	};

	//save cookies

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: userDetails,
					accessToken,
					refreshToken,
				},
				"Logged In Successfully"
			)
		);
});

//---------------------------- tokenChecker --------------------------//

const tokenChecker = asyncHandler(async (req, res) => {
	const token =
		req.cookies?.accessToken ||
		req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res.status(200).json(new ApiResponse(200, false));
	}
	return res.status(200).json(new ApiResponse(200, true));
});

//---------------------------- logoutUser --------------------------//

const logoutUser = asyncHandler(async (req, res, next) => {
	try {
		await User.findByIdAndUpdate(
			req.user._id,
			{
				$unset: {
					refreshToken: 1, // this removes the field from document
				},
			},
			{
				new: true,
			}
		);

		const options = {
			httpOnly: true,
			secure: true,
		};

		return res
			.status(200)
			.clearCookie("accessToken", options)
			.clearCookie("refreshToken", options)
			.set("Location", "/login")
			.json(new ApiResponse(200, "User logged Out"));
	} catch (error) {
		console.log(error.message);
		return res.status(401).json(new ApiResponse(400, error.message));
	}
});

//---------------------------- refreshAccessToken --------------------------//

const refreshAccessToken = asyncHandler(async (req, res, next) => {
	const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

	if (!incomingToken) {
		throw new ApiError(400, "Unauthorized Request");
	}

	const decodedToken = jwt.verify(incomingToken, "chax123");

	const user = await User.findById(decodedToken?._id);

	if (!user) {
		throw new ApiError(400, "Invalid Token");
	}

	console.log(incomingToken);
	console.log(user?.refreshToken);

	if (incomingToken !== user?.refreshToken) {
		throw new ApiError(401, "Refresh token is expired or used");
	}

	const options = {
		httpOnly: true,
		secure: true,
	};

	const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
		user._id
	);

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, "Login Refreshed Successfully"));
});

//---------------------------- changeCurrentPassword --------------------------//

const changeCurrentPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	const user = await User.findById(req.user?._id);
	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

	if (!isPasswordCorrect) {
		throw new ApiError(400, "Invalid old password");
	}

	if (oldPassword === newPassword) {
		throw new ApiError(400, "new password is used before, please try another");
	}

	user.password = newPassword;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Password changed successfully"));
});

//---------------------------- getCurrentUser --------------------------//

const getCurrentUser = asyncHandler(async (req, res) => {
	const user = req.user;
	return res
		.status(200)
		.json(new ApiResponse(200, user, "User fetched successfully"));
});

//---------------------------- updateProfileDetails --------------------------//

const updateProfileDetails = asyncHandler(async (req, res) => {
	const { fullName, email, bio } = req.body;

	console.log(fullName);

	if (!fullName && !email && !bio) {
		throw new ApiError(400, "Something required to update");
	}

	const user = await User.findByIdAndUpdate(
		req.user?._id,
		{
			$set: {
				fullName,
				email,
				bio,
				isEmailVerified: email === req.user.email ? true : false,
			},
		},
		{ new: true }
	).select("-password");

	return res
		.status(200)
		.json(new ApiResponse(200, user, "Account details updated successfully"));
});

//---------------------------- updateUserAvatar --------------------------//

const updateUserAvatar = asyncHandler(async (req, res) => {
	const avatarLocalPath = req.file?.path;

	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar file is missing");
	}

	//TODO: delete old image - assignment

	if (!avatar.url) {
		throw new ApiError(400, "Error while uploading on avatar");
	}

	const user = await User.findByIdAndUpdate(
		req.user?._id,
		{
			$set: {
				avatar: avatar.url,
			},
		},
		{ new: true }
	).select("-password");

	return res
		.status(200)
		.json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

export {
	registerUser,
	loginUser,
	tokenChecker,
	logoutUser,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentUser,
	updateProfileDetails,
	updateUserAvatar,
};
