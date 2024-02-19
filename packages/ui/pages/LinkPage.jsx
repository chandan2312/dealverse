import axios from "axios";
import React from "react";

const LinkPage = async ({ lang, server, id }) => {
	const res = await axios.post(`${server}/api/v1/action/deal-link`, {
		dealId: id,
	});

	const response = await res.data;
};

export default LinkPage;
