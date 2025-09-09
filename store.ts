import { configureStore } from '@reduxjs/toolkit';
import featuredCardsReducer from './services/featuredCardsSlice';

const store = configureStore({
	reducer: {
		featuredCards: featuredCardsReducer,
	},
});

export default store;
