import { CreateFormInput } from "types/Forms.types";
import { updateFormAsync, deleteFormAsync } from "appState/slices/formsSlice";
import { AppDispatch } from "appState/store";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  const { name, value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const handleUpdateForm = async (
  formData: CreateFormInput,
  formId: number,
  dispatch: AppDispatch,
  showAlert: Function,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: Function
) => {
  if (
    formData.tags.some(
      (tag) =>
        tag.name.trim() === "" ||
        tag.choices.some((choice) => choice.trim() === "")
    )
  ) {
    showAlert({
      severity: "error",
      message: "All tag names and choices must be filled in.",
    });
    return;
  }

  if (
    formData.tags.length === 0 ||
    formData.tags.some((tag) => tag.choices.length === 0)
  ) {
    showAlert({
      severity: "error",
      message: "At least one tag with one choice is required.",
    });
    return;
  }

  try {
    await dispatch(updateFormAsync({ formId, formData })).unwrap();
    showAlert({
      severity: "success",
      message: "Form updated successfully.",
    });
    setEditMode(false);
  } catch (error) {
    showAlert({ severity: "error", message: "Failed to update form." });
  }
};

export const handleDeleteForm = async (
  formId: number,
  dispatch: AppDispatch,
  showAlert: Function,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>,
  navigate: Function
) => {
  try {
    await dispatch(deleteFormAsync(formId)).unwrap();
    setFormData({
      id: 0,
      name: "",
      tags: [],
    });

    showAlert({
      severity: "success",
      message: "Form deleted successfully.",
      onClose: () => {
        navigate("/");
      },
    });
  } catch (error) {
    showAlert({ severity: "error", message: "Failed to delete form." });
  }
};

export const handleAddTag = (
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  setFormData((prevState) => ({
    ...prevState,
    tags: [...prevState.tags, { name: "", choices: [] }],
  }));
};

export const handleRemoveTag = (
  index: number,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  setFormData((prevState) => ({
    ...prevState,
    tags: prevState.tags.filter((_, i) => i !== index),
  }));
};

export const handleTagNameChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  const { value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    tags: prevState.tags.map((tag, i) =>
      i === index ? { ...tag, name: value } : tag
    ),
  }));
};

export const handleAddOption = (
  index: number,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  setFormData((prevState) => ({
    ...prevState,
    tags: prevState.tags.map((tag, i) =>
      i === index ? { ...tag, choices: [...tag.choices, ""] } : tag
    ),
  }));
};

export const handleRemoveOption = (
  tagIndex: number,
  optionIndex: number,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  setFormData((prevState) => ({
    ...prevState,
    tags: prevState.tags.map((tag, i) =>
      i === tagIndex
        ? {
            ...tag,
            choices: tag.choices.filter((_, j) => j !== optionIndex),
          }
        : tag
    ),
  }));
};

export const handleOptionChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  tagIndex: number,
  optionIndex: number,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  const { value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    tags: prevState.tags.map((tag, i) =>
      i === tagIndex
        ? {
            ...tag,
            choices: tag.choices.map((opt, j) =>
              j === optionIndex ? value : opt
            ),
          }
        : tag
    ),
  }));
};
