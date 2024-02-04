import React from "react";
import { Card, CardContent } from "./ui/card";
import IconAndText from "./custom/IconAndText";
import { Clock10, Share2, MessageSquareMore, BellPlus } from "lucide-react";
import { keywords } from "../constants/keywords";
import { allCategories } from "../constants/constants";

import { Separator } from "./ui/separator";
import Link from "next/link";
import AvatarAndText from "./custom/AvatarAndText";
import { Bookmark } from "lucide-react";
import { MessageSquareDiff } from "lucide-react";

const DiscussionListCard = ({ lang }) => {
	return (
		<Card className="border rounded-lg  my-6">
			<CardContent className="flex flex-col gap-1 md:py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-0">
						<IconAndText
							size="xs"
							variant="ghost"
							icon={<MessageSquareMore />}
							text={`0 ${keywords.comments[lang]}`} //TODO: Add comment count
							textClassName="text-secondaryText"
						/>

						<Separator orientation="vertical" className="mx-1" />

						<Link
							href={"category/link"} //TODO: Add Link
						>
							<IconAndText
								size="xs"
								variant="ghost"
								icon={allCategories[0].icon}
								text={keywords[allCategories[0].value][lang]} //TODO: Add comment count
								textClassName="text-secondaryText"
							/>
						</Link>
					</div>

					<div className="flex item-center gap-3 justify-between">
						<IconAndText
							size="xs"
							variant="ghost"
							icon={<Clock10 />}
							text={
								<span>
									<span className="max-md:hidden">{keywords.postedOn[lang]}</span>
									12/12/2021
								</span>
							} //TODO: Add date
							textClassName="text-secondaryText"
						/>
					</div>
				</div>
				<div>
					<Link
						href={"/discussion/1"}
						//TODO: Add Link
					>
						<h2
							className="font-semibold text-primaryText text-lg"
							//TODO: Add Heading
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
							temporibus.
						</h2>
					</Link>
					<p
						className="text-sm text-primaryText  text-"
						//TODO: Add description
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore alias
						repellat adipisci pariatur voluptas ex veniam repudiandae itaque cumque.
						Nihil!
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 max-md:gap-1">
						<AvatarAndText
							link={"https://static.thenounproject.com/png/363640-200.png"} //TODO: Add avatar Link, alt, text, textLink
							width={5}
							height={5}
							alt={keywords.avatar[lang]}
							className=""
							imgClassName="w-5 h-5 rounded-full shadow-md"
							text={"raasika_1"}
							textClassName="text-sm"
							textLink={"/user/raasika_1"}
						/>
						<Separator orientation="vertical" className="mx-1" />
						<AvatarAndText
							link={"https://static.thenounproject.com/png/363640-200.png"} //TODO: Add avatar Link, alt, text, textLink
							width={5}
							height={5}
							alt={keywords.avatar[lang]}
							className=""
							imgClassName="w-5 h-5 rounded-full shadow-md"
							text={"raasika_1"}
							textClassName="text-sm"
							textLink={"/user/raasika_1"}
						/>
					</div>
					<div className="flex items-center gap-2  ">
						<IconAndText
							className="rounded-full"
							isHover={true}
							size="sm"
							icon={<MessageSquareDiff />}
							tooltip={keywords.reply[lang]}
							text={``}
							textClassName="text-secondaryText"
						/>
						<IconAndText
							className="rounded-full p-2"
							isHover={true}
							size="sm"
							icon={<Bookmark />}
							tooltip={keywords.save[lang]}
							text={``}
							textClassName="text-secondaryText"
						/>
						<IconAndText
							className="rounded-full"
							isHover={true}
							size="sm"
							icon={<BellPlus />}
							tooltip={keywords.addNotification[lang]}
							text={``}
							textClassName="text-secondaryText"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default DiscussionListCard;
