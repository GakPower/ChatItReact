import { configureStore } from '@reduxjs/toolkit';
import { userInfoReducer } from './slices/userInfo';

export const store = configureStore({
	reducer: {
		userInfo: userInfoReducer,
	},
});
