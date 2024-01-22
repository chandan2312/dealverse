import { ApiResponse } from "../utils/ApiResponse.js";

const test = (req, res) => {
	console.log("test success");
	return res.status(201).json(new ApiResponse(200, [], "Test Success ✅✅✅"));
};

export { test };
