"use client";

import React from "react";
import Navbar from "../Navbar.jsx";
import { Provider } from "react-redux";
import { store } from "../../store/index.js";

const NavbarWrapper = ({ lang, server }) => {
	return (
		<Provider store={store}>
			<Navbar lang={lang} server={server} />
		</Provider>
	);
};

export default NavbarWrapper;
