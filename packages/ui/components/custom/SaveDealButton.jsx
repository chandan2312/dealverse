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
import { set } from "date-fns";

const SaveDealButton = ({ lang, server, data, deal, listView = false }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user)?.payload;

	const isSaved = useSelector((state) => state.deal.isSaved);

	const [localSave, setLocalSave] = useState(false);

	// useEffect(() => {
	// 	setLocalSave(user ? user?.savedDeals.some((dl) => dl === deal?._id) : false);
	// }, []);

	useEffect(() => {
		setLocalSave(user ? user?.savedDeals.some((dl) => dl === deal?._id) : false);
		dispatch(setIsSaved(localSave));
	}, [deal, user?.savedDeals]);

	const handleSave = async () => {
		const res = await axios.post(`${server}/api/v1/action/save-deal`, {
			dealId: deal?._id,
		});

		const response = res.data;

		if (response.statusCode === 200) {
			if (response.data) {
				setLocalSave(true);
				if (!listView) dispatch(setIsSaved(true));
			} else {
				setLocalSave(false);
				if (!listView) dispatch(setIsSaved(false));
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
							variant={localSave || isSaved ? "accent2" : "ghost"}
							size={data?.size || "sm"}
							className={`${
								deal?.className
							} flex gap-1 rounded-full items-center justify-center cursor-pointer ${
								localSave || isSaved
									? "hover:bg-accent2 hover:text-accent2-foreground"
									: "hover:bg-transparent hover:text-mutedText"
							}  `}
						>
							<span className=" flex items-center gap-1">
								<Bookmark />{" "}
								{data.saveText && (
									<span className="pl-1">
										{localSave || isSaved ? data.savedText : data.saveText}
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
