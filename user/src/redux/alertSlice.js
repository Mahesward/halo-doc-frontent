import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertSlice.actions;

// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import { combineReducers } from 'redux';
// import { dataSlice } from './dataReducers';
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//   data: persistReducer({ key: 'data', storage }, dataSlice.reducer),
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export const presistor = persistStore(store);
// export default store;
