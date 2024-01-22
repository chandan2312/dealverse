import multer from "multer";
import { ApiError } from "@repo/backend/utils/ApiError.js";
import { asyncHandler } from "@repo/backend/utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "@repo/backend/models/user.model.js";


export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    // This logic is only applied to /about
  }
 
  if (request.nextUrl.pathname.startsWith('/api/user/register')) {
    // This logic is only applied to /dashboard
  }
}


//jwt middleware

export const verifyJWT = asyncHandler(async (req, _, next) => {
	try {
		const token =
			req.cookies.get("accessToken") ||
			req.header("Authorization")?.replace("Bearer ", "");

		// console.log(token);
		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const user = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);

		if (!user) {
			throw new ApiError(401, "Invalid Access Token");
		}

		req.user = user;
		next();
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});

//multer middleware

export const upload = (destinationPath) => {
	return multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, destinationPath);
			},
			filename: function (req, file, cb) {
				cb(null, file.originalname);
			},
		}),
	});
};
