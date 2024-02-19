"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import { LogOut } from "lucide-react";
import { keywords } from "../../constants/keywords";
import axios from "axios";
// import { useRouter } from "next/navigation";
import logout from "../../logic/logout";

const LogoutButton = ({ lang, server }) => {
	const handleLogout = async () => {
		await logout(server);
	};

	return (
		<Button onClick={handleLogout} variant="outline" size="icon">
			<LogOut />
			<span className="sr-only">Logout</span>
		</Button>
	);
};

export default LogoutButton;
