import { Router } from "express";
import {
	addCoupon,
	editCoupon,
	deleteCoupon,
	getCoupon,
	getCouponList,
} from "../controllers/coupon.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-coupon").post(getCoupon);
router.route("/get-coupon-list").post(getCouponList);

//secured Routes

router
	.route("/add-coupon")
	.post(
		verifyJWT,
		upload.fields([{ name: "storeLogo", maxCount: 1 }]),
		addCoupon
	);
router.route("/edit-coupon").post(verifyJWT, editCoupon);
router.route("/delete-coupon").post(verifyJWT, deleteCoupon);

export default router;
