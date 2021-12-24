import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	products: [
		{
			_id: false,
			productID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
			amount: {
				type: Number,
				min: 0,
			},
		},
	],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
