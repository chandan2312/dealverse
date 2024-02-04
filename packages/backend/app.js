import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

console.log;

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

app.options(
	"*",
	cors({
		origin: true,
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.route.js";
import dealRouter from "./routes/deal.route.js";
import storeRouter from "./routes/store.route.js";
import commentRouter from "./routes/comment.route.js";
import badgeRouter from "./routes/badge.route.js";
import postRouter from "./routes/post.route.js";
import testRouter from "./routes/test.route.js";

//routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/deal", dealRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/badge", badgeRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/test", testRouter);

export { app };
