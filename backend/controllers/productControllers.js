import Product from "../models/productModel.js";

export const getProductsController = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({
			success: true,
			results: products.length,
			products,
		});
	} catch (error) {
		console.log("Error getting products: ", error);

		res.sendStatus(500);
	}
};

export const getProductByIdController = async (req, res) => {
	try {
		const { id: productID } = req.params;
		const product = await Product.findOne({ _id: productID });

		if (!product) {
			return res.status(404).json({
				success: false,
				message: `Nije pronađen proizvod za ID: ${productID}`,
			});
		}

		res.status(200).json({
			success: true,
			product,
		});
	} catch (error) {
		console.log("Error getting single product: ", error);

		res.sendStatus(500);
	}
};
