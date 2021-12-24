import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Ime mora biti ispunjeno"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email mora biti ispunjen"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"User email must be provided",
		],
	},
	password: {
		type: String,
		required: [true, "Lozinka mora biti ispunjena"],
		minLength: [4, "Lozinka mora imati minimalno 4 znaka"],
	},
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

userSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userID: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

userSchema.methods.comparePasswords = async function (passwordInput) {
	const isMatch = await bcrypt.compare(passwordInput, this.password);

	return isMatch;
};

const User = mongoose.model("User", userSchema);

export default User;
