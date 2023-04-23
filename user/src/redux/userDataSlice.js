import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addData } = userDataSlice.reducer;
export default userDataSlice.reducer;
