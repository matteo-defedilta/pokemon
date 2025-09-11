import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
	id: string;
	name: string;
	images: {
		small: string;
		large: string;
	};
	cardmarket: any;
	supertype?: string;
	subtypes?: string[];
}

interface FeaturedCardsState {
	value: Card[];
	isSearchActive: boolean;
}

const initialState: FeaturedCardsState = {
	value: [],
	isSearchActive: false,
};

const featuredCardsSlice = createSlice({
	name: 'featuredCards',
	initialState,
	reducers: {
		setFeaturedCards: (state, action: PayloadAction<Card[]>) => {
			state.value = action.payload;
			state.isSearchActive = false;
		},
		setSearchResults: (state, action: PayloadAction<Card[]>) => {
			state.value = action.payload;
			state.isSearchActive = true;
		},
		clearFeaturedCards: (state) => {
			state.value = [];
			state.isSearchActive = false;
		},
	},
});

export const { setFeaturedCards, setSearchResults, clearFeaturedCards } =
	featuredCardsSlice.actions;

export default featuredCardsSlice.reducer;
