import React from "react";
import StorePage from "@repo/ui/pages/StorePage";

const Store = (props) => {
	// const slug = params.slug;
	return (
		<StorePage
			lang={process.env.LANGUAGE}
			server={process.env.BACKEND_URL}
			// slug={slug}
			props={props}
		/>
	);
};

export default Store;
