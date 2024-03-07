import React from "react";
import HomePage from "@repo/ui/pages/HomePage";

import NavbarWrapper from "@repo/ui/components/wrapper/NavbarWrapper";
import MobileBottomNavWrapper from "@repo/ui/components/wrapper/MobileBottomNavWrapper";

const page = (props: any) => {
	return (
		<>
			<NavbarWrapper
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
			<HomePage
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
				props={props}
			/>
			<MobileBottomNavWrapper
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
		</>
	);
};

export default page;
