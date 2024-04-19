import { ChangeEvent, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "appState/store";
import { useAppDispatch } from "appState/hooks";
import { DataEntry } from "types/Data.types";
import { Tag } from "types/Forms.types";
import { DataEntryFormProps } from "types/Components.params.types";
import {
  handleChange,
  handleSubmit,
  handleCancel,
} from "utils/dataEntryFormHandlers";

export default function DataEntryForm({
  form,
  initialValues,
  onClose,
}: DataEntryFormProps) {
  const dispatch = useAppDispatch();

  const allDataEntries = useSelector(
    (state: RootState) => state.data.dataEntries
  );

  const maxId = Math.max(...allDataEntries.map((entry) => Number(entry.id)), 0);

  const [formData, setFormData] = useState<DataEntry>({
    id: initialValues ? initialValues.id : maxId + 1,
    value: initialValues ? initialValues.value : 0,
    date: initialValues
      ? initialValues.date
      : new Date().toISOString().slice(0, 10),
    formId: form.id,
    tags: initialValues
      ? Object.keys(initialValues.tags).reduce((acc, key) => {
          acc[key] = initialValues.tags[key];
          return acc;
        }, {} as { [key: string]: string })
      : form.tags.reduce((acc, tag) => {
          acc[tag.name] = tag.choices[0];
          return acc;
        }, {} as { [key: string]: string }),
    note: initialValues ? initialValues.note : "",
  });

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
    tagName: string
  ): void => {
    handleChange(event, formData, setFormData, tagName);
  };

  const handleFormSubmit = (): void => {
    if (initialValues !== undefined) {
      handleSubmit(initialValues, formData, dispatch, onClose);
    }
  };

  const handleFormCancel = () => {
    handleCancel(onClose);
  };

  return (
    <>
      <DialogTitle>{initialValues ? "Edit Data" : "Add Data"}</DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          maxHeight: "70%",
        }}
      >
        <Stack spacing={2} padding={1}>
          <TextField
            name="value"
            label="Value"
            type="number"
            value={formData.value.toString()}
            size="small"
            onChange={(e) => handleInputChange(e, "value")}
            fullWidth
          />

          <TextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            size="small"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            name="note"
            label="Note"
            value={formData.note}
            size="small"
            onChange={(e) => handleInputChange(e, "note")}
            fullWidth
          />

          {form.tags.map((tag: Tag) => (
            <FormControl key={tag.name} fullWidth>
              <InputLabel size="small">{tag.name}</InputLabel>
              <Select
                label={tag.name}
                fullWidth
                value={formData.tags[tag.name] || ""}
                size="small"
                onChange={(e) => handleInputChange(e, tag.name)}
              >
                {tag.choices.map((choice: string) => (
                  <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormCancel}>Cancel</Button>
        <Button onClick={handleFormSubmit}>
          {initialValues ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </>
  );
}
