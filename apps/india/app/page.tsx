import React from "react";
import HomePage from "@repo/ui/pages/HomePage";

const page = () => {
	return (
		<>
			<HomePage lang={process.env.LANGUAGE} />
		</>
	);
};

export default page;
