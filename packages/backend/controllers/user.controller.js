import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { ip, ipv6, mac } from "address";
import sendEmail from "../utils/SendEmail.js";
import { keywords } from "../../ui/constants/keywords.js";
import { verificationCodeTempalte } from "../../ui/constants/template.js";

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

export const registerUser = asyncHandler(async (req, res, next) => {
	console.log(await req.body);
	const { fullName, email, username, password } = await req.body;

	//---------------- if email already exist -----------------//

	try {
		const existedUserByEmail = await User.findOne({ email }).select(
			"-password -__v -refreshToken -ip4Address -ip6Address "
		);

		if (existedUserByEmail) {
			if (existedUserByEmail.method !== "EMAIL") {
				return res
					.status(400)
					.json(
						new ApiResponse(
							400,
							`Email Already Registered with ${existedUserByEmail.method}.`,
							null
						)
					);
			}

			if (!existedUserByEmail.isEmailVerified) {
				// add verification code and send email again

				existedUserByEmail.verificationCode = {
					code: Math.floor(10000 + Math.random() * 90000),
					createdAt: new Date(),
				};
				await existedUserByEmail.save({ validateBeforeSave: false });

				try {
					const htmlTemplate = verificationCodeTempalte(existedUserByEmail, true);
					const emailRes = await sendEmail(
						existedUserByEmail.email,
						keywords.verifyYourAccount[process.env.LANG],
						htmlTemplate
					);

					if (emailRes?.response.includes("OK")) {
						const userDetails = {
							id: existedUserByEmail._id,
							fullName: existedUserByEmail.fullName,
							// avatar: existedUserByEmail.avatar,
							email: existedUserByEmail.email,
							username: existedUserByEmail.username,
							createAt: existedUserByEmail.createdAt,
							updatedAt: existedUserByEmail.updatedAt,
						};

						return res
							.status(202)
							.json(
								new ApiResponse(
									202,
									"Verification Code Sent.\nThe email is already registered but not verified",
									userDetails
								)
							);
					} else {
						return res
							.status(400)
							.json(new ApiResponse(400, "Verification Email not Sent. Try Again"));
					}
				} catch (error) {
					console.log(error.message);
					return res
						.status(400)
						.json(new ApiResponse(400, "Verification Email not Sent"));
				}
			}

			return res
				.status(400)
				.json(new ApiResponse(400, "Email Already Registered. Login", null));
		}
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, error.message));
	}

	//---------------- if email by username already exist -----------------//

	try {
		const existedUserByUsername = await User.findOne({
			username: username.toLowerCase(),
		});

		if (existedUserByUsername) {
			return res
				.status(400)
				.json(new ApiResponse(400, "Username already exist", null));
		}
	} catch (error) {
		console.log(error.message);
		return res.status(400).json(new ApiResponse(400, error.message));
	}

	//check ip
	const ip4Address = ip();
	const ip6Address = ipv6();
	console.log(ip4Address, ip6Address);

	// 5 digit verification code
	const code = Math.floor(10000 + Math.random() * 90000);

	//create user
	const user = await User.create({
		fullName,
		email,
		password,
		username: username.toLowerCase(),
		ip4Address,
		ip6Address,
		verificationCode: {
			code,
			createdAt: new Date(),
		},
	});

	if (!user) {
		return res.status(500).json(new ApiResponse(500, "something went wrong"));
	}
	console.log("user is registered successfully");

	try {
		const htmlTemplate = verificationCodeTempalte(user, false);
		const emailRes = await sendEmail(
			user.email,
			keywords.verifyYourAccount[process.env.LANG],
			htmlTemplate
		);

		if (emailRes?.response.includes("OK")) {
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
				.json(new ApiResponse(200, "Verification code sent to email", userDetails));
		} else {
			return res
				.status(400)
				.json(new ApiResponse(400, "Verification Email not Sent. Try Again"));
		}
	} catch (error) {
		console.log(error.message);
		return res
			.status(400)
			.json(new ApiResponse(400, "Verification Email not Sent"));
	}
});

