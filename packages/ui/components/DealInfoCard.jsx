import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import ImageSlider from "./custom/ImageSlider";
import UpVoteButton from "./custom/UpVoteButton";
import IconAndText from "./custom/IconAndText";
import AvatarAndText from "./custom/AvatarAndText";
import DealButton from "./custom/DealButton";
import CouponButton from "./custom/CouponButton";
import UserInfoCard from "./custom/UserInfoCard";

import {
	Minus,
	Plu,
	Share2,
	MessageSquareMore,
	Truck,
	Percent,
	CalendarX2,
	MessageSquare,
	Bookmark,
} from "lucide-react";

import { keywords } from "../constants/keywords";

const DealInfoCard = ({ lang, ...props }) => {
	return (
		<>
			<Card className="grid grid-cols-12 gap-2 px-2">
				<Card className="col-span-12 md:col-span-4 lg:col-span-5 flex flex-col items-center  shadow-none">
					<ImageSlider />
				</Card>
				<Card className="col-span-12 md:col-span-8 lg:col-span-7 shadow-none">
					<Card className="flex items-center justify-between shadow-none">
						<UpVoteButton lang={lang} upVotes={props.upVotes} />

						<div className="flex items-center justify-center gap-1">
							<IconAndText
								size="sm"
								variant="ghost"
								icon={<Share2 />}
								text={keywords.share[lang]}
							/>
							<IconAndText
								size="sm"
								variant="ghost"
								icon={<MessageSquareMore />}
								text={props.commentCount}
							/>
							{/* <IconAndText
								size="sm"
								variant="ghost"
								className="px-1"
								icon={<MessageSquare />}
								text={"Add Comment"}
							/> */}
							<IconAndText
								size="sm"
								variant="ghost"
								className="px-1 bg-accent hover:bg-primary"
								icon={<Bookmark />}
								text={""}
							/>
						</div>
					</Card>

					<Card className="py-2 flex  items-center justify-between shadow-none ">
						<span className="block text-xs">
							{keywords.postedOn[lang]} {props.createdAt}
						</span>
						<div className="flex items-center gap-1 text-xs md:pr-4">
							<span>
								<CalendarX2 />
							</span>
							<span>{keywords.expiresOn[lang]}:</span>
							<span className="font-bold text-red-400">{props.expiryDate}</span>
						</div>
					</Card>
					<Card className="pb-1 flex flex-col items-start justify-start shadow-none ">
						<h1 className="text-xl font-semibold">{props.title}</h1>
					</Card>

					<Card className="py-1 flex justify-between gap-1 items-center shadow-none ">
						<div className="flex gap-1 items-center">
							<span className="text-red-500 text-xs ">{keywords.currency[lang]}</span>
							<span className="text-red-500 text-lg font-semibold">
								{props.discountPrice}
							</span>
							<Separator orientation="verticle" />

							<span className="text-xs ">{keywords.currency[lang]}</span>
							<span className=" font-semibold text-decoration-line: line-through">
								{props.originalPrice}
							</span>
						</div>
					</Card>

					<Card className="pb-1 flex gap-1 items-center shadow-none ">
						<IconAndText
							size="sm"
							variant="ghost"
							className="pl-0"
							icon={<Truck />}
							text={props.deliveryPrice ? props.deliveryPrice : keywords.free[lang]}
						/>
						<Separator orientation="verticle" />

						<AvatarAndText
							link={props.storeAvatar}
							width={4}
							height={4}
							alt={keywords.avatar[lang]}
							className=""
							imgClassName="w-5 h-5 rounded-full shadow-md"
							text={props.storeName && props.storeName}
							textClassName="text-sm"
							textLink={props.storeLink && props.storeLink}
						/>
					</Card>

					<Card className="pb-2 pt-1  flex gap-1 items-center shadow-none">
						{/* <DealButton
						lang={lang}
							className="bg-accent  rounded-full"
							variant="accent"
							text="Get Deal"
						/> */}

						<CouponButton
							lang={lang}
							className=" rounded-l-full"
							variant="accent"
							text={keywords.viewCoupon[lang]}
							link="https://www.amazon.in/"
						/>
					</Card>

					<Card className="shadow-none py-2">
						<UserInfoCard
							lang={lang}
							user={{
								avatar: "https://i.pravatar.cc/300",
								username: "rasikaa_",
								name: "Rasika Khadse",
								createdAt: "01/12/2024",
								dealCount: 9,
								commentCount: 23,
							}}
						/>
					</Card>
				</Card>
			</Card>
		</>
	);
};

export default DealInfoCard;
