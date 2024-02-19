"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

import { TicketPercent, ExternalLink } from "lucide-react";

import Link from "next/link";

import CouponShow from "./CouponShow";

import { keywords } from "../../constants/keywords";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";
import { Check } from "lucide-react";
// import langModule from "../../helpers/langModule";

const CouponButton = ({ lang, data, deal }) => {
	const [couponCode, setCouponCode] = useState("*****");
	const [isCopying, setIsCopying] = useState(false);

	// const lang = langModule.lang();
	return (
		<>
			{couponCode === "*****" ? (
				<>
					<div className="relative mr-6">
						{/* The first button */}
						<Button
							onClick={() => {
								setCouponCode(deal.code);
								navigator.clipboard.writeText(deal.code);

								setIsCopying(true);

								setTimeout(() => {
									toast("✅ Coupon code copied", {
										description: "You can paste it at the checkout",
									});
								}, 1000);

								setTimeout(() => {
									setIsCopying(false);
								}, 2000);
							}}
							className={`relative z-10  ${data.className}`}
							variant={data.variant}
							size={data.size}
						>
							<TicketPercent />
							<span className="px-1">{data.text}</span>
						</Button>

						{/* The second button (with coupon code) */}
						<Button
							variant="outline"
							className="border-accent2 border border-b-2 text-end rounded-full absolute px-1 top-1/2 right-0 transform -translate-y-1/2  z-0"
							style={{
								marginRight: "-17%",
								width: "100px",
								overflow: "hidden",
							}}
						>
							<span className="couponcode text-end ml-auto pl-auto px-1 whitespace-no-wrap">
								{couponCode}
							</span>
						</Button>
					</div>
				</>
			) : (
				<>
					<Button
						variant="outline"
						className="flex gap-1 border-accent2 border border-b-2 text-left rounded-full  px-1  z-0"
						style={{
							minWidth: "100px",
							maxWidth: "200px",
							overflow: "hidden",
						}}
					>
						<span className="max-w-[170px] overflow-hidden couponcode text-left mr-auto pr-auto pl-1 whitespace-no-wrap">
							{couponCode}
						</span>

						<span
							aria-disabled={isCopying}
							onClick={() => {
								navigator.clipboard.writeText(deal.code);
								setIsCopying(true);
								toast("✅ Coupon code copied", {
									description: "🗒️ You can paste it at the checkout",
								});

								setTimeout(() => {
									setIsCopying(false);
								}, 2000);
							}}
							className={`${
								isCopying
									? "bg-green-500 hover:bg-green-500 hover:text-white text-white"
									: "hover:bg-background hover:text-foreground"
							} p-1 rounded-full  cursor-pointer`}
						>
							{isCopying ? <Check /> : <Clipboard />}
						</span>
					</Button>
				</>
			)}
		</>
	);
};

export default CouponButton;