//---------------------------- authGoogle --------------------------//

export const authGoogle = asyncHandler(async (req, res, next) => {
	const { credentialResponse, action } = req.body;

	if (!credentialResponse) {
		return res
			.status(400)
			.json(new ApiResponse(400, "Something went Wrong", null));
	}

	try {
		//decode token
		const decodedUser = jwtDecode(credentialResponse.credential);

		const existedUserByEmail = await User.findOne({ email: decodedUser.email });

		if (existedUserByEmail) {
			if (existedUserByEmail.method !== "GOOGLE") {
				existedUserByEmail.method = "GOOGLE";
			}
			if (!existedUserByEmail?.avatar) {
				existedUserByEmail.avatar = decodedUser.picture;
			}

			if (!existedUserByEmail.isEmailVerified) {
				existedUserByEmail.isEmailVerified = true;
			}

			await existedUserByEmail.save({ validateBeforeSave: false });

			// generate tokens
			const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
				existedUserByEmail._id
			);

			const options = {
				httpOnly: true,
				secure: true,
			};

			const userDetails = {
				_id: existedUserByEmail._id,
				fullName: existedUserByEmail.fullName,
				email: existedUserByEmail.email,
				username: existedUserByEmail.username,
				createAt: existedUserByEmail.createdAt,
				updatedAt: existedUserByEmail.updatedAt,
			};

			if (action === "login") {
				return res
					.status(200)
					.cookie("accessToken", accessToken, options)
					.cookie("refreshToken", refreshToken, options)
					.json(
						new ApiResponse(200, "✅ User Logged In Successfully.", userDetails)
					);
			} else {
				return res
					.status(200)
					.cookie("accessToken", accessToken, options)
					.cookie("refreshToken", refreshToken, options)
					.json(
						new ApiResponse(200, "✅  User is already Registered.", userDetails)
					);
			}
		}

		let username = decodedUser.email.split("@")[0];

		const existedUserByUsername = await User.findOne({
			username: username.toLowerCase(),
		});

		//append a number to username if already exist
		if (existedUserByUsername) {
			const randomNumber = Math.floor(Math.random() * 100); // 0 - 99
			username = `${username}_${randomNumber}`;
		}

		//check ip
		const ip4Address = ip();
		const ip6Address = ipv6();
		console.log(ip4Address, ip6Address);

		//create user
		const user = await User.create({
			fullName: decodedUser.name,
			email: decodedUser.email,
			avatar: decodedUser.picture,
			method: "GOOGLE",
			username: username.toLowerCase(),
			ip4Address,
			ip6Address,
			isEmailVerified: true,
		});
		if (!user) {
			return res.status(500).json(new ApiResponse(500, "something went wrong"));
		}

		console.log("user is registered successfully");

		//generate tokens

		const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
			user._id
		);

		//to show to users
		const userDetails = {
			_id: user._id,
			fullName: user.fullName,
			avatar: user?.avatar,
			email: user.email,
			username: user.username,
			createAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
		console.log(userDetails);

		const options = {
			httpOnly: true,
			secure: true,
		};

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json(new ApiResponse(200, "Registered Successfully", userDetails));
	} catch (error) {
		console.log(error);
		return res.status(500).json(new ApiResponse(500, error.message, error));
	}
});

//---------------------------- loginUser --------------------------//

