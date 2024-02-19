import { Router } from "express";
import {
	addComment,
	editComment,
	deleteComments,
	getComment,
	getCommentList,
} from "../controllers/comment.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-comment").post(getComment);
router.route("/get-comment-list").post(getCommentList);

//secured Routes

router.route("/add-comment").post(verifyJWT, addComment);
router.route("/edit-comment").post(verifyJWT, editComment);
router.route("/delete-comments").post(verifyJWT, deleteComments);

export default router;
