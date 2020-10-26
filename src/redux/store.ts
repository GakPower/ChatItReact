import { configureStore } from '@reduxjs/toolkit';
import { userInfoReducer } from './slices/userInfo';
import { messagesReducer } from './slices/messages';

export const store = configureStore({
	reducer: {
		userInfo: userInfoReducer,
		messages: messagesReducer,
	},
});
