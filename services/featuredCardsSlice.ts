import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeaturedCard {
	pageSize: number;
	orderBy: string;
	q: string;
	// Define the shape of the featured card object here
}

interface FeaturedCardsState {
	value: FeaturedCard[];
}

const initialState: FeaturedCardsState = {
	value: [],
};

const featuredCardsSlice = createSlice({
	name: 'featuredCards',
	initialState,
	reducers: {
		setFeaturedCards: (state, action: PayloadAction<FeaturedCard[]>) => {
			state.value = action.payload;
		},
	},
});

export const { setFeaturedCards } = featuredCardsSlice.actions;

export default featuredCardsSlice.reducer;
