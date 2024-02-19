// // var GoogleStrategy = require("passport-google-oauth20").Strategy;

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config({ path: "./.env" });

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			const userData = profile._json;

			let user = {};
			try {
				const currentUserQuery = await User.findOne({
					where: {
						email: userData.email,
					},
				});

				console.log("currentUserQuery from google login strategy - passport.js:");
				console.log(currentUserQuery);
				if (currentUserQuery?.rows?.length > 0) {
					user = {
						user_id: currentUserQuery.rows[0].user_id,
						username: currentUserQuery.rows[0].username,
					};
				} else {
					const newUser = await User.create({
						username: userData.name,
						email: userData.email,
						password: null,
						avatar: userData.picture,
						loginFrom: "GOOGLE",
						refreshToken: refreshToken,
					});

					user = {
						_id: newUser._id,
						email: newUser.email,
						username: newUser.username,
					};
				}

				done(null, user);
			} catch (err) {
				console.log(err);
				done(err, false, err.message);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
