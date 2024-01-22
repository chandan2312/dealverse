import { Router } from "express";
import {
	addPost,
	editPost,
	deletePosts,
	getPost,
	getPostList,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-post").get(getPost);
router.route("/get-post-list").post(getPostList);

// secured routes

router
	.route("/add-post")
	.post(
		verifyJWT,
		upload.fields([{ name: "postPhotos", maxCount: 6 }]),
		addPost
	);
router
	.route("/edit-post")
	.patch(
		verifyJWT,
		upload.fields([{ name: "postPhotos", maxCount: 6 }]),
		editPost
	);
router.route("/delete-posts").delete(verifyJWT, deletePosts);

export default router;
