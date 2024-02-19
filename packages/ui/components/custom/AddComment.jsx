"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCommentRefresh } from "../../store/slices/formSlice";

import { Card, CardContent } from "../ui/card";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { keywords } from "../../constants/keywords";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AddComment = ({ lang, id, type, server }) => {
	const dispatch = useDispatch();
	const [body, setBody] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const currUser = useSelector((state) => state.user.user);

	// console.log(currUser?.payload);

	const onSubmit = async () => {
		setIsLoading(true);

		if (!body || body.trim() === "") {
			setIsLoading(false);
			toast("Comment is empty", {
				description: "Please add something to comment",
			});
		}

		const res = await axios.post(`${server}/api/v1/comment/add-comment`, {
			docId: id,
			type: type,
			body: body,
		});

		const response = res.data;

		if (response.statusCode !== 200) {
			toast("Error", {
				description: `${response.message}. Please login to comment`,
			});
		}

		toast("Comment Added ✅", {
			description: `${response.data.body}`,
		});

		dispatch(toggleCommentRefresh());

		setBody("");
		setIsLoading(false);
	};

	const showLoginToast = () => {
		toast("Login Required", {
			description: "Please login to comment",
		});
	};

	return (
		// <Provider store={store}>
		<Card>
			<CardContent className="flex items-center">
				<div id="add-comment">
					<img
						src="https://avatars.githubusercontent.com/u/36113721?v=4"
						className="w-24 h-24 rounded-full"
					/>
				</div>

				<div className="grid w-full gap-2 mx-3 ">
					<Textarea
						disabled={!currUser}
						value={body}
						onChange={(e) => setBody(e.target.value)}
						placeholder={keywords.typeYourCommentHere[lang]}
						onFocus={() => {
							currUser
								? null
								: toast("Login Required", {
										description: "Please login to comment",
									});
						}}
						onClick={() => {
							currUser ? null : showLoginToast();
						}}
					/>
					<Button onClick={onSubmit} variant="secondary">
						{keywords.addComment[lang]}
					</Button>
				</div>
			</CardContent>
		</Card>
		// </Provider>
	);
};

export default AddComment;
