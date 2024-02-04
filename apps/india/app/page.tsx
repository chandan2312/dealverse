import React from "react";
import HomePage from "@repo/ui/pages/HomePage";

import NavbarWrapper from "@repo/ui/components/wrapper/NavbarWrapper";
import MobileBottomNavWrapper from "@repo/ui/components/wrapper/MobileBottomNavWrapper";

const page = () => {
	return (
		<>
			<NavbarWrapper lang={process.env.LANGUAGE} />
			<HomePage lang={process.env.LANGUAGE} />
			<MobileBottomNavWrapper lang={process.env.LANGUAGE} />
		</>
	);
};

export default page;
