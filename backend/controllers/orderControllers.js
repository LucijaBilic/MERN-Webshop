import Order from "../models/orderModel.js";

export const createPaymentController = async (req, res) => {
	try {
		const { userID } = req.user;
		const { orderInfo } = req.body;

		const order = await Order.create({
			userID,
			products: orderInfo.products,
		});
		res.status(201).json({ orderID: order._id });
	} catch (error) {
		console.log("Payment error: ", error);

		res.sendStatus(500);
	}
};
