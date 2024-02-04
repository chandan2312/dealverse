import React from "react";
import Login from "@repo/ui/pages/Login";

const login = () => {
	return (
		<div className=" m-auto p-auto fixed top-0 bottom-0 right-0 left-0 ">
			{/* <h1 className="text-2xl font-semibold py-2">Login</h1> */}

			<Login lang={process.env.LANGUAGE} server={process.env.BACKEND_URL} />
		</div>
	);
};

export default login;
