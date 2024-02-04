import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
	name: "navbar",
	initialState: {
		mobileSearchOpen: false,
		showPanel: false,
		input: "",
		themeMode: "light",
		inputOnBlue: () => {},
		panelOnBlur: () => {},
	},
	reducers: {
		openMobileSearch: (state) => {
			state.mobileSearchOpen = true;
		},
		closeMobileSearch: (state) => {
			state.mobileSearchOpen = false;
		},
		toggleMobileSearch: (state) => {
			state.mobileSearchOpen = !state.mobileSearchOpen;
		},
	},
});

export const { openMobileSearch, closeMobileSearch, toggleMobileSearch } =
	navbarSlice.actions;

export default navbarSlice.reducer;
