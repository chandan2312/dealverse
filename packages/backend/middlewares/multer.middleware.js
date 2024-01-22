import multer from "multer";
import { transliterate as tr, slugify } from "transliteration";
// import sharp from "sharp";

//original upload

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log("Multer Logs");
		console.log(file);
		console.log(req.body);
		console.log("Multer Logs End");

		cb(null, `./public/media/${file.fieldname.toLowerCase()}`);
	},
	filename: function (req, file, cb) {
		const extension = file.mimetype.split("/")[1];

		// const uniqueSuffix = Date.now();

		let filename = slugify(tr(file.originalname.split(".")[0]));
		if (req.body.username) filename = req.body.username;
		if (req.body.title) {
			const randomNum = Math.floor(100000 + Math.random() * 900000);
			filename = `${slugify(tr(req.body.title))}-${randomNum}`;
		}
		cb(null, `${filename}.${extension}`);
	},
});

export const upload = multer({ storage: storage });

//resized upload

// const storage2 = multer.memoryStorage(); // Use memory storage for image processing

// export const upload2 = multer({ storage: storage }).fields([
// 	{ name: "avatar", maxCount: 1 },
// ]);

// const resizeAndUpload = async (req, res, next) => {
// 	try {
// 		if (!req.files || !req.files.avatar) {
// 			throw new Error("No avatar file provided");
// 		}

// 		const avatarFile = req.files.avatar[0];

// 		const resizedBuffer = await sharp(avatarFile.buffer)
// 			.resize({ width: 150, height: 150 })
// 			.toBuffer();

// 		req.resizedAvatarBuffer = resizedBuffer;

// 		upload2(req, res, next);
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(400).json({ error: "Error processing image" });
// 	}
// };

// export const uploadAndResize = (req, res, next) => {
// 	upload2(req, res, (err) => {
// 		if (err) {
// 			return res.status(400).json({ error: "Error uploading image" });
// 		}
// 		next();
// 	});
// };

// // Example route usage
// // router.route("/register").post(resizeAndUpload, registerUser);
