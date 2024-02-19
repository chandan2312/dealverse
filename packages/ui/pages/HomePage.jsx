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
import axios from "axios";

const HomePage = async ({ lang, server }) => {
	const dummyCategory = {
		name: "Electronics",
		slug: "electronics",
		icon: <MonitorSmartphone />,
	};

	const res = await axios.post(`${server}/api/v1/deal/get-deal-list`);

	const response = res.data;

	const list = response.data;

	if (response.statusCode !== 200) {
		return <>Something went wrong</>;
	}

	return (
		<>
			{/* categories carousel */}
			{/* <Card className="flex justify-center w-full p-4 bg-primary">
				<CategoriesCorousel lang={lang} />
			</Card> */}

			{/* -------------- Listing and Sidebars -------------- */}

			<div className="grid grid-cols-12 gap-4 py-2">
				{/* Left */}

				<div className="col-span-12 md:col-span-7 lg:col-span-8  w-full">
					<Card className="w-full mx-auto px-auto px-4 py-2 flex items-center justify-between">
						<TabList lang={lang} server={server} tabList={homePageTabs} />
						<Filters lang={lang} server={server} />
					</Card>

					{list.map((deal) => {
						return (
							<DealListCard
								lang={lang}
								server={server}
								className="w-full"
								deal={deal}
							/>
						);
					})}
				</div>
				{/* Right sidebar*/}
				<Card className="col-span-12 md:col-span-5 lg:col-span-4">
					<TopStoreWidget lang={lang} server={server} />
					<TopCategoriesWidget lang={lang} server={server} />
				</Card>
			</div>
		</>
	);
};

export default HomePage;
