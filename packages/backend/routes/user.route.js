import { Router } from "express";
import {
	loginUser,
	tokenChecker,
	logoutUser,
	registerUser,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentUser,
	updateProfileDetails,

	// updateUserAvatar,
	// updateUserCoverImage,
	// getUserChannelProfile,
	// getWatchHistory,
} from "../controllers/user.controller.js";

// import { test } from "../controllers/test.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/token-checker").post(tokenChecker);

// //secured routes
// router.route("/test").get(test);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateProfileDetails);

// router
// 	.route("/avatar")
// 	.patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
// router
// 	.route("/cover-image")
// 	.patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
// router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
