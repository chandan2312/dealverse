import React from "react";
import Register from "@repo/ui/pages/Register";

const register = () => {
	return (
		<div className=" m-auto p-auto fixed top-0 bottom-0 right-0 left-0 ">
			<Register
				domain={process.env.DOMAIN}
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
		</div>
	);
};

export default register;
