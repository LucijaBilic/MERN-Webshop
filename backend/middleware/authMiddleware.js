import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Neispravna autentikacija" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;

		next();
	} catch (error) {
		console.log("Authenication middleware error: ", error);

		res.status(403).json({ message: "Neispravn token" });
	}
};
