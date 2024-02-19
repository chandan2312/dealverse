import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import userReducer from "./slices/userSlice";
import imageReducer from "./slices/imageSlice";
import dealReducer from "./slices/dealSlice";
import textEditorReducer from "./slices/textEditorSlice";
import formReducer from "./slices/formSlice";

export const store = configureStore({
	reducer: {
		navbar: navbarReducer,
		user: userReducer,
		images: imageReducer,
		deal: dealReducer,
		textEditor: textEditorReducer,
		form: formReducer,
	},
});
