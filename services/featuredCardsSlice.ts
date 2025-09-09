// services/featuredCardsSlice.ts
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

interface FeaturedCardsState {
	value: Card[];
}

const initialState: FeaturedCardsState = {
	value: [],
};

const featuredCardsSlice = createSlice({
	name: 'featuredCards',
	initialState,
	reducers: {
		setFeaturedCards: (state, action: PayloadAction<Card[]>) => {
			state.value = action.payload;
		},
		clearFeaturedCards: (state) => {
			state.value = [];
		},
	},
});

export const { setFeaturedCards, clearFeaturedCards } =
	featuredCardsSlice.actions;

export default featuredCardsSlice.reducer;
