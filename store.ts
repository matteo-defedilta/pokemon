import { configureStore } from '@reduxjs/toolkit';
import featuredCardsReducer from './services/featuredCardsSlice';
import myCardsReducer from './services/myCardsSlice'; // nuovo slice

const store = configureStore({
	reducer: {
		featuredCards: featuredCardsReducer,
		myCards: myCardsReducer, // aggiunto
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
