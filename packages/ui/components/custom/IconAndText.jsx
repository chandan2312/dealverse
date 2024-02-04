"use client";
import React from "react";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

const IconAndText = ({
	icon,
	className,
	textClassName,
	variant,
	size,
	text,
	isHover,
	tooltip,
}) => {
	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={variant}
							size={size}
							className={`flex gap-1 items-center justify-center ${className} ${
								isHover ? "hover:bg-accent" : "hover:bg-transparent"
							}`}
						>
							<span className="block">{icon && icon}</span>
							<span className={`block ${textClassName}`}>{text ? text : ""}</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{tooltip}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}
	return (
		<Button
			variant={variant}
			size={size}
			className={`flex gap-1 items-center justify-center ${className} ${
				isHover ? "hover:bg-accent" : "hover:bg-transparent"
			}`}
		>
			<span className="block">{icon && icon}</span>
			<span className={`block ${textClassName}`}>{text ? text : ""}</span>
		</Button>
	);
};

export default IconAndText;
