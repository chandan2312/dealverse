"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Separator } from "./ui/Separator";

import SortByMenu from "./custom/SortByMenu";
import AddComment from "./custom/AddComment";
import CommentCard from "./custom/CommentCard";

const ContentBox = ({
	commentCount,
	comments,
	title,
	style,
	titleStyle,
	contentStyle,
}) => {
	return (
		<>
			<Card className={` ${style}`}>
				<CardHeader className="flex flex-row items-center gap-3">
					<CardTitle className={`${titleStyle}`}>
						{commentCount ? `${commentCount} comments` : "Comments"}
					</CardTitle>
					<SortByMenu />
				</CardHeader>

				<CardContent className={`${contentStyle}`}>
					<AddComment />
					<Separator className="my-6" />

					{comments.length ? (
						comments.map((comment) => {
							return <CommentCard key={comment.id} comment={comment} />;
						})
					) : (
						<p classname="w-full font-semibold text-center p-2">No comments yet</p>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default ContentBox;
