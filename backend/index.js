import dotenv from "dotenv";
import app from "./server.js";
import connectDB from "./database/connectDB.js";

dotenv.config();

const port = process.env.PORT || 8000;

const start = async () => {
	try {
		await connectDB(process.env.MERN_WEBSHOP);
		app.listen(port, console.log(`Server listening on port ${port}...`));
	} catch (error) {
		console.log("Error starting server: ", error);
		process.exit(1);
	}
};

start();
