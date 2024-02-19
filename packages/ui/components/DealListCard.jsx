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

const DealListCard = ({ lang, server, className, deal }) => {
	return (
		<Card
			key={deal._id}
			className={`${className} w-full relative
			 shadow-md p-1 lg:p-3 bg-primary mx-1 my-3`}
		>
			<div className="ribbon-wrapper-green">
				<div className="ribbon-green">
					<span className=" ribbon-text">25% Off</span>
				</div>
			</div>

			<CardContent className="p-0 flex items-center gap-3">
				<div className="w-36 h-36 bg-secondary rounded-md flex flex-col justify-center items-center overflow-hidden">
					<Image
						src={
							deal?.images.length
								? deal.images[0].fileUrl
								: deal?.store?.logo
									? deal.store.logo
									: faker.image.nature()
						}
						alt={`${deal.title} image`}
						width={32}
						height={32}
						className="w-auto h-auto m-auto p-auto object-cover p-1 "
					/>
				</div>
				<div className="w-full relative">
					<div className="flex mt-2 items-center justify-between">
						<div className="flex items-center gap-1 text-xs ">
							<StoreWrapper>
								<UpVoteButton upVote={deal?.upVotes || 0} />
							</StoreWrapper>

							<Separator orientation="vertical" />

							<Link
								href={`/store/${deal?.store?.slug}`}
								className="flex items-center "
							>
								<span className="px-1">
									<Image
										src={deal?.store?.logo || faker.image.avatar()}
										alt={deal?.store?.name || "store"}
										width={8}
										height={8}
										className=" rounded-full"
									/>
								</span>
								<span className="text-slate-400 ">{deal?.store?.name}</span>
							</Link>

							<Separator orientation="vertical" />

							{deal?.category?.name ? (
								<Link href={`/${deal.category.slug}`} className="flex items-center ">
									<span className="px-1">
										{deal?.category?.icon ? deal.category.icon : ""}
									</span>
									<span className="text-slate-400 ">{deal.category.slug}</span>
								</Link>
							) : (
								""
							)}
						</div>
					</div>

					<h2 className="text-xl max-md:text-lg font-semibold text-text1">
						<Link href={`/deal/${deal.slug}`}>{deal.title}</Link>
					</h2>
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
							<div className="text-slate-400 flex items-center">
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

						<a
							href={`/user/${deal.user.username}`}
							className="flex gap-1 items-center text-xs"
						>
							<span>
								<Image
									src={deal.user?.avatar || faker.image.avatar()}
									alt={deal.user.username}
									width={8}
									height={8}
									className="w-4 h-4 rounded-full"
								/>
							</span>
							<span className="text-slate-400 ">{deal.username}</span>
						</a>
					</Card>

					<Card className="flex bg-transparent shadow-none justify-end items-center gap-2 text-sm mt-2 ">
						{/* ----------------------- Buttons --------------------- */}

						{deal.type == "Coupon" ? (
							<CouponButton
								lang={lang}
								data={{
									className: "rounded-l-full ",
									variant: "secondary",
									size: "sm",
									text: keywords.viewCoupon[lang],
								}}
								deal={{
									code: deal.code,
								}}
							/>
						) : (
							""
						)}

						{deal.type === "Deal" ? (
							<Button className="px-8 mr-2 bg-accent  rounded-full text-sm" size="sm">
								{deal.type === "Coupon" ? <TicketPercent /> : <Tag />}

								<span className="px-1">
									{deal.type === "Coupon"
										? keywords.grabCoupon[lang]
										: keywords.getDeal[lang]}
								</span>
							</Button>
						) : (
							""
						)}

						<Button size="sm" variant="outline" className="rounded-full">
							<Bookmark />
						</Button>
						<Button size="sm" variant="outline" className="rounded-full">
							<MessageCircle />
						</Button>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
};

export default DealListCard;
