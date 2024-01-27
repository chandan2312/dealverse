import React from "react";
import { Card } from "../ui/card";
import { faker } from "@faker-js/faker";
import Link from "next/link";

const StoreListCard = ({ name, link, affiliateLink, logo, className }) => {
	return (
		<Card
			className={`flex flex-col items-between  cursor-pointer hover:bg-accent w-full ${className}`}
		>
			<Link href={`/${name}`} classname="p-0 m-0">
				<div className="bg-primary rounded-lg mt-1">
					<img
						src={faker.image.avatar()}
						alt="logo"
						className="w-full px-1 mt-0 pt-0 rounded-t-lg object-cover flex items-start justify-center"
					/>{" "}
				</div>
				<div className="flex items-end text-xs justify-center font-semibold px-2 py-1">
					{name}
				</div>
			</Link>
		</Card>
	);
};

export default StoreListCard;
