import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CategoryListCard = ({ name, slug, icon, className }) => {
	return (
		<Button variant="outline" size="sm" className={`${className}`}>
			<Link href={`/category/${slug}`} className="flex items-center text-xs">
				<span className="px-1">{icon}</span> <span>{name}</span>
			</Link>
		</Button>
	);
};

export default CategoryListCard;
