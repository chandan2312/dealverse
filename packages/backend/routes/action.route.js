import { Router } from "express";
import {
	addView,
	addVote,
	getDealStatus,
	saveDeal,
	dealLink,
} from "../controllers/action.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-view").post(addView);
router.route("/add-vote").post(verifyJWT, addVote);
router.route("/save-deal").post(verifyJWT, saveDeal);
router.route("/deal-status").post(verifyJWT, getDealStatus);
router.route("/deal-link").post(dealLink);

export default router;
