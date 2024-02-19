import { createSlice, nanoid } from "@reduxjs/toolkit";

export const textEditorSlice = createSlice({
	name: "editor",

	initialState: {
		content: "",
	},

	reducers: {
		addContent: (state, action) => {
			state.content = action.payload;
		},
	},
});

export const { addContent } = textEditorSlice.actions;

export default textEditorSlice.reducer;
