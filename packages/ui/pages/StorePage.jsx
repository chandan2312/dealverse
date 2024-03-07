import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";

import Link from "next/link";

import TopStoreWidget from "../components/TopStoreWidget";
import RelatedDeals from "../components/RelatedDeals";
import TopCategoriesWidget from "../components/TopCategoriesWidget";
import DealListCard from "../components/DealListCard";

import TabList from "../components/custom/TabList";
import Filters from "../components/custom/Filters";
import PaginationCard from "../components/custom/PaginationCard";

import { keywords } from "../constants/keywords";
import { storepageTabs } from "../constants/constants";

import {
	Tag,
	TicketPercent,
	Mail,
	NotebookText,
	MessageSquareMore,
	MonitorSmartphone,
} from "lucide-react";
import ShareToButton from "../components/custom/ShareToButton";
import DiscussionListCard from "../components/DiscussionListCard";
import Image from "next/image";
import axios from "axios";
import { useMemo } from "react";
import SortBy from "../components/custom/SortBy";

const StorePage = async ({ lang, server, props }) => {
	const searchParams = props?.searchParams;
	const currTab = searchParams?.tab || "hot";
	const currSort = searchParams?.sort || "this-week";
	const currPage = parseInt(searchParams?.page) || 1;

	const [res, dealRes] = await Promise.all([
		axios.post(`${server}/api/v1/store/get-store`, { slug: props.params.slug }),
		axios.post(`${server}/api/v1/deal/get-deal-list`, {
			tab: "hot",
			time: currSort,
			page: currPage,
			perPage: 2,
			filterStores: [props.params.slug],
		}),
	]);

	const response = res.data;
	const store = response.data;

	const deals = dealRes.data.data;
	console.log(deals);

	const MemoizedSidebar = React.memo(() => {
		return (
			<aside className="col-span-12 md:col-span-5 lg:col-span-4">
				<TopStoreWidget lang={lang} server={server} />
				<RelatedDeals lang={lang} server={server} />
				<TopCategoriesWidget lang={lang} server={server} />
				<ShareToButton lang={lang} server={server} />
			</aside>
		);
	}, []);

	return (
		<div className=" grid grid-cols-12">
			<Card className="col-span-12 md:col-span-7 lg:col-span-8">
				<CardContent className="flex items-center gap-5">
					<div className="w-24 h-24 flex items-center justify-center">
						<Image
							src={`${
								store?.logo ? store.logo : `https://logo.clearbit.com/amazon.com`
							}`} //placeholder
							width={48}
							height={48}
							alt={`${store?.name} logo`}
							className="rounded-full w-full p-1 object-contain shadow-md"
						/>
					</div>

					<div>
						<div className="text-xs text-center mx-auto px-auto">
							<div>
								<Link href={"/"}>Home</Link> / <Link href={"/stores"}>Stores</Link> /{" "}
								<Link href={`/store/${store.slug}`}>${store?.name}</Link>
							</div>
						</div>
						<h1 className="text-2xl font-bold">{store.name}</h1>
					</div>
				</CardContent>

				<CardContent className="w-full flex justify-between items-center">
					<TabList
						lang={lang}
						server={server}
						slug={props.params.slug || ""}
						list={storepageTabs}
					/>
				</CardContent>
				<div className="px-3 flex items-center justify-between">
					{/* sort by */}

					<SortBy
						lang={lang}
						server={server}
						slug={props.params.slug || ""}
						currTab={currTab ? currTab : ""}
						currSort={currSort ? currSort : ""}
						currPage={currPage ? currPage : 1}
					/>

					{/* filters */}

					{/* <Filters lang={lang} server={server} /> */}
				</div>

				<CardContent>
					{/* <PaginationCard /> */}
					{deals.map((deal) => {
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
						slug={props.params.slug || ""}
						currTab={currTab ? currTab : ""}
						currSort={currSort ? currSort : ""}
						currPage={currPage ? currPage : 1}
					/>
				</CardContent>
			</Card>

			<MemoizedSidebar />
		</div>
	);
};

export default StorePage;
