import mongoose from "mongoose";
import User from "../models/userModel.js";

export const loginUserController = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email ili lozinka nisu ispunjeni" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Uneseni podaci nisu ispravni" });
		}

		const isPasswordCorrect = await user.comparePasswords(password);
		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ message: "Uneseni podaci nisu ispravni" });
		}

		const token = user.createJWT();
		res.status(200).json({ token });
	} catch (error) {
		console.log("Login error: ", error);

		res.sendStatus(500);
	}
};

export const registerUserController = async (req, res) => {
	try {
		const { email } = req.body;

		const tempEmail = await User.findOne({ email });
		if (tempEmail) {
			return res.status(400).json([
				{
					type: "email",
					message: "Email zauzet",
				},
			]);
		}

		const user = await User.create({ ...req.body });

		const token = user.createJWT();
		res.status(201).json({ token });
	} catch (error) {
		console.log("Register error: ", error);

		if (error instanceof mongoose.Error.ValidationError) {
			const errors = [];

			if (error.errors.email) {
				errors.push({
					type: "email",
					message: error.errors.email.message,
				});
			}

			if (error.errors.password) {
				errors.push({
					type: "password",
					message: error.errors.password.message,
				});
			}

			if (error.errors.name) {
				errors.push({
					type: "name",
					message: error.errors.name.message,
				});
			}

			return res.status(400).send(errors);
		}
		res.sendStatus(500);
	}
};
