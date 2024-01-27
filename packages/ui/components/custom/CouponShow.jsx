"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useState } from "react";

import { Copy, CheckCheck } from "lucide-react";

const CouponShow = ({ couponCode }) => {
	const [inputValue, setInputValue] = useState(couponCode);
	const [isCopying, setIsCopying] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(inputValue);
		setIsCopying(true);
		setTimeout(() => {
			setIsCopying(false);
		}, 1000);
	};

	return (
		<div className="flex items-center relative">
			<Input
				className="rounded-full w-[180px] font-bold text-green-500 text-center overflow-hidden pr-12"
				placeholder="Enter text to copy"
				value={inputValue}
				readOnly
				disbaled={isCopying ? true : false}
			/>
			<Button
				variant="ghost"
				ml="2"
				onClick={handleCopy}
				className={`absolute right-0 top-0 bottom-0 rounded-full ${
					isCopying ? "hover:bg-green-500 bg-green-500" : "hover:bg-accent"
				}`}
			>
				{isCopying ? <CheckCheck /> : <Copy />}
			</Button>
		</div>
	);
};

export default CouponShow;
