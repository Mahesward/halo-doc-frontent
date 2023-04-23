import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { alertSlice } from './alertSlice';
import { userDataSlice } from './userDataSlice';

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
  // userData: persistReducer({ key: 'userData', storage }, userDataSlice.reducer),
});

const store = configureStore({
  reducer: rootReducer,
});

export const presistor = persistStore(store);
export default store;
