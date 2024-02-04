import React from "react";
import { keywords } from "../../constants/keywords";
import { Card, CardContent, CardTitle } from "../ui/card";
import IconAndText from "./IconAndText";
import { Zap } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { Separator } from "../ui/separator";

const UserStats = ({ lang }) => {
	return (
		<Card className="border rounded-lg shadow-sm m-1">
			<CardTitle className="p-2">
				<h2 className="text-2xl font-semibold flex gap-1">
					{" "}
					<BarChart2 />
					<span className=""></span>
					{keywords.statistics[lang]}
				</h2>
			</CardTitle>

			<CardContent>
				<Card>
					<CardTitle>
						<h4 className="text-lg font-semibold">{keywords.posts[lang]}</h4>
					</CardTitle>
					<CardContent>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
					</CardContent>
				</Card>
				<Separator orientation="horizontal" className="my-3" />
				<Card>
					<CardTitle>
						<h4 className="text-lg font-semibold">{keywords.posts[lang]}</h4>
					</CardTitle>
					<CardContent>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Zap />}
							text={`99 ${keywords.deals[lang]}`} //TODO: Add deals count
							textClassName="text-secondaryText text-base"
						/>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
};

export default UserStats;
