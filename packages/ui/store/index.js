import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./slices/dealSlice";
import constantReducer from "./slices/constantSlice";

export const store = configureStore({
	reducer: {
		deal: dealReducer,
		constant: constantReducer,
	},
});
