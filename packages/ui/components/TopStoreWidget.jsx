import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import StoreListCard from "./custom/StoreListCard";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const TopStoreWidget = () => {
	const topStores = [
		{
			name: "Amazon",
			link: "/stores/amazon",
			affiliteLink:
				"https://www.amazon.in/?&_encoding=UTF8&tag=deal70-21&linkCode=ur2&linkId=6f7e1b7e4d5f5e7c5e0f3a7a2e7f9a8a&camp=3638&creative=24630",
			logo: "/images/amazon.png",
		},
		{
			name: "Flipkart",
			link: "/stores/flipkart",
			affiliteLink: "https://www.flipkart.com/?affid=deal70&affExtParam1=deal70",
			logo: "/images/flipkart.png",
		},
		{
			name: "Myntra",
			link: "/stores/myntra",
			affiliteLink:
				"https://www.myntra.com/?utm_source=aff-impact&utm_medium=affiliate&utm_campaign=Deal70&utm_term=homepage",
			logo: "/images/myntra.png",
		},
		{
			name: "Ajio",
			link: "/stores/ajio",
			affiliteLink:
				"https://www.ajio.com/?utm_source=aff-impact&utm_medium=affiliate&utm_campaign=Deal70&utm_term=homepage",
			logo: "/images/ajio.png",
		},
		{
			name: "Tata Cliq",
			link: "/stores/tatacliq",
			affiliteLink: "https://www.tatacliq.com/?cid=af:homepage:Deal70",
			logo: "/images/tatacliq.png",
		},
		{
			name: "Shopclues",
			link: "/stores/shopclues",
			affiliteLink:
				"https://www.shopclues.com/?utm_source=aff-impact&utm_medium=affiliate&utm_campaign=Deal70&utm_term=homepage",
			logo: "/images/shopclues.png",
		},
		{
			name: "Snapdeal",
			link: "/stores/snapdeal",
			affiliteLink:
				"https://www.snapdeal.com/?utm_source=aff-impact&utm_medium=affiliate&utm_campaign=Deal70&utm_term=homepage",
			logo: "/images/snapdeal.png",
		},
		{
			name: "Firstcry",
			link: "/stores/firstcry",
		},
	];

	return (
		<>
			<Card className="mx-1 bg-primary mt-2">
				<CardHeader className="py-1 pt-3">
					<CardTitle className="text-lg text-semibold">Top Stores</CardTitle>
				</CardHeader>

				<CardContent className="grid grid-cols-12 gap-3">
					{topStores.map((store, index) => (
						<StoreListCard
							key={index}
							className="col-span-3 "
							name={store.name}
							link={store.link}
							affiliteLink={store.affiliteLink}
							logo={store.logo}
						/>
					))}
				</CardContent>

				<CardContent className="flex justify-center">
					<Link
						href="/stores"
						className="flex items-center hover:bg-accent hover:rouded-lg p-1 text-sm text-primary-foreground"
					>
						<ExternalLink />
						<span className="px-1 text-xs">View All Stores</span>
					</Link>
				</CardContent>
			</Card>
		</>
	);
};

export default TopStoreWidget;
