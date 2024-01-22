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
	const { fullName, email, username, password, country } = await req.body;

	const requiredFields = [
		"fullName",
		"email",
		"username",
		"password",
		"country",
		"avatar",
		"bio",
	];
	const emptyField = requiredFields.find(
		(field) => !field || field.trim() === ""
	);

	if (emptyField) {
		throw new ApiError(400, `${emptyField} is required`);
	}

	//check user in db if exist
	const existedUserByEmail = await User.findOne({ email });
	if (existedUserByEmail) {
		throw new ApiError(400, "Email already taken. Use another email");
	}
	const existedUserByUsername = await User.findOne({
		username: username.toLowerCase(),
	});

	if (existedUserByUsername) {
		throw new ApiError(400, "Username already taken. Use another username");
	}

	//avatar store
	console.log(req.files);
	const avatarLocalPath = req.files?.avatar[0]?.path.replace("public", "");
	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar file is required");
	}

	console.log(avatarLocalPath);

	//check ip
	const ip4Address = ip();
	const ip6Address = ipv6();
	console.log(ip4Address, ip6Address);

	//create user
	const user = await User.create({
		fullName,
		avatar: avatarLocalPath,
		email,
		password,
		username: username.toLowerCase(),
		country,
		ip4Address,
		ip6Address,
	});
	if (!user) {
		throw new ApiError(500, "Something went wrong while registering the user");
	}
	console.log("user is registered successfully");
	//to show to users
	const userDetails = {
		id: user._id,
		fullName: user.fullName,
		avatar: user.avatar,
		email: user.email,
		username: user.username,
		country: user.country,
	};
	console.log(userDetails);

	return res
		.status(201)
		.json(new ApiResponse(200, userDetails, "User registered Successfully"));
});

//---------------------------- loginUser --------------------------//

const loginUser = asyncHandler(async (req, res, next) => {
	const { email, username, password } = await req.body;

	if (!username && !email) {
		throw new ApiError(400, "username or email is required");
	}
	if (!password) {
		throw new ApiError(400, "Password is required");
	}

	const user = await User.findOne({
		$or: [{ email }, { username: username.toLowerCase() }],
	});
	if (!user) {
		throw new ApiError(400, "Invalid email or username");
	}

	const isMatch = await user.isPasswordCorrect(password);
	if (!isMatch) {
		throw new ApiError(400, "Invalid Password");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
		user._id
	);

	const userDetails = {
		id: user._id,
		fullName: user.fullName,
		avatar: user.avatar,
		email: user.email,
		username: user.username,
		country: user.country,
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
				"User logged In Successfully"
			)
		);
});

//---------------------------- logoutUser --------------------------//

const logoutUser = asyncHandler(async (req, res, next) => {
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
		.json(new ApiResponse(200, {}, "User logged Out"));
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

//---------------------------- getUser --------------------------//

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
	logoutUser,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentUser,
	updateProfileDetails,
	updateUserAvatar,
};
