"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import { LogOut } from "lucide-react";
import { keywords } from "../../constants/keywords";
import axios from "axios";
import { useRouter } from "next/router";

const LogoutButton = ({ lang, server }) => {
	const handleLogout = async () => {
		axios.defaults.withCredentials = true;
		const res = await axios.post(`${server}/api/v1/user/logout`);
		const response = await res.data;
		console.log(response);
		if (response.statusCode === 200) {
			window.location.href = `/login`;
		}
	};
	return (
		<Button onClick={handleLogout} variant="outline" size="icon">
			<LogOut />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};

export default LogoutButton;
