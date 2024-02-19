import React from "react";
import LinkPage from "@repo/ui/pages/LinkPage";

const LinkPg = ({ params }) => {
	const id = params.id;
	return (
		<LinkPage
			lang={process.env.LANGUAGE}
			server={process.env.BACKEND_URL}
			id={id}
		/>
	);
};

export default LinkPg;
