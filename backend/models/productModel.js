import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	company: {
		type: String,
		required: [true, "Product company name must be provided"],
		enum: {
			values: ["Apple", "Huawei", "Samsung", "Xiaomi"],
			message: "{VALUE} is not supported",
		},
	},
	description: {
		type: String,
		required: [true, "Product description must be provided"],
		trim: true,
	},
	image: {
		type: String,
		required: [true, "Product image must be provided"],
	},
	name: {
		type: String,
		required: [true, "Product name must be provided"],
		unique: true,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "Product price must be provided"],
	},
});

const Product = mongoose.model("Product", productSchema);

export default Product;
