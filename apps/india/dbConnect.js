import { dbConnect } from "@repo/backend/utils/dbConnect.js";

(async function () {
	try {
		const result = await dbConnect(
			process.env.DB_SERVER_URL,
			process.env.DB_NAME
		);
		console.log(result);
		return NextResponse.json(result, {
			status: 200,
			message: "DB Connection Successful",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: "DB Connection Failed",
		});
	}
})();
