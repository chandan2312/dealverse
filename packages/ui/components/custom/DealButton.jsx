import React from "react";
import { Button } from "../ui/button";

import { Percent } from "lucide-react";

const DealButton = ({ ...props }) => {
	return (
		<>
			<Button
				className={`flex items-center justify-center ${props.className}`}
				variant={props.variant}
				size={props.size}
			>
				<Percent />
				<span className="px-1">{props.text}</span>
			</Button>
		</>
	);
};

export default DealButton;
