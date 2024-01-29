import React from "react";
import SingleDeal from "@repo/ui/pages/SingleDeal";

const DealPage = ({ params }) => {
	const slug = params.slug;
	return (
		<SingleDeal
			lang={process.env.LANGUAGE}
			server={process.env.BACKEND_URL}
			slug={slug}
		/>
	);
};

export default DealPage;
