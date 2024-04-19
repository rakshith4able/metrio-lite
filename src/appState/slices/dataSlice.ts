import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { DataState, DataEntry } from "types/Data.types";
import type { RootState } from "appState/store";
import { handleAxiosError } from "utils/errorHandler";

const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState: DataState = {
  dataEntries: [],
  status: "idle",
};

export const fetchDataEntries = createAsyncThunk(
  "data/fetchDataEntries",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}/data`);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error fetching Data Entries");
    }
  }
);

export const createDataEntryAsync = createAsyncThunk(
  "data/createDataEntry",
  async (dataEntry: DataEntry, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}/data`, {
        ...dataEntry,
        id: dataEntry.id.toString(),
      });

      return { ...response.data };
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error creating Data Entry");
    }
  }
);

export const updateDataEntryAsync = createAsyncThunk(
  "data/updateDataEntry",
  async (dataEntry: DataEntry, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/data/${dataEntry.id}`,
        dataEntry
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error updating Data Entry");
    }
  }
);

export const deleteDataEntryAsync = createAsyncThunk(
  "data/deleteDataEntry",
  async (dataEntryId: number, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${baseUrl}/data/${dataEntryId.toString()}`);
      return dataEntryId;
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error deleting Data Entry");
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetDataEntries: (state) => {
      state.dataEntries = initialState.dataEntries;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataEntries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataEntries.fulfilled, (state, action) => {
        state.dataEntries = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDataEntries.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createDataEntryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDataEntryAsync.fulfilled, (state, action) => {
        state.dataEntries.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createDataEntryAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateDataEntryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDataEntryAsync.fulfilled, (state, action) => {
        const updatedDataEntry = action.payload;
        const index = state.dataEntries.findIndex(
          (entry) => entry.id === updatedDataEntry.id
        );
        if (index !== -1) {
          state.dataEntries[index] = updatedDataEntry;
          state.status = "succeeded";
        }
      })
      .addCase(updateDataEntryAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteDataEntryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDataEntryAsync.fulfilled, (state, action) => {
        const deletedDataEntryId = action.payload;
        state.dataEntries = state.dataEntries.filter(
          (entry) => entry.id !== deletedDataEntryId
        );
        state.status = "succeeded";
      })
      .addCase(deleteDataEntryAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetDataEntries } = dataSlice.actions;

export const selectAllDataEntries = (state: RootState) =>
  state.data.dataEntries;
export const selectDataEntriesStatus = (state: RootState) => state.data.status;

export default dataSlice.reducer;
