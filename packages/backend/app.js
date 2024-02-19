import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { ExpressAuth } from "@auth/express";
// import GitHub from "@auth/express/providers/github";
// import { getSession } from "@auth/express";

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// const authSession = async (req, res, next) => {
// 	res.locals.session = await getSession(req);
// 	next();
// };

// app.use(authSession);

// app.get("/", (req, res) => {
// 	const { session } = res.locals;
// 	console.log("session", session);
// 	res.render("index", { user: session?.user });
// });

// app.use("/auth/*", ExpressAuth({ providers: [Google] }));

//routes import
import userRouter from "./routes/user.route.js";
import dealRouter from "./routes/deal.route.js";
import storeRouter from "./routes/store.route.js";
import commentRouter from "./routes/comment.route.js";
import badgeRouter from "./routes/badge.route.js";
import postRouter from "./routes/post.route.js";
import testRouter from "./routes/test.route.js";
import mediaRouter from "./routes/media.route.js";
import metaRouter from "./routes/meta.route.js";
import actionRouter from "./routes/action.route.js";

//routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/deal", dealRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/badge", badgeRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/test", testRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/meta", metaRouter);
app.use("/api/v1/action", actionRouter);
// app.use("/auth/google/callback", googleCallbackRouter);

export { app };
