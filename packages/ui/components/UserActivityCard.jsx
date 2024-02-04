import React from "react";
import { Card, CardContent } from "./ui/card";
import IconAndText from "./custom/IconAndText";
import { Clock10, Share2, MessageSquareMore, BellPlus } from "lucide-react";
import { keywords } from "../constants/keywords";
import { allCategories } from "../constants/constants";

import { Separator } from "./ui/separator";
import Link from "next/link";
import AvatarAndText from "./custom/AvatarAndText";

import { Eye } from "lucide-react";
import { Button } from "./ui/button";

const UserActivityCard = ({ lang }) => {
	return (
		<Card className="border rounded-lg w-full p-3 ">
			<CardContent className="flex items-center gap-3 md:py-6">
				<Card className="w-24">
					<div className="min-w-24  max-w-24 flex bg-primary rounded-md items-center justify-center">
						<img
							src="https://w0.peakpx.com/wallpaper/454/32/HD-wallpaper-cubes-apple-cube-ios-iphone-mac-shape-square.jpg"
							alt=""
							className="min-w-24 max-w-24 h-auto overflow-hidden rounded-md"
						/>
					</div>
				</Card>

				{/* right side */}
				<Card className="flex flex-col gap-1 w-full">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-0">
							<IconAndText
								size="xs"
								variant="ghost"
								icon={<Eye />}
								text={`76 ${keywords.views[lang]}`} //TODO: Add views
								textClassName="text-secondaryText"
							/>
							<Separator orientation="vertical" className="mx-1" />

							<IconAndText
								size="xs"
								variant="ghost"
								icon={<MessageSquareMore />}
								text={`0 ${keywords.comments[lang]}`} //TODO: Add comment count
								textClassName="text-secondaryText"
							/>
						</div>

						<div>
							<Button
								//TODO: Add action type
								variant="accent"
								size="xs"
								className="flex py-1 items-center gap-1 rounded-full"
							>
								<span className="px-1 md:px-2 text-xs max-md:px-0 ">commented</span>
							</Button>
						</div>
					</div>
					<div>
						<Link
							href={"/discussion/1"}
							//TODO: Add Link
						>
							<h2
								className=" text-primaryText pl-2 text-lg "
								//TODO: Add line clamp
							>
								<b className="px-1 text-semibold">raasika_1</b>
								posted the deal
								<b className="px-1">25% Off On Apple Macbook M2 2023</b>
							</h2>
						</Link>
					</div>

					<div className="flex items-center mt-1 gap-1 justify-between">
						<IconAndText
							size="xs"
							variant="ghost"
							icon={<Clock10 size={16} />}
							text={`12/01/2023`} //TODO: Add date
							textClassName="text-secondaryText"
						/>
						<Separator orientation="vertical" className="mx-1" />

						<AvatarAndText
							link={
								"https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
							} //TODO: Add store avatar
							width={4}
							height={4}
							alt={keywords.avatar[lang]}
							className=""
							imgClassName="w-5 h-5 rounded-full shadow-md"
							text={"Amazon"} //TODO: Add store name
							textClassName="text-sm"
							textLink={"/store/amazon"} //TODO: Add store link
						/>
					</div>
				</Card>
			</CardContent>
		</Card>
	);
};

export default UserActivityCard;
