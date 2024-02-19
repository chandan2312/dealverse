"use client";

import React, { forwardRef } from "react";
import { keywords } from "../../constants/keywords";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { set } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { closeMobileSearch } from "../../store/slices/navbarSlice";

const SearchInput = ({
	onBlur,
	lang,
	placeholder,
	className,
	value,
	isOpen,
	includeClose,
	toggleFunction,
	autoFocus,
}) => {
	const [input, setInput] = useState("");
	const [showPanel, setShowPanel] = useState(false);
	const [isFocused, setIsFocused] = useState(autoFocus);

	const dispatch = useDispatch();

	const handleClose = () => {
		setIsFocused(false);
		dispatch(closeMobileSearch());
	};

	const handleBlur = () => {
		setShowPanel(false);
		setIsFocused(false);
	};

	return (
		<div className="p-1 mx-auto ">
			<div className="mx-auto flex items-center justify-between relative">
				<Input
					className={`w-full flex-grow-0 bg-slate-100/20 dark:bg-slate-900/20   ${className}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setInput(e.target.value)}
					onFocus={() => setShowPanel(true)}
					onBlur={onBlur}
					autoFocus={isFocused}
				/>

				{includeClose ? (
					<Button className="rounded-full" size="sm" onClick={handleClose}>
						<X />
					</Button>
				) : (
					""
				)}
			</div>

			{showPanel ? (
				<div
					className="fixed p-2 rounded-b-lg shadow-lg  z-50 bg-slate-100 h-[80vh] mx-auto px-auto w-[100vw] md:w-[50vw] md:max-w-lg overflow-y-scroll"
					onFocus={() => setShowPanel(true)}
					onBlur={() => setShowPanel(false)}
					tabIndex={0}
				>
					Hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
					veritatis qui ducimus quos quas dolores quaerat illum vitae quae
					cupiditate?
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default SearchInput;
