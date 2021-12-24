import express from "express";
import { createPaymentController } from "../controllers/orderControllers.js";

const router = express.Router();

router.route("/payment").post(createPaymentController);

export default router;