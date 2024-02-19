import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCategory, addTag } from "../controllers/meta.controller.js";

const router = Router();

router.route("/add-category").post(verifyJWT, addCategory);
router.route("/add-tag").post(verifyJWT, addTag);

export default router;
