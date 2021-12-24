import express from "express";
import {
	loginUserController,
	registerUserController,
} from "../controllers/authControllers.js";

const router = express.Router();

router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);

export default router;
