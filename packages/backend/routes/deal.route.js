import { Router } from "express";
import {
	addDeal,
	editDeal,
	deleteDeals,
	getDeal,
	getDealList,
	getDealComments,
} from "../controllers/deal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-deal").post(getDeal);
router.route("/get-deal-list").post(getDealList);
router.route("/get-deal-comments").post(getDealComments);

// secured routes

router
	.route("/add-deal")
	.post(
		verifyJWT,
		upload.fields([{ name: "dealPhotos", maxCount: 6 }]),
		addDeal
	);
router
	.route("/edit-deal")
	.patch(
		verifyJWT,
		upload.fields([{ name: "dealPhotos", maxCount: 6 }]),
		editDeal
	);
router.route("/delete-deals").delete(verifyJWT, deleteDeals);

export default router;
