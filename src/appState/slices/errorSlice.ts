import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "appState/store";

type ErrorState = {
  error: string | null;
};

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectError = (state: RootState) => state.error.error;

export default errorSlice.reducer;
