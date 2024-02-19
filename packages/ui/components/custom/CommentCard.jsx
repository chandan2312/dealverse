"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import dateConverter from "../../helpers/dateConverter";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Reply } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { toggleCommentRefresh } from "../../store/slices/formSlice";
import WarningDialog from "./WarningDialog";
import { Trash2 } from "lucide-react";
import { UseSelector } from "react-redux";

const CommentCard = ({
	lang,
	server,
	key,
	comment,
	className,
	type,
	docId,
}) => {
	const dispatch = useDispatch();
	const currUser = useSelector((state) => state.user.user)?.payload;
	const [commentBody, setCommentBody] = useState("");

	const handleReply = async (id) => {
		if (!commentBody || commentBody.trim() === "") {
			toast("Please Add Some Text before submitting ⚠️");
		}

		const res = await axios.post(`${server}/api/v1/comment/add-comment`, {
			parent: id,
			body: commentBody,
			type: type,
			docId: docId,
		});

		const response = res.data;
		if (response.statusCode !== 200) {
			toast("Error ❌", {
				description: response.message,
			});
		}

		toast("Reply Added ✅", {
			description: `${response.data.body}`,
		});

		dispatch(toggleCommentRefresh());
	};

	const handleDelete = async (commentId) => {
		console.log("comment id");
		console.log(commentId);
		const res = await axios.post(`${server}/api/v1/comment/delete-comments`, {
			idsToDelete: [commentId],
		});

		const response = res.data;
		if (response.statusCode !== 200) {
			toast("Error ❌", {
				description: response.message,
			});
		}

		toast("Comment Deleted ✅", {
			description: `${response.message}`,
		});

		dispatch(toggleCommentRefresh());
	};

	return (
		<Card key={key}>
			<CardContent className={`py-2 pr-0 mr-0 border-s-2  my-3 ${className}`}>
				<Card className="p-2 bg-secondary border-2 border-muted text-secondary-foreground rounded-2xl">
					<div className="flex gap-3 items-center justify-between">
						<div className="flex items-center gap-2">
							<Image
								src={
									comment?.user?.avatar ? comment.user.avatar : "/assets/no-avatar.svg"
								}
								width={6}
								height={6}
								className="w-6 shadow-lg rounded-full"
								alt={comment.username || "user"}
							/>

							<h5 className="font-semibold text-sm">
								{comment?.user?.username && comment.user.username}
							</h5>
							<span className="block text-muted-foreground text-xs">
								{dateConverter(comment.createdAt)}
							</span>
						</div>

						<div className="flex  items-center">
							{/* <IconAndText size="xs" variant="ghost" icon={<Heart />} text={""} /> */}

							<Dialog>
								<DialogTrigger asChild>
									<Button variant="ghost" size="xs" className="flex items-center gap-1">
										<ReplyAll />
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[520px] text-left">
									<DialogHeader>
										<DialogTitle className="text-left text-base font-normal">
											Reply To Comment
										</DialogTitle>
										<DialogDescription className="space-y-1">
											<div className="text-sm text-left font-semibold">{comment.body}</div>
											<div className="text-xs text-right">
												- by {comment?.user?.username && comment.user.username}
											</div>
										</DialogDescription>
									</DialogHeader>
									<div className=" py-4">
										<div className=" flex items-center justify-center">
											<Textarea
												onChange={(e) => setCommentBody(e.target.value)}
												id="body"
												defaultValue=""
												value={commentBody}
												className="col-span-3"
											/>
										</div>
									</div>
									<DialogFooter>
										<div
											onClick={() => handleReply(comment._id)}
											className="flex items-center justify-end  gap-1"
										>
											<Button type="submit" className="px-3 rounded-full  ">
												<Reply />
												Reply
											</Button>
										</div>
									</DialogFooter>
								</DialogContent>
							</Dialog>

							{/* {comment.user._id == currUser._id && (
								<WarningDialog
									lang={lang}
									data={{
										onClick: () => handleDelete(comment._id),
										title: "Delete Comment",
										description: "Are you sure you want to delete this comment?",
										actionButton: "Delete",
										buttonText: <Trash2 />,
										buttonClass: "hover:bg-destructive hover:text-destructive-foreground",
										buttonVariant: "ghost",
										buttonSize: "xs",
									}}
								/>
							)} */}

							{/* <Button size="xs" variant="ghost">
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
							</Button> */}
						</div>
					</div>
					<div className=" pl-8">
						<div
							className="text-sm"
							dangerouslySetInnerHTML={{ __html: comment.body }}
						></div>
					</div>
				</Card>
				{/* //reply */}
				<div className="pl-1">
					{comment?.replies?.length
						? comment.replies.map((com) => {
								return (
									<CommentCard
										lang={lang}
										server={server}
										key={com._id}
										comment={com}
										className=""
										type={type}
										docId={docId}
									/>
								);
							})
						: ""}
				</div>
			</CardContent>
		</Card>
	);
};

export default CommentCard;
