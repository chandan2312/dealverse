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

const DealListingCard = ({
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
					<span className=" ribbon-text">25% Off</span>
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
								<span className="text-slate-400 ">{props.storeName}</span>
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
								<span>
									<Truck size="25" />
								</span>
								<span className="">Free</span>
							</div>
						)}

						<Separator orientation="vertical" />

						<a href={props.userAvatar} className="flex items-center">
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
										className="mx-1 h-6 p-0 text-center text-xs pl-1 rounded-full font-semibold pr-9"
										value={props.couponCode}
									></Input>
								</form>
							</div>
						) : (
							""
						)}

						<Button className="bg-accent rounded-2xl text-sm" size="xs">
							{props.type === "coupon" ? (
								<TicketPercent size={14} />
							) : (
								<Tag size={14} />
							)}

							<span className="px-1">
								{props.type === "coupon" ? "Grab Coupon" : "Get Deal"}
							</span>
						</Button>

						<Button size="sm" variant="outline" size="xs" className="rounded-full">
							<Bookmark size={14} />
						</Button>
						<Button size="sm" variant="outline" size="xs" className="rounded-full">
							<MessageCircle size={14} />
						</Button>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
};

export default DealListingCard;
