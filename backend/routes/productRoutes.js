import express from "express";
import {
	getProductsController,
	getProductByIdController,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProductsController);
router.route("/:id").get(getProductByIdController);

export default router;
