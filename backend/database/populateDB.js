import dotenv from "dotenv";

import connectDB from "./connectDB.js";
import jsonProducts from "./products.json";
import Product from "../models/productModel.js";

dotenv.config({ path: "../.env" });

const start = async () => {
	try {
		await connectDB(process.env.MERN_WEBSHOP);
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log("Success populating DB");
		process.exit(0);
	} catch (error) {
		console.log("Error populating DB:", error);
		process.exit(1);
	}
};

start();
