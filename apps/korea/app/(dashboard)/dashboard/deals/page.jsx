"use client";

import React from "react";
import DataTable from "@repo/ui/components/dashboard/DataTable";

const AllDeals = () => {
	return (
		<div>
			<DataTable lang={process.env.LANGUAGE} />
		</div>
	);
};

export default AllDeals;
