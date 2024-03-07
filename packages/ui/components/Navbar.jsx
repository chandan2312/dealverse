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
import ThemeToggle from "./custom/ThemeToggle.jsx";
import { SearchPopup } from "./custom/SearchPopup.jsx";
import FormDialog from "./custom/FormDialog.jsx";
import { PlusSquare } from "lucide-react";
import AddDeal from "./form/AddDeal.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const Navbar = ({ lang, server }) => {
	const [inputFocused, setInputFocused] = useState(false);

	const currentMobileSearchState = useSelector(
		(state) => state.navbar.mobileSearchOpen
	);

	const toggleMobileSearch = (toggleState) => {
		setIsMobileSearchOpen(toggleState);
	};

	const handleInputBlur = () => {
		setInputFocused(false);
	};

	const dispatch = useDispatch();

	return (
		<>
			{/* <GoogleOAuthProvider clientId="806351833243-4bisladoofjrmovfr1paa2c3htnm7sqt.apps.googleusercontent.com"> */}
			<nav className="bg-slate-900 text-slate-100 lg:mb-3 lg:rounded-b-lg  md:py-2  px-2 md:px-4 lg:px-6  w-full ">
				{!currentMobileSearchState ? (
					<>
						<div className=" w-full max-md:py-2 flex items-center justify-between max-md:gap-2 gap-4">
							<div className="flex items-center gap-2 md:gap-3 lg:gap-4 justify-between">
								<MobileMenu lang={lang} />
								<Logo lang={lang} />
								<Menu lang={lang} />
							</div>

							<div className="flex items-center justify-end gap-1 md:gap-2 ">
								<div className="flex items-center gap-1">
									{/* <SearchInput
										lang={lang}
										placeholder={keywords.search[lang]}
										className="mx-2 max-md:hidden"
										includeClose={false}
										toggleFunction={toggleMobileSearch}
										isOpen={currentMobileSearchState}
										onBlur={handleInputBlur}
									/> */}
									{/* <Button
										size="xs"
										variant="ghost"
										onClick={() => dispatch(openMobileSearch())}
										className="max-md:hidden px-1"
									>
										<Search />
									</Button> */}

									<div className="max-md:hidden flex items-center">
										<FormDialog
											lang={lang}
											server={server}
											buttonText={
												<span className="px-2 flex gap-1 items-center">
													<PlusSquare strokeWidth={2} /> Add Deal
												</span>
											}
											title="Add New Deal"
											component={<AddDeal lang={lang} server={server} />}
											className="h-8 bg-primary hover:bg-accent2 text-primary-foreground hover:text-accent2-foreground border-primary  hover:border-accent2 border-2 rounded-full  px-1 mr-2"
											size="sm"
											variant="accent2"
										/>
									</div>

									<SearchPopup />
								</div>

								<ThemeToggle lang={lang} />

								<div className="max-md:hidden">
									<Profile lang={lang} server={server} />
								</div>
							</div>
						</div>
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
					</div>
				)}
			</nav>
			{/* </GoogleOAuthProvider> */}
		</>
	);
};

export default Navbar;
