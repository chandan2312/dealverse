import { createSlice } from "@reduxjs/toolkit";

export const constantSlice = createSlice({
	name: "constants",
	initialState: {
		constants: {
			description: "description",
			postedOn: "Posted On",
			expiry: "Expiry",
		},
	},
	reducers: {
		addConstant: (state, action) => {
			state.constants = action.payload;
		},
	},
});

export const { addConstant } = constantSlice.actions;

export default constantSlice.reducer;
