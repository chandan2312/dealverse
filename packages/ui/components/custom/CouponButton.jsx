import React from "react";
import { Button } from "../ui/button";

import { TicketPercent, ExternalLink } from "lucide-react";

import Link from "next/link";

import CouponShow from "./CouponShow";

const CouponButton = ({ ...props }) => {
	return (
		<>
			<div className="relative">
				{/* The first button */}
				<Button
					className={`relative z-10 bg-secondary ${props.className}`}
					variant={props.variant}
					size={props.size}
				>
					<TicketPercent />
					<span className="px-1">{props.text}</span>
				</Button>

				{/* The second button (with coupon code) */}
				<Button
					variant="outline"
					className="border-b-2 hover:bg-transparent text-end rounded-full absolute px-1 top-1/2 right-0 transform -translate-y-1/2  z-0"
					style={{
						marginRight: "-17%",
						width: "100px",

						overflow: "hidden",
					}}
				>
					<span className="couponcode text-end ml-auto pl-auto px-1 whitespace-no-wrap">
						FRRRR
					</span>
				</Button>
			</div>

			{/* <CouponShow couponCode="AMAZONF" /> */}

			<Button className={`bg-accent ml-8 rounded-full`}>
				<Link className="flex items-center" href={props.link}>
					<ExternalLink />
					<span className="px-1">Go to Offer</span>
				</Link>
			</Button>
		</>
	);
};

export default CouponButton;
