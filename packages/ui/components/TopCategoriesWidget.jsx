import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import CategoryListCard from "./custom/CategoryListCard";
import { MonitorSmartphone, ExternalLink } from "lucide-react";
import Link from "next/link";

import { keywords } from "../constants/keywords";

const TopCategoriesWidget = ({ lang }) => {
	const topCategories = [
		{
			name: "Electronics",
			slug: "electronics",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Fashion",
			slug: "fashion",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Home & Kitchen",
			slug: "home-kitchen",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Beauty & Health",
			slug: "beauty-health",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Baby & Kids",
			slug: "baby-kids",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Travel",
			slug: "travel",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Food & Dining",
			slug: "food-dining",
			icon: <MonitorSmartphone />,
		},
		{
			name: "Recharge",
			slug: "recharge",
			icon: <MonitorSmartphone />,
		},
	];

	return (
		<>
			<Card className="mx-1 bg-primary mt-2">
				<CardHeader className="py-1 pt-3">
					<CardTitle className="text-lg text-semibold">
						{keywords.topCategories[lang]}
					</CardTitle>
				</CardHeader>

				<CardContent className="flex items-center gap-1 flex-wrap">
					{topCategories.map((cat, index) => (
						<CategoryListCard
							key={index}
							className=""
							name={cat.name}
							slug={cat.slug}
							icon={cat.icon}
						/>
					))}
				</CardContent>

				<CardContent className="flex justify-center">
					<Link
						href="/stores"
						className="flex items-center hover:bg-accent hover:rouded-lg p-1 text-sm text-text1"
					>
						<ExternalLink />
						<span className="px-1 text-xs">{keywords.viewAllCategories[lang]}</span>
					</Link>
				</CardContent>
			</Card>
		</>
	);
};

export default TopCategoriesWidget;
