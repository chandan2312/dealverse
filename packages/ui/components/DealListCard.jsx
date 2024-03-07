import React from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import UpVoteButton from "./custom/UpVoteButton";
import UserInfoCard from "./custom/UserInfoCard";
import StoreWrapper from "./wrapper/StoreWrapper";
import { faker } from "@faker-js/faker";

import { Button } from "./ui/button";
import {
	Minus,
	Plus,
	Truck,
	Bookmark,
	MessageCircle,
	Tag,
	Copy,
	MonitorSmartphone,
	TicketPercent,
} from "lucide-react";
import { Input } from "./ui/input";

import { keywords } from "../constants/keywords";
import CouponButton from "./custom/CouponButton";
import Image from "next/image";
import Link from "next/link";
import SaveDealButton from "./custom/SaveDealButton";
import { History } from "lucide-react";
import dateConverter from "../helpers/dateConverter";

const DealListCard = ({ lang, server, className, deal }) => {
	return (
		<article
			key={deal._id}
			className={`${className} w-full relative
			 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-1  bg-primary mx-2 my-6`}
		>
			{deal?.offer && (
				<div className="ribbon-wrapper-green">
					<div className="ribbon-green">
						<span className=" ribbon-text">{deal.offer}</span>
					</div>
				</div>
			)}

			<div className="p-3 flex items-center gap-3">
				<div className="w-36 h-36 bg-secondary rounded-md flex flex-col justify-center items-center overflow-hidden">
					<Image
						src={
							deal?.images?.length
								? deal.images[0].fileUrl
								: deal?.store?.logo
									? deal.store.logo
									: faker.image.nature()
						}
						alt={`${deal.title} image`}
						width={56}
						height={56}
						className="w-full  m-auto p-auto object-cover p-1 "
					/>
				</div>
				<div className="w-full relative">
					<div className="flex mt-2 items-center justify-between">
						<div className="flex flex-grow items-center gap-1 text-xs ">
							<StoreWrapper>
								<UpVoteButton lang={lang} server={server} deal={deal} />
							</StoreWrapper>

							{deal?.count && (
								<div className="text-xs flex items-center gap-1">
									<Eye />${deal.count} views
								</div>
							)}

							<Separator orientation="vertical" />

							{deal?.category?.name ? (
								<Link href={`/${deal.category.slug}`} className="flex items-center ">
									<span className="px-1">
										{deal?.category?.icon ? deal.category.icon : ""}
									</span>
									<span className="text-muted-foreground ">{deal.category.name}</span>
								</Link>
							) : (
								""
							)}
						</div>

						<div className="flex gap-1 items-center justify-between">
							<StoreWrapper>
								<SaveDealButton
									lang={lang}
									server={server}
									data={{
										variant: "outline",
										size: "xs",
										className: "rounded-full",
									}}
									deal={deal}
									listView={true}
								/>
							</StoreWrapper>
							<Button size="xs" variant="ghost" className="rounded-full">
								<Link href={`/deal/${deal.slug}#add-comment`}>
									<MessageCircle />
								</Link>
							</Button>
						</div>
					</div>

					<div className="space-y-1 mt-2">
						{deal?.store && (
							<Link
								href={`/store/${deal?.store?.slug}`}
								className="flex items-center text-xs"
							>
								<span className="px-1">
									<Image
										src={deal?.store?.logo || faker.image.avatar()}
										alt={deal?.store?.name || "store"}
										width={16}
										height={16}
										className=" rounded-sm"
									/>
								</span>
								<span className="text-muted-foreground ">{deal?.store?.name}</span>
							</Link>
						)}
						<h2 className="text-xl max-md:text-lg font-semibold text-text1">
							<Link href={`/deal/${deal.slug}`}>{deal.title}</Link>
						</h2>
					</div>

					{/* <p className="text-sm text-text1">{description}</p> */}

					{/* ------------------- Pricing ---------------- */}

					<Card className="flex bg-transparent shadow-none items-center gap-2 text-sm pt-2">
						{deal?.discountPrice && (
							<div>
								<span className="font-semibold text-green-500 pl-1 ">
									{keywords.currency[lang]}
								</span>
								<span className=" text-green-500 ">{deal.discountPrice}</span>
							</div>
						)}

						<Separator orientation="vertical" />

						{deal?.deliveryPrice ? (
							<div className="text-slate-400 flex items-center gap-1">
								<span>
									<Truck />
								</span>
								<span className="">{deal.deliveryPrice}</span>
							</div>
						) : (
							<div className="text-muted-foreground flex items-center">
								<span className="pr-1">
									<Truck size="25" />
								</span>
								<span className="text-xs">
									{keywords.free[lang]}{" "}
									<span className="max-md:hidden">{keywords.delivery[lang]}</span>
								</span>
							</div>
						)}

						<Separator orientation="vertical" />
					</Card>

					<Card className="flex bg-transparent shadow-none justify-between items-center gap-2 text-sm mt-2 ">
						{/* ----------------------- Buttons --------------------- */}

						<div className="flex items-center">
							<Link
								href={`/user/${deal?.user?.username || ""}`}
								className="flex gap-2 items-center text-xs"
							>
								<span>
									<Image
										src={deal?.user?.avatar || faker.image.avatar()}
										alt={deal?.user?.username || "user"}
										width={16}
										height={16}
										className=" rounded-sm"
									/>
								</span>
								<span className="text-muted-foreground ">{deal?.user?.username}</span>
							</Link>
						</div>
						<div className="flex flex-grow gap-1 items-center justify-end">
							<Link href={`/deal/${deal.slug}`} className="">
								{deal.type == "Coupon" ? (
									<div className="relative mr-6">
										<Button
											className={`relative z-10 rounded-l-full hover:bg-accent2/50`}
											variant="accent2"
											size="sm"
										>
											<TicketPercent />
											<span className="px-1 text-sm">Get Coupon</span>
										</Button>

										<Button
											variant="outline"
											className="border-accent2 border-2 text-end rounded-full absolute px-1 top-1/2 right-0 transform -translate-y-1/2  z-0"
											style={{
												marginRight: "-17%",
												width: "100px",
												overflow: "hidden",
											}}
										>
											<span className="couponcode text-end ml-auto pl-auto px-1 whitespace-no-wrap">
												******
											</span>
										</Button>
									</div>
								) : (
									<Button
										className="px-8 mr-2 bg-accent hover:bg-accent  rounded-full text-sm"
										size="sm"
									>
										<Tag />

										<span className="px-1">{keywords.getDeal[lang]}</span>
									</Button>
								)}
							</Link>
						</div>
					</Card>
				</div>
			</div>
		</article>
	);
};

export default DealListCard;
