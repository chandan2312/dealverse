import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AvatarAndText = ({
	className,

	link,
	width,
	height,
	alt,
	imgClassName,

	text,
	textClassName,
	textLink,
}) => {
	return (
		<div className={`flex gap-1 items-center justify-center ${className}`}>
			<img src={link} className={`${imgClassName}`} />
			{textLink ? (
				<Link href={textLink}>
					<span className={` ${textClassName}`}>{text ? text : ""}</span>
				</Link>
			) : (
				<span className={`block ${textClassName}`}>{text ? text : ""}</span>
			)}
		</div>
	);
};

export default AvatarAndText;
