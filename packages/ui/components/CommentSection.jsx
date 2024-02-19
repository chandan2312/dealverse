"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

import SortByMenu from "./custom/SortByMenu";
import AddComment from "./custom/AddComment";
import CommentCard from "./custom/CommentCard";
import { keywords } from "../constants/keywords";
import axios from "axios";
// import { Provider } from "react-redux";
// import { store } from "../store/index.js";

const CommentSection = ({
	lang,
	slug,
	server,
	commentCount,
	title,
	style,
	titleStyle,
	contentStyle,
	type,
	docId,
}) => {
	const commentRefresh = useSelector((state) => state.form.commentRefresh);

	const [comments, setComments] = useState([]);

	useEffect(() => {
		const handler = async () => {
			const res = await axios.post(`${server}/api/v1/deal/get-deal-comments`, {
				slug: slug,
			});
			setComments(res.data.data);
		};
		handler();
	}, [slug, commentRefresh]);

	// console.log(comments);
	console.log(commentRefresh);

	return (
		// <Provider store={store}>
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
				{comments?.length ? (
					comments.map((comment) => {
						return (
							<CommentCard
								lang={lang}
								server={server}
								key={comment._id}
								comment={comment}
								className=""
								type={type}
								docId={docId}
							/>
						);
					})
				) : (
					<p classname="w-full font-semibold text-center p-2">
						{keywords.noCommentsYet[lang]}
					</p>
				)}
			</CardContent>
		</Card>
		// </Provider>
	);
};

export default CommentSection;
