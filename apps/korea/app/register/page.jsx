import React from "react";
import Register from "@repo/ui/pages/Register";

const register = () => {
	return (
		<div className="max-w-md m-auto p-auto py-6">
			<h1 className="text-2xl font-semibold py-2">Register</h1>
			<Register lang={process.env.LANGUAGE} />
		</div>
	);
};

export default register;
