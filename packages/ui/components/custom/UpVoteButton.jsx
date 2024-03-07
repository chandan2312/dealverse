"use client";

import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UpVoteButton = ({
	lang,
	server,
	deal,
	upVotes = 0,
	className,
	size = "sm",
	variant = "outline",
	iconSize = 18,
}) => {
	const user = useSelector((state) => state.user.user)?.payload;

	const [voted, setVoted] = useState(
		user
			? user?.votedDeals?.filter((dl) => dl.dealId === deal?._id)[0]?.voteType
			: null
	);
	const [voteCount, setVoteCount] = useState(deal?.upVotes || 0);

	useEffect(() => {
		setVoted(
			user
				? user?.votedDeals?.filter((dl) => dl.dealId === deal?._id)[0]?.voteType
				: null
		);

		setVoteCount(deal?.upVotes || 0);
	}, [deal, user?.votedDeals]);

	const addVote = async (voteType) => {
		const res = await axios.post(`${server}/api/v1/action/add-vote`, {
			dealId: deal?._id,
			voteType: voteType,
		});

		const response = res.data;

		if (response.statusCode !== 200) {
			toast("Error", {
				description: response.message,
			});
		}

		setVoteCount(response.data.voteCount);
		setVoted(response.data.voteType);

		toast("✅ Vote Added");
	};

	return (
		<Button
			size={`xs`}
			variant={`${variant}`}
			className={`${
				voted ? "bg-accent2 text-accent2-foreground" : "bg-pink-100"
			} rounded-xl border-2 border-accent2  ${className}`}
		>
			<Plus
				onClick={() => addVote("up")}
				size={iconSize}
				className={`${
					voted === "up" && "bg-primary text-primary-foreground"
				} hover:bg-primary hover:text-primary-foreground rounded-full`}
			/>
			<div className="px-2 font-bold text-primary-text hover:text-accent2-foreground">
				{voteCount}
			</div>
			<Minus
				onClick={() => addVote("down")}
				size={iconSize}
				className={`${
					voted === "down" && "bg-primary text-primary-foreground"
				} hover:bg-primary hover:text-primary-foreground rounded-full`}
			/>
		</Button>
	);
};

export default UpVoteButton;
