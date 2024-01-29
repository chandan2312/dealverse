import React from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { Button } from "../ui/button";

import { UserPlus } from "lucide-react";
import { LoginDialog } from "./LoginDialog";

import { keywords } from "../../constants/keywords";

const Profile = ({ lang }) => {
	return (
		<div className="flex gap-2 items-center">
			<div>
				<LoginDialog
					lang={lang}
					buttonText={keywords.login[lang]}
					title="Login User"
				/>
			</div>

			<div className="w-9 h-9 bg-slate-500 rounded-full"></div>

			{/* <Image
				src={faker.image.avatar()}
				alt="avatar"
				width="40"
				height="40"
				className="rounded-full shadow-lg"
			/> */}
		</div>
	);
};

export default Profile;
