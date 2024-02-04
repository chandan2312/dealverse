import React from "react";
import AddDeal from "../../components/form/AddDeal";

const AddNewDealPage = ({ lang, server }) => {
	return (
		<>
			<AddDeal lang={lang} server={server} />
		</>
	);
};

export default AddNewDealPage;
