import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
	id: string;
	name: string;
	images: {
		small: string;
		large: string;
	};
	supertype?: string;
	subtypes?: string[];
}

interface MyCardsState {
	value: Card[];
}

const initialState: MyCardsState = {
	value: [],
};

const myCardsSlice = createSlice({
	name: 'myCards',
	initialState,
	reducers: {
		addCard: (state, action: PayloadAction<Card>) => {
			// Evita duplicati
			if (!state.value.find((c) => c.id === action.payload.id)) {
				state.value.push(action.payload);
			}
		},
		removeCard: (state, action: PayloadAction<string>) => {
			state.value = state.value.filter((c) => c.id !== action.payload);
		},
	},
});

export const { addCard, removeCard } = myCardsSlice.actions;
export default myCardsSlice.reducer;
