import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { alertSlice } from './alertSlice';
import { userSlice } from './userDataSlice';

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
  data: persistReducer({ key: 'data', storage }, userSlice.reducer),
});

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
