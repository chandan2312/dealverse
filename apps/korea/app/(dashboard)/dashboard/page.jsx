import React from "react";
import HomePage from "@repo/ui/pages/dashboard/HomePage";

const DashboardHome = () => {
	return (
		<>
			<HomePage lang={process.env.LANGUAGE} server={process.env.BACKEND_URL} />
		</>
	);
};

export default DashboardHome;
