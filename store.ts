// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // usa localStorage
import featuredCardsReducer from './services/featuredCardsSlice';
import myCardsReducer from './services/myCardsSlice';

const rootReducer = combineReducers({
	featuredCards: featuredCardsReducer,
	myCards: myCardsReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['featuredCards', 'myCards'], // decidi cosa salvare
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // richiesto da redux-persist
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
