"use client";

import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { keywords } from "../../constants/keywords";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { setIsSaved } from "../../store/slices/dealSlice";

const SaveDealButton = ({ lang, server, data }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user)?.payload;

	const isSaved = useSelector((state) => state.deal.isSaved);

	useEffect(() => {
		setIsSaved(
			user ? user?.savedDeals.some((deal) => deal === data.dealId) : false
		);
	}, [data?.dealId, user?.savedDeals]);

	const handleSave = async () => {
		const res = await axios.post(`${server}/api/v1/action/save-deal`, {
			dealId: data.dealId,
		});

		const response = res.data;

		if (response.statusCode === 200) {
			if (response.data) {
				dispatch(setIsSaved(true));
			} else {
				dispatch(setIsSaved(false));
			}
			toast(response.message);
		}

		if (response.statusCode !== 200) {
			if (response.statusCode === 500) {
				toast(response.message, {
					description: response.data,
				});
			} else {
				toast("Error", {
					description: response.message,
				});
			}
		}
	};

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							onClick={handleSave}
							variant={isSaved ? "accent2" : "ghost"}
							size={data?.size || "sm"}
							className={`flex gap-1 rounded-md items-center justify-center cursor-pointer ${
								isSaved
									? "hover:bg-accent2 hover:text-accent2-foreground"
									: "hover:bg-transparent hover:text-mutedText"
							}  `}
						>
							<span className=" flex items-center gap-1">
								<Bookmark />{" "}
								{data.saveText && (
									<span className="pl-1">
										{isSaved ? data.savedText : data.saveText}
									</span>
								)}
							</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{keywords.save[lang]} </p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default SaveDealButton;
