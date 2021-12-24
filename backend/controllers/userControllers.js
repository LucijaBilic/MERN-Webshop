import User from "../models/userModel.js";

export const getUserController = async (req, res) => {
	try {
		const { userID } = req.user;

		const user = await User.findOne({ _id: userID }).select(
			"_id name email"
		);
		res.status(200).json({ user });
	} catch (error) {
		console.log("Error getting user: ", error);

		res.sendStatus(500);
	}
};
