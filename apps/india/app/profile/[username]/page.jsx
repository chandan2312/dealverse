"use client";

import React from "react";
import AdminProfilePage from "@repo/ui/pages/AdminProfilePage";
import NavbarWrapper from "@repo/ui/components/wrapper/NavbarWrapper";
import MobileBottomNavWrapper from "@repo/ui/components/wrapper/MobileBottomNavWrapper";

const page = () => {
	return (
		<>
			<NavbarWrapper lang={process.env.LANGUAGE} />
			<AdminProfilePage
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
			<MobileBottomNavWrapper lang={process.env.LANGUAGE} />
		</>
	);
};

export default page;
