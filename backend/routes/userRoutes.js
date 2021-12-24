import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserController } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/me").get(authMiddleware, getUserController);

export default router;
