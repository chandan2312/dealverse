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

const DealListCard = ({
	lang,
	className,
	title,
	description,
	category,
	...props
}) => {
	return (
		<Card
			className={`${className} relative
			 shadow-md p-1 lg:p-3 bg-primary mx-1 my-3 h-[250px]`}
		>
			<div className="ribbon-wrapper-green">
				<div className="ribbon-green">
					<span className=" ribbon-text">25% Off</span>
				</div>
			</div>

			<CardContent className="p-0 flex items-center gap-3">
				<div className="w-36 h-36 bg-secondary rounded-md flex flex-col justify-center items-center overflow-hidden">
					<img
						src={props.coverImage}
						alt="deal"
						className="w-auto h-auto m-auto p-auto object-cover p-1 "
					/>
				</div>
				<div className="w-full relative">
					<div className="flex mt-2 items-center justify-between">
						<div className="flex items-center gap-1 text-xs ">
							<UpVoteButton upVote={10} />

							<Separator orientation="vertical" />

							<a href={props.storeLink} className="flex items-center ">
								<span className="px-1">
									<img
										src={faker.image.avatar()}
										alt="avatar"
										className="w-4 h-4 rounded-full"
									/>
								</span>
								<span className="text-slate-400 ">{props.storeName}</span>
							</a>

							<Separator orientation="vertical" />

							{category?.name ? (
								<a href={`/${category.slug}`} className="flex items-center ">
									<span className="px-1">{category.icon ? category.icon : ""}</span>
									<span className="text-slate-400 ">
										{keywords[category.slug][lang]}
									</span>
								</a>
							) : (
								""
							)}
						</div>
					</div>

					<h2 className="text-xl max-md:text-lg font-semibold text-text1">
						{title}
					</h2>
					<p className="text-sm text-text1">{description}</p>

					{/* ------------------- Pricing ---------------- */}

					<Card className="flex bg-transparent shadow-none items-center gap-2 text-sm pt-2">
						<div>
							<span className="font-semibold text-green-500 pl-1 ">
								{props.currency}
							</span>
							<span className=" text-green-500 ">{props.discountPrice}</span>
						</div>

						<Separator orientation="vertical" />

						{props.deliveryPrice ? (
							<div className="text-slate-400 flex items-center gap-1">
								<span>
									<Truck />
								</span>
								<span className="">{props.deliveryPrice}</span>
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

						<a href={props.userAvatar} className="flex gap-1 items-center text-xs">
							<span>
								<img
									src={faker.image.avatar()}
									alt="avatar"
									className="w-4 h-4 rounded-full"
								/>
							</span>
							<span className="text-slate-400 ">{props.username}</span>
						</a>
					</Card>

					<Card className="flex bg-transparent shadow-none justify-end items-center gap-2 text-sm mt-2 ">
						{/* ----------------------- Buttons --------------------- */}

						{props.type === "coupon" ? (
							<div className="ml-auto pl-auto flex justify-end">
								<form action="" className=" flex items-center flex-end justify-end">
									<Button
										size="sm"
										variant="overlay"
										className="px-2  hover:bg-accent absolute right-90 "
										type="submit"
									>
										<Copy />{" "}
									</Button>
									<Input
										readOnly
										className="mx-1 text-center font-semibold pr-9"
										value={props.couponCode}
									></Input>
								</form>
							</div>
						) : (
							""
						)}

						<Button className="bg-accent rounded-2xl text-sm" size="sm">
							{props.type === "coupon" ? <TicketPercent /> : <Tag />}

							<span className="px-1">
								{props.type === "coupon"
									? keywords.grabCoupon[lang]
									: keywords.getDeal[lang]}
							</span>
						</Button>

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
