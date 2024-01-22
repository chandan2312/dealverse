import connectDB from "./utils/dbConnect.js";
import { app } from "./app.js";

async function server(port, mongoServerUrl, dbName) {
	try {
		await connectDB(mongoServerUrl, dbName);
		await app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});

		return { status: 200, message: "DB Connection Successful ✅✅" };
	} catch (error) {
		console.log(error.message);
		return { status: 500, message: "DB Connection Failed ❌❌" };
	}
}

export default server;
