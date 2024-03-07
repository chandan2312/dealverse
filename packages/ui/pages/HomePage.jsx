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
import { homepageTabs } from "../constants/constants";
import TabList from "../components/custom/TabList";
import Filters from "../components/custom/Filters";
import axios from "axios";
import InfiniteScroll from "../components/custom/InfiniteScroll";
import SortBy from "../components/custom/SortBy";
import PaginationCard from "../components/custom/PaginationCard";

const HomePage = async ({ lang, server, props }) => {
	const searchParams = props.searchParams;
	const currTab = searchParams.tab;
	const currSort = searchParams.sort;
	const currPage = parseInt(searchParams.page);

	const dummyCategory = {
		name: "Electronics",
		slug: "electronics",
		icon: <MonitorSmartphone />,
	};

	let res;
	if (currTab === "hot" || currTab == undefined) {
		res = await axios.post(`${server}/api/v1/deal/get-deal-list`, {
			tab: "hot",
			time: currSort,
			page: currPage ? currPage : 1,
			perPage: 2,
		});
	}
	if (currTab === "new") {
		res = await axios.post(`${server}/api/v1/deal/get-deal-list`, {
			tab: "new",
			time: currSort,
			page: currPage ? currPage : 1,
			perPage: 2,
		});
	}
	if (currTab === "commented") {
		res = await axios.post(`${server}/api/v1/deal/get-deal-list`, {
			tab: "commented",
			time: currSort,
			page: currPage ? currPage : 1,
			perPage: 2,
		});
	}

	if (currTab === "voted") {
		res = await axios.post(`${server}/api/v1/deal/get-deal-list`, {
			tab: "voted",
			time: currSort,
			page: currPage ? currPage : 1,
			perPage: 2,
		});
	}

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

			<div className="grid grid-cols-12 gap-4 lg:py-2">
				{/* Left */}

				<div className="col-span-12 md:col-span-7 lg:col-span-8  w-full">
					<TabList
						lang={lang}
						server={server}
						slug=""
						currTab={currTab ? currTab : ""}
						currSort={currSort ? currSort : ""}
						currPage={currPage ? currPage : 1}
						list={homepageTabs}
					/>

					<div className="flex items-center justify-between">
						{/* sort by */}

						<SortBy
							lang={lang}
							server={server}
							slug=""
							currTab={currTab ? currTab : ""}
							currSort={currSort ? currSort : ""}
							currPage={currPage ? currPage : 1}
						/>

						{/* filters */}

						{/* <Filters lang={lang} server={server} /> */}
					</div>

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

					<PaginationCard
						lang={lang}
						server={server}
						slug=""
						currTab={currTab ? currTab : ""}
						currSort={currSort ? currSort : ""}
						currPage={currPage ? currPage : 1}
					/>
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
