"use client";

import React from "react";
import Logo from "./custom/Logo";
import { Menu } from "./custom/Menu";
import SearchBar from "./custom/SearchBar";
import Profile from "./custom/Profile";
import MobileMenu from "./custom/MobileMenu.jsx";

const Navbar = () => {
	return (
		<nav>
			<div className="flex items-center justify-between gap-4">
				<Logo />
				<Menu />
				<div className="flex items-center justify-end gap-4">
					<SearchBar />
					<MobileMenu />
					<Profile />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
