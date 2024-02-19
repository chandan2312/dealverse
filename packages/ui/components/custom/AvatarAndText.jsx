import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

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
			<Image
				alt={alt ? alt : "avatar"}
				src={link}
				className={`${imgClassName}`}
				width={9}
				height={9}
			/>
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
