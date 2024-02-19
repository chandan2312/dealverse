"use client";

import React from "react";
import MobileBottomNav from "../MobileBottomNav.jsx";
import { Provider } from "react-redux";
import { store } from "../../store/index.js";

const MobileBottomNavWrapper = ({ lang, server }) => {
	return (
		<Provider store={store}>
			<MobileBottomNav lang={lang} server={server} />
		</Provider>
	);
};

export default MobileBottomNavWrapper;
