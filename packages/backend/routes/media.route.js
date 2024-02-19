import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
	addImages,
	addImagesByUrls,
	deleteImage,
	getImages,
} from "../controllers/media.controller.js";

const router = Router();

router.route("/get-images").get(getImages);
router.route("/add-images").post(verifyJWT, upload.array("files"), addImages);

router.route("/add-images-by-urls").post(verifyJWT, addImagesByUrls);
router.route("/delete-image").post(verifyJWT, deleteImage);

export default router;
