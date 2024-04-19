import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FormsState, CreateFormInput, FormData } from "types/Forms.types";
import type { RootState } from "appState/store";
import { handleAxiosError } from "utils/errorHandler";

const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState: FormsState = {
  forms: [],
  status: "idle",
};

export const fetchForms = createAsyncThunk(
  "forms/fetchForms",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${baseUrl}/forms`);
      const formsData: FormData[] = response.data.map((form: FormData) => ({
        ...form,
        id: Number(form.id),
      }));
      return formsData;
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error fetching Forms");
    }
  }
);

export const createFormAsync = createAsyncThunk(
  "forms/createForm",
  async (formData: CreateFormInput, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}/forms`, {
        ...formData,
        id: formData.id.toString(),
      });

      return { ...response.data, id: Number(response.data.id) };
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error creating Form");
    }
  }
);

export const updateFormAsync = createAsyncThunk(
  "forms/updateForm",
  async (
    {
      formId,
      formData,
    }: {
      formId: number;
      formData: CreateFormInput;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/forms/${formId.toString()}`,
        formData
      );
      return { ...response.data, id: Number(response.data.id) };
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error updating Form");
    }
  }
);

export const deleteFormAsync = createAsyncThunk(
  "forms/deleteForm",
  async (formId: number, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${baseUrl}/forms/${formId}`);
      return formId;
    } catch (error) {
      handleAxiosError(error as AxiosError, dispatch);
      return rejectWithValue("Error deleting Form");
    }
  }
);

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action) => {
      state.forms.push(action.payload);
    },
    // updateForm reducer now takes in updatedForm directly as payload
    updateForm: (state, action) => {
      const updatedForm = action.payload;
      const index = state.forms.findIndex((form) => form.id === updatedForm.id);
      if (index !== -1) {
        state.forms[index] = updatedForm;
      }
    },
    // deleteForm reducer now directly removes the form with the provided id from the forms array
    deleteForm: (state, action) => {
      const deletedFormId = action.payload;
      state.forms = state.forms.filter((form) => form.id !== deletedFormId);
    },
    resetForms: (state) => {
      state.forms = initialState.forms;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.forms = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchForms.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createFormAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFormAsync.fulfilled, (state, action) => {
        state.forms.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createFormAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateFormAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFormAsync.fulfilled, (state, action) => {
        const updatedForm = action.payload;

        const index = state.forms.findIndex((form) => {
          return form.id === Number(updatedForm.id);
        });

        if (index !== -1) {
          state.forms[index] = updatedForm;
          state.status = "succeeded";
        }
      })
      .addCase(updateFormAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteFormAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFormAsync.fulfilled, (state, action) => {
        const deletedFormId = action.payload;
        state.forms = state.forms.filter((form) => form.id !== deletedFormId);
        state.status = "succeeded";
      })
      .addCase(deleteFormAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addForm, updateForm, deleteForm, resetForms } =
  formsSlice.actions;

export const selectAllForms = (state: RootState) => state.forms;
export const selectFormsStatus = (state: RootState) => state.forms.status;

export default formsSlice.reducer;
