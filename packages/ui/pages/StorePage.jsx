import React from "react";
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";

import TopStoreWidget from "../components/TopStoreWidget";
import RelatedDeals from "../components/RelatedDeals";
import TopCategoriesWidget from "../components/TopCategoriesWidget";
import DealListingCard from "../components/DealListingCard";

import TabList from "../components/custom/TabList";
import Filters from "../components/custom/Filters";

import { keywords } from "../constants/keywords";
import { storePageTabs } from "../constants/constants";

import {
	Tag,
	TicketPercent,
	Mail,
	NotebookText,
	MessageSquareMore,
	MonitorSmartphone,
} from "lucide-react";

const StorePage = ({ lang, server, slug }) => {
	const dummyCategory = {
		name: "Electronics",
		slug: "electronics",
		icon: <MonitorSmartphone />,
	};

	return (
		<div className="grid grid-cols-12">
			<Card className="col-span-12 md:col-span-7 lg:col-span-8">
				<CardContent className="flex items-center gap-5">
					<div className="w-24 h-24 flex items-center justify-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
							alt="logo"
							className="rounded-full w-24 h-24 p-1 object-contain shadow-md"
						/>
					</div>

					<div>
						<div className="text-xs text-center mx-auto px-auto">
							<Link href={"/"}>Home</Link> / <Link href={"/stores"}>Stores</Link> /{" "}
							<Link href={"/store/amazon"}>Amazon</Link>
						</div>
						<h1 className="text-2xl font-bold">Amazon</h1>
					</div>
				</CardContent>

				<CardContent className="flex justify-between items-center">
					<TabList lang={lang} tabList={storePageTabs} />
					<Filters lang={lang} />
				</CardContent>

				<CardContent>
					{Array(10)
						.fill()
						.map((_, i) => (
							<DealListingCard
								lang={lang}
								title="Apple iPhone 12 Pro Max"
								description="Apple iPhone 12 Pro Max (128GB) - Pacific Blue"
								storeName="Amazon"
								storeLink="https://www.amazon.in/"
								discountPrice={129900}
								originalPrice={139900}
								deliveryPrice={0}
								type="deal"
								category={dummyCategory}
								currency={keywords.currency[lang]}
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
			</Card>

			<aside className="col-span-12 md:col-span-5 lg:col-span-4">
				<TopStoreWidget lang={lang} />
				<RelatedDeals lang={lang} />
				<TopCategoriesWidget lang={lang} />
			</aside>
		</div>
	);
};

export default StorePage;
