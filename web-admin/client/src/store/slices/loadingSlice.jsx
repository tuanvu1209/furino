import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    isLoadingPage: false,
    isLoadingButton: false,
  },
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    handleLoadingPage: (state, action) => {
      state.isLoadingPage = action.payload;
    },
    handleLoadingButton: (state, action) => {
      state.isLoadingButton = action.payload;
    },
  },
});

export const { handleLoading, handleLoadingPage, handleLoadingButton } = loadingSlice.actions;
export default loadingSlice.reducer;
