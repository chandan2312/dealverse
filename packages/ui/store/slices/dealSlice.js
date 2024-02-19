import { createSlice, nanoid } from "@reduxjs/toolkit";

export const dealSlice = createSlice({
	name: "deal",

	initialState: {
		deals: [
			{
				id: "1",
				name: "deal1",
				description: "desc1",
				price: 100,
			},
		],
		description: "",
		isSaved: false,
	},

	reducers: {
		addDeal: (state, action) => {
			//
		},

		removeDeal: (state, action) => {
			//
		},

		updateDeal: (state, action) => {
			//
		},

		getDeal: (state, action) => {
			//
		},

		addDescription: (state, action) => {
			state.description = action.payload;
		},

		setIsSaved: (state, action) => {
			state.isSaved = action.payload;
		},
	},
});

export const {
	addDeal,
	removeDeal,
	updateDeal,
	getDeal,
	addDescription,
	setIsSaved,
} = dealSlice.actions;

export default dealSlice.reducer;