export const loginUser = asyncHandler(async (req, res, next) => {
	const { email, username, password } = await req.body;

	const user = await User.findOne({
		// $or: [{ email }],
		email: email,
	}).select("-password -refreshToken -ip4Address -ip6Address -__v ");
	if (!user) {
		return res
			.status(200)
			.json(new ApiResponse(400, "Invalida Username or Email"));
	}

	if (!user.isEmailVerified) {
		user.verificationCode = {
			code: Math.floor(10000 + Math.random() * 90000),
			createdAt: Date.now(),
		};

		user.save({ validateBeforeSave: false });

		try {
			const htmlTemplate = verificationCodeTempalte(user, true);
			const emailRes = await sendEmail(
				user.email,
				keywords.verifyYourAccount[process.env.LANG],
				htmlTemplate
			);

			if (emailRes?.response.includes("OK")) {
				return res
					.status(202)
					.json(
						new ApiResponse(
							202,
							"Email is not verified, Verification code sent to email",
							user
						)
					);
			} else {
				return res
					.status(400)
					.json(new ApiResponse(400, "Verification Email not Sent. Try Again"));
			}
		} catch (error) {
			console.log(error);
			return res
				.status(400)
				.json(new ApiResponse(400, "Verification Email not Sent"));
		}
	}

	if (user.method !== "EMAIL") {
		return res
			.status(400)
			.json(new ApiResponse(400, `Please use ${user.method} to login`));
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
		.json(new ApiResponse(200, "Logged In Successfully", userDetails));
});

//---------------------------- verifyOtp --------------------------//

export const verifyOtp = asyncHandler(async (req, res) => {
	const { email, otp } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json(new ApiResponse(400, "User not found"));
		}

		if (
			user?.verificationCode == undefined ||
			user?.verificationCode?.code == undefined
		) {
			return res
				.status(400)
				.json(new ApiResponse(400, "Invalid code or Already Used"));
		}

		console.log("user.verificationCode.code");
		console.log(user.verificationCode);
		console.log("code");
		console.log(otp);

		if (user.verificationCode.code != otp) {
			return res.status(400).json(new ApiResponse(400, "Invalid OTP"));
		}

		//check if the code is expired (30 min)

		const currentTime = new Date();
		const codeTime = new Date(user.verificationCode.createdAt);
		const diff = currentTime - codeTime;
		const minutes = Math.floor(diff / 60000);

		if (minutes > 30) {
			return res
				.status(400)
				.json(new ApiResponse(400, "Code is expired\nTry again"));
		}

		user.isEmailVerified = true;
		user.verificationCode = undefined;

		await user.save({ validateBeforeSave: false });

		const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
			user._id
		);

		const userDetails = {
			id: user._id,
			fullName: user.fullName,
			email: user.email,
			username: user.username,
		};

		const options = {
			httpOnly: true,
			secure: true,
		};

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json(new ApiResponse(200, "Email Verified & Logged in", userDetails));
	} catch (error) {
		console.log(error);
		return res.status(400).json(new ApiResponse(400, error.message, error));
	}
});

//---------------------------- tokenChecker --------------------------//

export const tokenChecker = asyncHandler(async (req, res) => {
	const token =
		req.cookies?.accessToken ||
		req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res.status(200).json(new ApiResponse(200, false));
	}
	return res.status(200).json(new ApiResponse(200, true));
});

//---------------------------- logoutUser --------------------------//

export const logoutUser = asyncHandler(async (req, res, next) => {
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
			.json(new ApiResponse(200, "User logged Out"));
	} catch (error) {
		console.log(error.message);
		return res.status(401).json(new ApiResponse(400, error.message));
	}
});

//---------------------------- refreshAccessToken --------------------------//

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
	const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

	if (!incomingToken) {
		throw new ApiError(400, "Unauthorized Request");
	}

	const decodedToken = jwt.verify(incomingToken, process.env.COOKIE_SECRET);

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

export const changeCurrentPassword = asyncHandler(async (req, res) => {
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

export const getCurrentUser = asyncHandler(async (req, res) => {
	const user = await req.user;

	if (!user) {
		return res.status(201).json(new ApiResponse(401, "User not found", null));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, "User fetched successfully", user));
});

//---------------------------- updateProfileDetails --------------------------//

export const updateProfileDetails = asyncHandler(async (req, res) => {
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

export const updateUserAvatar = asyncHandler(async (req, res) => {
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
