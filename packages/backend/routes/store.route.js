import { Router } from "express";
import {
	addStore,
	editStore,
	deleteStores,
	getStore,
	getStoreList,
} from "../controllers/store.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-store").post(getStore);
router.route("/get-store-list").post(getStoreList);

//secured Routes

router
	.route("/add-store")
	.post(
		verifyJWT,
		upload.fields([{ name: "storeLogo", maxCount: 1 }]),
		addStore
	);
router.route("/edit-store").post(verifyJWT, editStore);
router.route("/delete-stores").post(verifyJWT, deleteStores);

export default router;
