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
import dateConverter from "../helpers/dateConverter";
import { TicketPercent } from "lucide-react";
import { Tag } from "lucide-react";
import Link from "next/link";
import SaveDealButton from "./custom/SaveDealButton";
import axios from "axios";
import StoreWrapper from "./wrapper/StoreWrapper";

const DealInfoCard = async ({ lang, server, deal }) => {
	return (
		<>
			<Card className="grid grid-cols-12 gap-2 px-2">
				<Card className="col-span-12 md:col-span-4 lg:col-span-5 flex flex-col items-center  shadow-none">
					<ImageSlider images={deal.images} />
				</Card>
				<Card className="col-span-12 flex flex-col gap-3 lg:gap-5 justify-between md:col-span-8 lg:col-span-7 shadow-none">
					{/* --------------- Part 1 buttons & date ----------------- */}
					<div>
						<Card className="flex items-center justify-between shadow-none">
							<StoreWrapper>
								<UpVoteButton lang={lang} server={server} deal={deal} />
							</StoreWrapper>

							<div className="flex items-center justify-center gap-1">
								<IconAndText
									size="sm"
									variant="ghost"
									icon={<Share2 />}
									text={keywords.share[lang]}
									isHover={true}
								/>
								<Button variant="ghost" size="sm" className="hover:bg-accent2">
									<Link
										href="#add-comment"
										className="flex gap-1 items-center p-1 text-xs"
									>
										<MessageSquare />
									</Link>
								</Button>

								<StoreWrapper>
									<SaveDealButton
										lang={lang}
										server={server}
										data={{
											variant: "ghost",
											size: "sm",
										}}
										deal={deal}
									/>
								</StoreWrapper>
							</div>
						</Card>

						<Card className="py-2 flex  items-center justify-between shadow-none ">
							<span className="block text-xs">
								{keywords.postedOn[lang]}{" "}
								<span className="font-semibold">{dateConverter(deal.createdAt)}</span>
							</span>
							{deal?.expiryDate && (
								<div className="flex items-center gap-1 text-xs md:pr-4">
									<span>
										<CalendarX2 />
									</span>
									<span>{keywords.expiresOn[lang]}:</span>
									<span className="font-bold text-red-400">{deal?.expiryDate}</span>
								</div>
							)}
						</Card>
					</div>

					{/* --------------- Part 2 title & coupon buttons ----------------- */}

					<div>
						<Card className="pb-1 flex flex-col items-start justify-start shadow-none ">
							<h1 className="text-xl font-semibold">{deal.title}</h1>
						</Card>

						{deal.discountPrice && (
							<Card className="my=0 flex justify-between gap-1 items-center shadow-none ">
								<div className="flex gap-1 items-center">
									<span className="text-red-500 text-xs ">
										{keywords.currency[lang]}
									</span>
									<span className="text-red-500 text-lg font-semibold">
										{deal.discountPrice}
									</span>
									{deal.originalPrice && (
										<>
											{" "}
											<Separator orientation="vertical" />
											<span className="text-xs ">{keywords.currency[lang]}</span>
											<span className=" font-semibold text-decoration-line: line-through">
												{deal.originalPrice}
											</span>
										</>
									)}
								</div>
							</Card>
						)}

						<Card className="pb-1 my-0 flex gap-1 items-center shadow-none ">
							<IconAndText
								size="sm"
								variant="ghost"
								className="pl-0"
								icon={<Truck />}
								text={deal.deliveryPrice ? deal.deliveryPrice : keywords.free[lang]}
							/>
							<Separator orientation="vertical" />

							<AvatarAndText
								link={deal?.store?.logo}
								width={4}
								height={4}
								alt={keywords.avatar[lang]}
								className=""
								imgClassName="w-5 h-5 rounded-full shadow-md"
								text={deal?.store?.name && deal.store.name}
								textClassName="text-sm"
								textLink={deal?.store?.slug && `/store/${deal.store.slug}`}
							/>
						</Card>

						<Card className="py-3 pt-1  flex gap-2 md:gap-3 lg:gap-4 items-center shadow-none">
							{/* <DealButton
						lang={lang}
							className="bg-accent  rounded-full"
							variant="accent"
							text="Get Deal"
						/> */}

							{deal.type == "Coupon" ? (
								<CouponButton
									lang={lang}
									data={{
										className: "rounded-l-full",
										variant: "accent2",
										size: "sm",
										text: keywords.viewCoupon[lang],
									}}
									deal={deal}
								/>
							) : (
								""
							)}

							<Button
								className="flex gap-1 px-4 rounded-full"
								variant="accent"
								size="sm"
							>
								<Link
									href={`/link/${deal._id}`}
									target="_blank"
									className="flex gap-1 px-4 rounded-full"
								>
									{deal.type === "Coupon" ? (
										<>
											<TicketPercent /> Go To Offer
										</>
									) : (
										<>
											<Tag /> Go To Deal
										</>
									)}
								</Link>
							</Button>
						</Card>
					</div>

					<Card className="shadow-none py-2">
						<UserInfoCard
							lang={lang}
							user={{
								avatar: "https://i.pravatar.cc/300",
								username: deal.user.username,
								name: deal.user.fullName,
								createdAt: dateConverter(deal.user.createdAt),
								dealCount: deal.user.dealCount,
								commentCount: deal.user.commentCount,
							}}
						/>
					</Card>
				</Card>
			</Card>
		</>
	);
};

export default DealInfoCard;
