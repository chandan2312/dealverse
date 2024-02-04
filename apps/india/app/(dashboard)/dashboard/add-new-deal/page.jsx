import React from "react";
import AddNewDealPage from "@repo/ui/pages/dashboard/AddNewDealPage";

const AddNewDeal = () => {
	return (
		<>
			<AddNewDealPage
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
		</>
	);
};

export default AddNewDeal;
