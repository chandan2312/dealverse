"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openMobileSearch } from "../store/slices/navbarSlice";

import { useState, useRef, useEffect } from "react";

import { Button } from "./ui/button";

import Logo from "./custom/Logo";
import { Menu } from "./custom/Menu";
import SearchBar from "./custom/SearchBar";
import Profile from "./custom/Profile";
import MobileMenu from "./custom/MobileMenu.jsx";

import { keywords } from "../constants/keywords";
import SearchInput from "./custom/SearchInput.jsx";

import { Search } from "lucide-react";
import { set } from "react-hook-form";
import { Separator } from "./ui/separator.jsx";

const Navbar = ({ lang }) => {
	const [inputFocused, setInputFocused] = useState(false);

	const currentMobileSearchState = useSelector(
		(state) => state.component.mobileSearchOpen
	);

	// useEffect(() => {
	// 	function updateMobileSearchState() {
	// 		console.log("currentMobileSearchState");
	// 		console.log(currentMobileSearchState);
	// 		setIsMobileSearchOpen(currentMobileSearchState);
	// 	}
	// 	updateMobileSearchState();
	// }, [currentMobileSearchState, isMobileSearchOpen]);

	// const currentMobileSearchState = useSelector((state) => {
	// 	setIsMobileSearchOpen(state.component.mobileSearch);
	// 	return state.component.mobileSearch;
	// });

	// console.log(currentMobileSearchState);

	// useEffect(() => {
	// 	setIsMobileSearchOpen(currentMobileSearchState);
	// }, [currentMobileSearchState]);

	const toggleMobileSearch = (toggleState) => {
		setIsMobileSearchOpen(toggleState);
	};

	const handleInputBlur = () => {
		setInputFocused(false);
	};

	const dispatch = useDispatch();

	return (
		<>
			<nav className="py-[2px] px-2 md:px-4 lg:px-6  w-full ">
				{!currentMobileSearchState ? (
					<>
						<div className=" w-full flex items-center justify-between gap-4">
							<div className="flex items-center gap-4 justify-between">
								<Logo lang={lang} />
								<Menu lang={lang} />
							</div>

							<div className="flex items-center justify-end gap-2">
								<div className="flex items-center gap-1">
									<SearchInput
										lang={lang}
										placeholder={keywords.search[lang]}
										className="m-2 max-md:hidden"
										includeClose={false}
										toggleFunction={toggleMobileSearch}
										isOpen={currentMobileSearchState}
										onBlur={handleInputBlur}
									/>
									<Button
										size="sm"
										variant="outline"
										onClick={() => dispatch(openMobileSearch())}
										className="md:hidden"
									>
										<Search />
									</Button>
								</div>

								<MobileMenu lang={lang} />
								<Profile lang={lang} />
							</div>
						</div>
						<Separator orientation="horizontal" className="mb-3" />
					</>
				) : (
					<div>
						<SearchInput
							lang={lang}
							placeholder={keywords.search[lang]}
							className="m-2"
							includeClose={true}
							toggleFunction={toggleMobileSearch}
							isOpen={currentMobileSearchState}
							onBlur={handleInputBlur}
							autoFocus={true}
						/>
						<Separator orientation="horizontal" className="mb-3" />
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
