import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const InfiniteScroll = ({ lang, server }) => {
	return (
		<div className="p-4">
			<div className="flex items-center justify-center">
				<PulseLoader color="#36d7b7" size={15} />
			</div>
		</div>
	);
};

export default InfiniteScroll;
