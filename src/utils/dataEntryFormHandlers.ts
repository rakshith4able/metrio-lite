import React, { ChangeEvent } from "react";
import { Dispatch } from "redux";
import { DataEntry } from "types/Data.types";
import {
  createDataEntryAsync,
  updateDataEntryAsync,
} from "appState/slices/dataSlice";
import { SelectChangeEvent } from "@mui/material";

type FormChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string>;

export const handleChange = (
  event: FormChangeEvent,
  formData: DataEntry,
  setFormData: React.Dispatch<React.SetStateAction<DataEntry>>,
  tagName: string
): void => {
  const { name, value } = event.target as
    | HTMLInputElement
    | HTMLTextAreaElement;

  setFormData((prevData) => ({
    ...prevData,
    [name === "value" || name === "note" ? name : "tags"]:
      name === "value" || name === "note"
        ? value
        : {
            ...prevData.tags,
            [tagName]: value,
          },
  }));
};

export const handleSubmit = (
  initialValues: DataEntry | null,
  formData: DataEntry,
  dispatch: Dispatch<any>,
  onClose: () => void
): void => {
  if (initialValues) {
    dispatch(updateDataEntryAsync(formData));
  } else {
    dispatch(createDataEntryAsync(formData));
  }
  onClose();
};

export const handleCancel = (onClose: () => void): void => {
  onClose();
};
