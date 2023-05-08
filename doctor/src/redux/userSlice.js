import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state, action) => {
      state.value = action.payload;
    },
    deleteData: (state, action) => {
      state.value = [];
    },
  },
});

export const { addData, deleteData } = userSlice.actions;
export default userSlice.reducer;
