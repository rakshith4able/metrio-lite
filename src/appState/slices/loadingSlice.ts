import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "appState/store";

import {
  fetchForms,
  createFormAsync,
  updateFormAsync,
  deleteFormAsync,
} from "appState/slices/formsSlice";

import {
  fetchDataEntries,
  createDataEntryAsync,
  updateDataEntryAsync,
  deleteDataEntryAsync,
} from "appState/slices/dataSlice";

const initialState: boolean = false;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, () => true)
      .addCase(fetchForms.fulfilled, () => false)
      .addCase(fetchForms.rejected, () => false)
      .addCase(createFormAsync.pending, () => true)
      .addCase(createFormAsync.fulfilled, () => false)
      .addCase(createFormAsync.rejected, () => false)
      .addCase(updateFormAsync.pending, () => true)
      .addCase(updateFormAsync.fulfilled, () => false)
      .addCase(deleteFormAsync.pending, () => true)
      .addCase(deleteFormAsync.fulfilled, () => false)
      .addCase(deleteFormAsync.rejected, () => false)
      .addCase(fetchDataEntries.pending, () => true)
      .addCase(fetchDataEntries.fulfilled, () => false)
      .addCase(fetchDataEntries.rejected, () => false)
      .addCase(createDataEntryAsync.pending, () => true)
      .addCase(createDataEntryAsync.fulfilled, () => false)
      .addCase(createDataEntryAsync.rejected, () => false)
      .addCase(updateDataEntryAsync.pending, () => true)
      .addCase(updateDataEntryAsync.fulfilled, () => false)
      .addCase(updateDataEntryAsync.rejected, () => false)
      .addCase(deleteDataEntryAsync.pending, () => true)
      .addCase(deleteDataEntryAsync.fulfilled, () => false)
      .addCase(deleteDataEntryAsync.rejected, () => false);
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

// Define a selector function to select the loading state
export const selectLoading = (state: RootState) => state.loading;
