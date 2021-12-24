import cors from "cors";
import express from "express";
import productsRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/order", authMiddleware, orderRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Route not found" }));

export default app;
