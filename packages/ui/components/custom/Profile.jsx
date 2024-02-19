"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { LoginDialog } from "./LoginDialog";
import { keywords } from "../../constants/keywords";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIsLogin, setUser } from "../../store/slices/userSlice";
import tokenChecker from "../../helpers/tokenChecker";
import UserPopup from "./UserPopup";
import { CircleUser } from "lucide-react";
import FormDialog from "./FormDialog";
import { User } from "lucide-react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import currentUser from "../../helpers/currentUser";
import StoreWrapper from "../wrapper/StoreWrapper";

const Profile = ({ lang, server, isMobile = false }) => {
	const [loginStatus, setLoginStatus] = useState(false);

	// useEffect(() => {
	// 	const handler = async () => {
	// 		useSelector((state) => {
	// 			setLoginStatus(state.user.isLogin);
	// 		});
	// 	};
	// 	handler();
	// }, [loginStatus]);

	const dispatch = useDispatch();
	const openRegister = useSelector((state) => state.form.openRegister);

	useEffect(() => {
		const fetch = async () => {
			const currUser = await currentUser(server);
			if (currUser) {
				dispatch(setUser(currUser));
				setLoginStatus(true);
			} else {
				dispatch(setUser(null));
				setLoginStatus(false);
			}
		};

		fetch();
	}, []);

	return (
		<div className="flex  items-center p-1">
			<div>
				{loginStatus ? (
					<StoreWrapper>
						<UserPopup lang={lang} server={server} />
					</StoreWrapper>
				) : (
					<FormDialog
						lang={lang}
						server={server}
						buttonText={
							<span className="px-2 flex gap-1 items-center">
								{openRegister ? (
									<Button
										size="sm"
										variant="ghost"
										className="hover:bg-accent2 flex gap-1"
									>
										<UserPlus /> {!isMobile ? keywords.register[process.env.LANG] : ""}
									</Button>
								) : (
									<Button
										size="xs"
										variant="ghost"
										className="hover:bg-accent2 flex gap-1"
									>
										<User /> {!isMobile ? keywords.login[process.env.LANG] : ""}
									</Button>
								)}
							</span>
						}
						title={openRegister ? keywords.register[lang] : keywords.login[lang]}
						component={
							openRegister ? (
								<RegisterForm lang={lang} server={server} />
							) : (
								<LoginForm lang={lang} server={server} />
							)
						}
						className={` bg-transparent ${
							isMobile ? "text-foreground" : "text-accent-foreground"
						} hover:text-accent-foreground`}
						size="sm"
						variant="accent2"
					/>
				)}
				{/* <LoginDialog
					lang={lang}
					buttonText={keywords.login[lang]}
					title="Login User"
				/> */}
			</div>

			{/* <div className="w-9 h-9 bg-slate-500 rounded-full"></div> */}

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
