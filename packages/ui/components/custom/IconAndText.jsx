import React from "react";
import { Button } from "../ui/button";

const IconAndText = ({
	icon,
	className,
	textClassName,
	variant,
	size,
	text,
}) => {
	return (
		<Button
			variant={variant}
			size={size}
			className={`flex gap-1 items-center justify-center ${className}`}
		>
			<span className="block">{icon && icon}</span>
			<span className={`block ${textClassName}`}>{text ? text : ""}</span>
		</Button>
	);
};

export default IconAndText;
