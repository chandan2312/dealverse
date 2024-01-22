import { Router } from "express";
import {
	addDeal,
	editDeal,
	deleteDeals,
	getDeal,
	getDealList,
} from "../controllers/deal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-deal").get(getDeal);
router.route("/get-deal-list").post(getDealList);

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
