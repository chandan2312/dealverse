import React from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import UpVoteButton from "./custom/UpVoteButton";
import UserInfoCard from "./custom/UserInfoCard";

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

import { faker } from "@faker-js/faker";

import { keywords } from "../constants/keywords";

const DealListingCardNarrow = ({
	lang,
	className,
	title,
	description,
	category,
	...props
}) => {
	return (
		<Card className={`${className} relative rounded-md   mx-1 my-[6px]`}>
			<div className="ribbon-wrapper-green">
				<div className="ribbon-green">
					<span className=" ribbon-text">25% {keywords.off[lang]}</span>
				</div>
			</div>
			<CardContent className="flex items-center bg-secondary gap-2">
				<div className="w-16 h-16 bg-primary rounded-md flex flex-col justify-center items-center overflow-hidden">
					<img
						src={props.coverImage}
						alt="deal"
						className="w-auto h-auto m-auto object-cover "
					/>

					{props.offer ? (
						<div className="italic font-bold text-green-600  text-accent-foreground rounded-full p-1 pb-2">
							{props.offer}
						</div>
					) : (
						""
					)}
				</div>
				<div className="w-full relative">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1">
							<UpVoteButton upVote={10} iconSize={14} size="xs" />

							<Separator orientation="vertical" />

							<a href={props.storeLink} className="flex items-center text-sm">
								<span className="px-1">
									<img
										src={faker.image.avatar()}
										alt="avatar"
										className="w-4 h-4 rounded-full"
									/>
								</span>
								<span className="text-slate-400 text-xs ">{props.storeName}</span>
							</a>

							<Separator orientation="vertical" />

							{category?.name ? (
								<a href={`/${category.slug}`} className="flex items-center text-sm">
									<span className="px-1">{category.icon ? category.icon : ""}</span>
									<span className="text-slate-400 ">{category.name}</span>
								</a>
							) : (
								""
							)}
						</div>
					</div>

					<h2 className=" font-semibold text-primary-foreground">{title}</h2>

					{/* ------------------- Pricing ---------------- */}

					<Card className="flex bg-transparent shadow-none items-center gap-2 text-xs">
						<div className="flex gap-1 items-center">
							<span className=" text-green-500 pl-1 ">{keywords.currency[lang]}</span>
							<span className=" text-green-500 font-semibold">
								{props.discountPrice}
							</span>
						</div>

						<Separator orientation="vertical" />

						{props.deliveryPrice ? (
							<div className="text-slate-400 flex items-center gap-1">
								<span className="block">
									<Truck />
								</span>
								<div className="flex  items-center">
									<span className=" pl-1 ">{keywords.currency[lang]}</span>
									<span className="font-semibold">{props.deliveryPrice}</span>
								</div>
							</div>
						) : (
							<div className="text-slate-400 flex items-center">
								<span>
									<Truck size="25" />
								</span>
								<span className="">{keywords.free[lang]}</span>
							</div>
						)}

						<Separator orientation="vertical" />

						<a href={props.userAvatar} className="flex items-center gap-1">
							<span>
								<img
									src={faker.image.avatar()}
									alt={`${props.username} ${keywords.avatar[lang]}`}
									className="w-4 h-4 rounded-full"
								/>
							</span>
							<span className="text-slate-400 ">{props.username}</span>
						</a>
					</Card>

					<Card className="flex bg-transparent shadow-none justify-end items-center gap-1 text-sm mt-[2px] ">
						{/* ----------------------- Buttons --------------------- */}

						{props.type === "coupon" ? (
							<div className="ml-auto pl-auto flex justify-end">
								<form action="" className=" flex items-center flex-end justify-end">
									<Button
										size="xs"
										variant="overlay"
										className="px-2  hover:bg-accent absolute right-90 "
										type="submit"
									>
										<Copy size={14} />{" "}
									</Button>
									<Input
										readOnly
										className="mx-1 h-[26px] px-1  p-0 text-center text-xs rounded-full font-semibold pr-9 overflow-hidden line-clamp-1"
										value={props.couponCode}
									></Input>
								</form>
							</div>
						) : (
							""
						)}

						<Button className="bg-accent rounded-2xl px-1 py-[2px] text-sm" size="xs">
							{props.type === "coupon" ? (
								<TicketPercent size={16} />
							) : (
								<Tag size={16} />
							)}

							<span className="px-1 text-sm">
								{props.type === "coupon"
									? keywords.grabCoupon[lang]
									: keywords.getDeal[lang]}
							</span>
						</Button>

						<Button variant="outline" size="xs" className="p-1 rounded-full">
							<Bookmark size={16} />
						</Button>
						<Button variant="outline" size="xs" className="p-1 rounded-full">
							<MessageCircle size={16} />
						</Button>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
};

export default DealListingCardNarrow;
