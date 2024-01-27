import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const UpVoteButton = ({
	upVotes = 0,
	className,
	size = "sm",
	variant = "outline",
	iconSize = 18,
}) => {
	return (
		<Button
			size={`${size}`}
			variant={`${variant}`}
			className={`rounded-full ${className}`}
		>
			<Minus size={iconSize} className="hover:bg-primary rounded-full" />{" "}
			<div className="px-1 font-bold text-red-500">{upVotes}</div>{" "}
			<Plus size={iconSize} className="hover:bg-primary rounded-full" />
		</Button>
	);
};

export default UpVoteButton;
