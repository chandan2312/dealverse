import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import DealListingCardNarrow from "./DealListingCardNarrow";
import { MonitorSmartphone, ExternalLink } from "lucide-react";
import Link from "next/link";

const TopCategoriesWidget = () => {
	const related = [
		{
			name: "Electronics",
			slug: "electronics",
			icon: <MonitorSmartphone />,
		},
	];

	return (
		<>
			<Card className="mx-1 bg-primary mt-2">
				<CardHeader className="py-1 pt-3 mx-0">
					<CardTitle className="text-lg mx-0 px-0 text-semibold">
						Similar Offer You Many Like
					</CardTitle>
				</CardHeader>

				<CardContent className="flex items-center gap-1 mx-0 flex-wrap">
					{Array.from({ length: 5 }).map((deal, index) => (
						<DealListingCardNarrow
							className="w-full"
							title="Apple iPhone 13 Pro Max"
							description="Apple iPhone 13 (64GB) - Faint Pink"
							storeName="Amazon"
							storeLink="https://www.amazon.in/"
							discountPrice={129900}
							originalPrice={139900}
							deliveryPrice={8.99}
							couponCode="APPLE10"
							type="coupon"
							currency="INR"
							upVotes={105}
							coverImage="https://images-na.ssl-images-amazon.com/images/I/71MHTD3uL4L._SL1500_.jpg"
							createdAt="2021-09-18T12:00:00.000Z"
							updatedAt="2021-09-20T12:00:00.000Z"
							commentCount={10}
							saveCount={20}
							username="Siddharth"
							userAvatar="https://avatars.githubusercontent.com/u/56189221?v=4"
							userLink="https://google.com"
							isUserVerified={true}
							isExpired={false}
						/>
					))}
				</CardContent>

				<CardContent className="flex justify-center">
					<Link
						href="/deals"
						className="flex items-center hover:bg-accent hover:rouded-lg p-1 text-sm text-primary-foreground"
					>
						<ExternalLink />
						<span className="px-1 text-xs">View All Deals</span>
					</Link>
				</CardContent>
			</Card>
		</>
	);
};

export default TopCategoriesWidget;