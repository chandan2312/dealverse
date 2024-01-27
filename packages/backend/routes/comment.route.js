import { Router } from "express";
import {
	addComment,
	editComment,
	deleteComment,
	getComment,
	getCommentList,
} from "../controllers/comment.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-comment").post(getComment);
router.route("/get-comment-list").post(getCommentList);

//secured Routes

router.route("/add-coupon").post(verifyJWT, addComment);
router.route("/edit-comment").post(verifyJWT, editComment);
router.route("/delete-comment").post(verifyJWT, deleteComment);

export default router;
