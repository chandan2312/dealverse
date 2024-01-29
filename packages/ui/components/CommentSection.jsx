"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

import SortByMenu from "./custom/SortByMenu";
import AddComment from "./custom/AddComment";
import CommentCard from "./custom/CommentCard";

import { keywords } from "../constants/keywords";

const ContentBox = ({
	lang,
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
						{commentCount
							? `${parseInt(commentCount)} ${keywords.comments[lang]}`
							: keywords.comments[lang]}
					</CardTitle>
					<SortByMenu lang={lang} />
				</CardHeader>

				<CardContent className={`${contentStyle}`}>
					<AddComment lang={lang} />
					<Separator className="my-6" />

					{comments.length ? (
						comments.map((comment) => {
							return <CommentCard lang={lang} key={comment.id} comment={comment} />;
						})
					) : (
						<p classname="w-full font-semibold text-center p-2">
							{keywords.noCommentsYet[lang]}
						</p>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default ContentBox;
