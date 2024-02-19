import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		isLogin: false,
	},
	reducers: {
		setIsLogin: (state, payload) => {
			state.isLogin = payload;
		},

		setUser: (state, payload) => {
			state.user = payload;
		},
	},
});

export const { setIsLogin, setUser } = userSlice.actions;
export default userSlice.reducer;
