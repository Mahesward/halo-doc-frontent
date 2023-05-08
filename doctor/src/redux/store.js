import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './userSlice';

const rootReducer = combineReducers({
  data: persistReducer({ key: 'data', storage }, userSlice.reducer),
});

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
