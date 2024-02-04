"use client";

import React from "react";
import Navbar from "../components/Navbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import CategoriesCorousel from "../components/CategoriesCorousel";
import DealListCard from "../components/DealListCard";
import TopStoreWidget from "../components/TopStoreWidget";
import TopCategoriesWidget from "../components/TopCategoriesWidget";

import { MonitorSmartphone } from "lucide-react";

import { keywords } from "../constants/keywords";
import { homePageTabs } from "../constants/constants";
import TabList from "../components/custom/TabList";
import Filters from "../components/custom/Filters";

const HomePage = ({ lang }) => {
	const dummyCategory = {
		name: "Electronics",
		slug: "electronics",
		icon: <MonitorSmartphone />,
	};
	return (
		<>
			{/* categories carousel */}
			<Card className="flex justify-center w-full p-4 bg-primary">
				<CategoriesCorousel lang={lang} />
			</Card>

			{/* -------------- Listing and Sidebars -------------- */}

			<div className="grid grid-cols-12 py-2">
				{/* Left */}

				<div className="col-span-12 md:col-span-7 lg:col-span-8  w-full">
					<Card className="w-full mx-auto px-auto px-4 py-2 flex items-center justify-between">
						<TabList lang={lang} tabList={homePageTabs} />
						<Filters lang={lang} />
					</Card>
					<DealListCard
						lang={lang}
						title="Apple iPhone 12 Pro Max"
						description="Apple iPhone 12 Pro Max (128GB) - Pacific Blue"
						storeName="Amazon"
						storeLink="https://www.amazon.in/"
						offer="25% Off"
						discountPrice={129900}
						originalPrice={139900}
						deliveryPrice={0}
						type="deal"
						category={dummyCategory}
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

					<DealListCard
						lang={lang}
						className="w-full"
						title="Apple iPhone 12 Pro Max"
						description="Apple iPhone 12 Pro Max (128GB) - Pacific Blue"
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

					<DealListCard
						lang={lang}
						className="w-full"
						title="Apple iPhone 13 Pro Max"
						offer="25% Off"
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
				</div>
				{/* Right sidebar*/}
				<Card className="col-span-12 md:col-span-5 lg:col-span-4">
					<TopStoreWidget lang={lang} />
					<TopCategoriesWidget lang={lang} />
				</Card>
			</div>
		</>
	);
};

export default HomePage;
