import React from "react";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import IconAndText from "./IconAndText";

import { keywords } from "../../constants/keywords";

import {
	Heart,
	ReplyAll,
	MoreHorizontal,
	Clipboard,
	AlertTriangle,
} from "lucide-react";

import Link from "next/link";

const CommentCard = ({ lang, comment, className }) => {
	return (
		<Card>
			<CardContent className={`p-3 ${className}`}>
				<div className="flex gap-3 items-center justify-between">
					<div className="flex items-center gap-2">
						<img
							src={comment.userAvatar}
							className="w-12 shadow-lg rounded-full"
							alt={comment.username}
						/>
						<div>
							<h5 className="font-semibold text-sm">{comment.username}</h5>
							<span className="block text-xs">{comment.createdAt}</span>
						</div>
					</div>

					<div className="flex gap-1 items-center">
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<Heart />}
							text={keywords.like[lang]}
						/>
						<IconAndText
							size="sm"
							variant="ghost"
							icon={<ReplyAll />}
							text={keywords.reply[lang]}
						/>

						<Button size="sm" variant="ghost">
							<Popover className="bg-primary">
								<PopoverTrigger>
									<MoreHorizontal />
								</PopoverTrigger>
								<PopoverContent>
									<Link href="/report" className="w-full bg-primary hover:bg-secondary">
										<IconAndText
											size="sm"
											variant="ghost"
											className="px-1 hover:bg-transparent"
											icon={<AlertTriangle />}
											text={keywords.report[lang]}
										/>
									</Link>
									<Link
										href="/copy-link-of-comment"
										className="w-full bg-primary hover:bg-secondary"
									>
										<IconAndText
											size="sm"
											variant="ghost"
											className="px-1  hover:bg-transparent"
											icon={<Clipboard />}
											text={keywords.copyCommentLink[lang]}
										/>
									</Link>
								</PopoverContent>
							</Popover>
						</Button>
					</div>
				</div>

				<div className="py-2 px-3">
					<div
						className="text-sm"
						dangerouslySetInnerHTML={{ __html: comment.body }}
					></div>
				</div>
			</CardContent>

			<Separator className="my-2" />
		</Card>
	);
};

export default CommentCard;
