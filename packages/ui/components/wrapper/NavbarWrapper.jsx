"use client";

import React from "react";
import Navbar from "../Navbar.jsx";
import { Provider } from "react-redux";
import { store } from "../../store/index.js";

const NavbarWrapper = ({ lang }) => {
	return (
		<Provider store={store}>
			<Navbar lang={lang} />
		</Provider>
	);
};

export default NavbarWrapper;
