import { createSlice } from '@reduxjs/toolkit';

interface UserInfoState {
	userInfo: {
		username: string;
		loggedIn: boolean;
	};
}

export const userInfo = createSlice({
	name: 'userInfo',
	initialState: {
		username: '',
		loggedIn: false,
	},
	reducers: {
		setUsername: (state, action: { payload: string; type: string }) => {
			state.username = action.payload;
		},
		setLoggedIn: (state, action: { payload: boolean; type: string }) => {
			state.loggedIn = action.payload;
		},
	},
});

export const { setUsername, setLoggedIn } = userInfo.actions;
export const selectUsername = (state: UserInfoState) => state.userInfo.username;
export const selectLoggedIn = (state: UserInfoState) => state.userInfo.loggedIn;
export const userInfoReducer = userInfo.reducer;
