import React from "react";
import { Card, CardContent } from "./ui/card";
// import TabList from "./custom/TabList";
// import ShareToButton from "./custom/ShareToButton";
import Link from "next/link";
import { keywords } from "../constants/keywords";
// import { publicProfilePageTabs } from "../constants/constants";
import { Button } from "./ui/button";
import { Tag, Users, Heart } from "lucide-react";
import IconAndText from "./custom/IconAndText";

const ProfileCard = ({ lang }) => {
	return (
		<Card>
			<CardContent className="flex items-center gap-4">
				<Card className="w-24 h-24 flex items-center justify-center">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
						alt="logo"
						className="rounded-full w-24 h-24 p-1 object-contain shadow-md"
					/>
				</Card>
				<Card className="flex-1 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h1
							className=" gap-3 font-semibold"
							//TODO: Change the username
						>
							<span className="font-semibold text-lg md:text-2xl">raasika_1 </span>
							<span className="max-md:block  text-secondaryText text-lg md:text-2xl">
								(Raasika Khadse)
							</span>
						</h1>

						<div className="flex items-center gap-2">
							<Button variant="accent" size="sm">
								<span className="px-2">Follow</span>
							</Button>
							<Button variant="outline" size="sm">
								Message
							</Button>
						</div>
					</div>

					<div className="flex items-center gap-4 max-md:gap-1 my-2">
						<IconAndText
							size="xs"
							variant="ghost"
							icon={<Tag />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deal count
							textClassName="text-secondaryText text-sm"
						/>
						<IconAndText
							size="xs"
							variant="ghost"
							icon={<Users />}
							text={`1,560 ${keywords.followers[lang]}`} //TODO: Add subscriber count
							textClassName="text-secondaryText  text-sm"
						/>
						<IconAndText
							size="xs"
							variant="ghost"
							icon={<Heart />}
							text={`76,539 ${keywords.likes[lang]}`} //TODO: Add likes count
							textClassName="text-secondaryText  text-sm"
						/>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
						vero.
					</p>
				</Card>
			</CardContent>
		</Card>
	);
};

export default ProfileCard;
