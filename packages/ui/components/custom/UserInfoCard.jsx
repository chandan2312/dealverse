import React from "react";
import { Card } from "../ui/card";
import IconAndText from "./IconAndText";
import Link from "next/link";

import { MessageSquareMore, CalendarDays, TicketPercent } from "lucide-react";

import { keywords } from "../../constants/keywords";
import langModule from "../../helpers/langModule";

const UserInfoCard = ({ ...props }) => {
	const lang = langModule.lang();
	return (
		<div className="flex gap-2 items-center shadow-none">
			<div>
				<img src={props.user.avatar} className="w-8 h-8 rounded-full" />
			</div>

			<div className="text-sm">
				<div className="text-xs flex items-center gap-1 pl-1">
					<span>{keywords.postedBy[lang]}</span>
					<Link
						className="font-semibold text-sm"
						href={`/user/${props.user.username}`}
					>{`${props.user.username}`}</Link>
				</div>
				<div className="text-xs text-slate-400 flex items-center gap-2">
					<IconAndText
						size="xs"
						variant="ghost"
						icon={<CalendarDays />}
						text={props.user.createdAt || 0}
						className="text-xs pr-2"
					/>

					<IconAndText
						size="xs"
						variant="ghost"
						icon={<TicketPercent />}
						text={props.user.dealCount || 0}
						className="text-xs  pr-2"
					/>

					<IconAndText
						size="xs"
						variant="ghost"
						icon={<MessageSquareMore />}
						text={props.user.commentCount || 0}
						className="text-xs  pr-2"
					/>
				</div>
			</div>
		</div>
	);
};

export default UserInfoCard;
