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
	},
});

export const { addDeal, removeDeal, updateDeal, getDeal } = dealSlice.actions;

export default dealSlice.reducer;
