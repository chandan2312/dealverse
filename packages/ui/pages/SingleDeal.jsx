import React from "react";

import TopStoreWidget from "../components/TopStoreWidget";
import TopCategoriesWidget from "../components/TopCategoriesWidget";
import DealInfoCard from "../components/DealInfoCard";
import RelatedDeals from "../components/RelatedDeals";
import CommentSection from "../components/CommentSection";

import { Card } from "../components/ui/card";

import ContentBox from "../components/custom/ContentBox";
import IconAndText from "../components/custom/IconAndText";

import { MessageSquare, Bookmark } from "lucide-react";

import { keywords } from "../constants/keywords";
import ShareToButton from "../components/custom/ShareToButton";

const SingleDeal = ({ server, lang }) => {
	console.log("Single Deal Comp");
	console.log("Language: ", lang);
	return (
		<>
			<Card className="text-mutedText grid grid-cols-12 mt-4 shadow-none">
				{/* ------------ Left Side -------------- */}
				<Card className="col-span-12 md:col-span-8 shadow-none">
					<DealInfoCard
						lang={lang}
						upVotes={10}
						commentCount={5}
						createdAt="12/12/2021"
						title="Apple iPhone 12 Pro Max - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?"
						discountPrice={129900}
						originalPrice={139900}
						storeName="Amazon"
						storeLink="https://www.amazon.in/"
						storeAvatar="https://cdn.iconscout.com/icon/free/png-256/free-amazon-2296099-1912058.png"
						expiryDate="12/12/2021"
					/>

					{/* <Separator /> */}
					{/* --------------- Description ---------------- */}

					<ContentBox
						lang={lang}
						style="mt-2"
						title={keywords.description[lang]}
						content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?"
					/>
					<Card className="flex items-center gap-2 p-3 ">
						<IconAndText
							size="sm"
							variant="ghost"
							className="px-1"
							icon={<MessageSquare />}
							text={keywords.addComment[lang]}
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							className="px-1"
							icon={<Bookmark />}
							text={keywords.saveLater[lang]}
						/>
					</Card>

					{/* --------------- Comments ---------------- */}

					<CommentSection
						lang={lang}
						style="mt-2"
						title="Discussion"
						commentCount={13}
						comments={[
							{
								id: 1,
								username: "raasika_1",
								userAvatar:
									"https://cdn.iconscout.com/icon/free/png-256/free-amazon-2296099-1912058.png",
								createdAt: "12/12/2021",
								body:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
								reactions: {
									likes: 10,
									laugh: 5,
									sad: 2,
									angry: 1,
									consfused: 0,
								},
								replies: [],
							},
							{
								id: 2,
								username: "raasika_2",
								userAvatar:
									"https://cdn.iconscout.com/icon/free/png-256/free-amazon-2296099-1912058.png",
								createdAt: "12/12/2021",
								body:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
								reactions: {
									likes: 10,
									laugh: 5,
									sad: 2,
									angry: 1,
									consfused: 0,
								},
								replies: [],
							},
							{
								id: 3,
								username: "raasika_3",
								userAvatar:
									"https://cdn.iconscout.com/icon/free/png-256/free-amazon-2296099-1912058.png",
								createdAt: "12/12/2021",
								body:
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
								reactions: {
									likes: 10,
									laugh: 5,
									sad: 2,
									angry: 1,
									consfused: 0,
								},
								replies: [],
							},
						]}
					/>
				</Card>
				{/* ------------ Right Side -------------- */}

				<aside className="col-span-12 md:col-span-4">
					<RelatedDeals lang={lang} />
					<TopStoreWidget lang={lang} />
					<TopCategoriesWidget lang={lang} />
					<ShareToButton lang={lang} />
				</aside>
			</Card>
		</>
	);
};

export default SingleDeal;
