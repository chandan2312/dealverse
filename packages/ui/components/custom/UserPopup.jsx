"use client";

import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import logout from "../../logic/logout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

export default function UserPopup({ lang, server }) {
	const { payload: user } = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const handleLogout = async () => {
		axios.defaults.withCredentials = true;
		const res = await axios.post(`${server}/api/v1/user/logout`);
		const response = await res.data;
		console.log(response);
		if (response.statusCode === 200) {
			dispatch(setUser(null));
			window.location.reload();
		}
	};

	return (
		<DropdownMenu className="bg-transparent">
			<DropdownMenuTrigger className="bg-transparent p-0 m-0" asChild>
				<Image
					src={user?.avatar ? user.avatar : `${faker.image.avatar()}`}
					alt="login user avatar"
					width={28}
					height={28}
					className="bg-transparent shadow-xl rounded-full cursor-pointer"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-75 bg-secondary">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<UserPlus className="mr-2 h-4 w-4" />
							<span>Invite users</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>
									<Mail className="mr-2 h-4 w-4" />
									<span>Email</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<MessageSquare className="mr-2 h-4 w-4" />
									<span>Message</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<PlusCircle className="mr-2 h-4 w-4" />
									<span>Whatsapp</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => handleLogout(server)}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
