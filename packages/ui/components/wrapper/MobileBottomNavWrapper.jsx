"use client";

import React from "react";
import MobileBottomNav from "../MobileBottomNav.jsx";
import { Provider } from "react-redux";
import { store } from "../../store/index.js";

const MobileBottomNavWrapper = ({ lang }) => {
	return (
		<Provider store={store}>
			<MobileBottomNav lang={lang} />
		</Provider>
	);
};

export default MobileBottomNavWrapper;
