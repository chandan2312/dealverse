import React from "react";

import TopStoreWidget from "../components/TopStoreWidget";
import TopCategoriesWidget from "../components/TopCategoriesWidget";
import DealInfoCard from "../components/DealInfoCard";
import RelatedDeals from "../components/RelatedDeals";
import CommentSection from "../components/CommentSection";
import { Card } from "../components/ui/card";
import ContentBox from "../components/custom/ContentBox";
import IconAndText from "../components/custom/IconAndText";
import ShareToButton from "../components/custom/ShareToButton";

import { MessageSquare, Bookmark } from "lucide-react";
import { keywords } from "../constants/keywords";
import { redirect } from "next/navigation";
import axios from "axios";
import AddComment from "../components/custom/AddComment";
import { Separator } from "../components/ui/separator";
import CommentSectionWrapper from "../components/wrapper/CommentSectionWrapper";
import { slugify } from "transliteration";
import StoreWrapper from "../components/wrapper/StoreWrapper";
import SaveDealButton from "../components/custom/SaveDealButton";

const SingleDeal = async ({ lang, server, slug }) => {
	const [res, view] = await Promise.all([
		axios.post(`${server}/api/v1/deal/get-deal`, { slug: slug }),
		axios.post(`${server}/api/v1/action/add-view`, { slug: slug, type: "deal" }),
	]);

	const response = res.data;

	if (response.statusCode !== 200) {
		redirect("/404");
	}

	const deal = response.data;

	return (
		<>
			<Card className="text-mutedText bg-transparent grid grid-cols-12 gap-5 mt-4 shadow-none">
				{/* ------------ Left Side -------------- */}
				<Card className="col-span-12 lg:col-span-8 p-2 lg:p-4 shadow-none">
					<DealInfoCard lang={lang} server={server} deal={deal} />

					{/* <Separator /> */}
					{/* --------------- Description ---------------- */}

					<ContentBox
						lang={lang}
						style="mt-2"
						title={keywords.description[lang]}
						content={deal.description}
					/>
					<Card className="flex items-center gap-2 p-3 ">
						<IconAndText
							size="sm"
							variant="ghost"
							className="px-1"
							icon={<MessageSquare />}
							text={keywords.addComment[lang]}
						/>
						<StoreWrapper>
							<SaveDealButton
								lang={lang}
								server={server}
								data={{
									dealId: deal._id,
									variant: "ghost",
									size: "sm",
									saveText: keywords.saveLater[lang],
									savedText: keywords.saved[lang],
								}}
							/>
						</StoreWrapper>
					</Card>

					{/* --------------- Comments ---------------- */}

					<CommentSectionWrapper
						lang={lang}
						slug={slug}
						server={server}
						style="mt-2"
						title="Discussion"
						commentCount={13}
						type="deal"
						docId={deal._id}
					/>
				</Card>
				{/* ------------ Right Side -------------- */}

				<Card className="col-span-12 p-2 lg:col-span-4">
					<RelatedDeals lang={lang} />
					<TopStoreWidget lang={lang} />
					<TopCategoriesWidget lang={lang} />
					<ShareToButton lang={lang} />
				</Card>
			</Card>
		</>
	);
};

export default SingleDeal;
