import { createSlice, nanoid } from "@reduxjs/toolkit";

export const formSlice = createSlice({
	name: "form",

	initialState: {
		// Add Deal
		description: "",
		images: [],
		tags: [],
		addedStore: "",

		// login Register
		openRegister: false,

		//comment trigger for comment section
		commentRefresh: false,
	},

	reducers: {
		// ---------------------- Add Deal ------------------------
		addDescription: (state, action) => {
			state.description = action.payload;
		},

		addImage: (state, action) => {
			state.images.push(action.payload);
		},
		removeImage: (state, action) => {
			state.images = state.images.filter(
				(image) => image.fileUrl !== action.payload
			);
		},

		addTag: (state, action) => {
			state.tags.push(action.payload);
		},
		removeTag: (state, action) => {
			state.tags = state.tags.filter((tag) => tag !== action.payload);
		},

		addStore: (state, action) => {
			state.addedStore = action.payload;
		},

		removeStore: (state) => {
			state.addedStore = "";
		},

		// ---------------------- Login Register ------------------------

		toggleRegister: (state, action) => {
			state.openRegister = action.payload || !state.openRegister;
		},

		// ---------------------- Comment Refresh ------------------------

		toggleCommentRefresh: (state) => {
			state.commentRefresh = !state.commentRefresh;
		},
	},
});

export const {
	addDescription,
	addImage,
	removeImage,
	addTag,
	removeTag,
	addStore,
	removeStore,

	toggleRegister,
	toggleCommentRefresh,
} = formSlice.actions;

export default formSlice.reducer;
