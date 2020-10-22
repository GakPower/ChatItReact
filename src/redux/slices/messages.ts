import { createSlice } from '@reduxjs/toolkit';

export interface Message {
	id: string;
	text: string;
	from: string;
	date: string;
}

interface MessagesState {
	messages: {
		array: Message[];
	};
}

export const messages = createSlice({
	name: 'messages',
	initialState: {
		array: [],
	},
	reducers: {
		addMessage: (
			state: { array: Message[] },
			action: { payload: Message; type: string }
		) => {
			console.log();

			console.log({ before: state.array });

			state.array = [...state.array, action.payload];
			console.log({ after: state.array });
		},
	},
});

export const { addMessage } = messages.actions;
export const selectMessages = (state: MessagesState) => state.messages.array;
export const messagesReducer = messages.reducer;
