import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import GoogleProvider from "next-auth/providers/google";

console.log("process.env.GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);

export const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
};
