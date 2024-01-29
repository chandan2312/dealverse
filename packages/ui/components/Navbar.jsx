"use client";

import React from "react";
import Logo from "./custom/Logo";
import { Menu } from "./custom/Menu";
import SearchBar from "./custom/SearchBar";
import Profile from "./custom/Profile";
import MobileMenu from "./custom/MobileMenu.jsx";

import { keywords } from "../constants/keywords";

const Navbar = ({ lang }) => {
	return (
		<nav>
			<div className="flex items-center justify-between gap-4">
				<Logo lang={lang} />
				<Menu lang={lang} />
				<div className="flex items-center justify-end gap-4">
					<SearchBar lang={lang} />
					<MobileMenu lang={lang} />
					<Profile lang={lang} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
