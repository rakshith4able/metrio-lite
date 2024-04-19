import { CreateFormInput } from "types/Forms.types";
import { AppDispatch } from "appState/store";
import { createFormAsync } from "appState/slices/formsSlice";
import { NavigateFunction } from "react-router-dom";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>
) => {
  const { name, value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

export const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  formData: CreateFormInput,
  forms: CreateFormInput[],
  dispatch: AppDispatch,
  showAlert: Function,
  setFormData: React.Dispatch<React.SetStateAction<CreateFormInput>>,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  if (formData.name.trim() === "") {
    showAlert({
      severity: "error",
      message: "Please enter a form name.",
      duration: 3000,
    });
    return;
  }

  if (
    formData.tags.length === 0 ||
    formData.tags.some(
      (tag) =>
        tag.name.trim() === "" ||
        tag.choices.length === 0 ||
        tag.choices.some((choice) => choice.trim() === "")
    )
  ) {
    showAlert({
      severity: "error",
      message:
        "Please ensure each tag has a non-empty name and at least one non-empty choice.",
    });
    return;
  }

  const nextId = Math.max(...forms.map((form) => form.id)) + 1;

  const newForm = { ...formData, id: nextId };

  dispatch(createFormAsync(newForm))
    .unwrap()
    .then(() => {
      showAlert({
        severity: "success",
        message: "Form created successfully.",
        onClose: () => {
          navigate("/");
        },
      });
      setFormData({ id: 0, name: "", tags: [] });
    })
    .catch(() => {
      showAlert({ severity: "error", message: "Failed to create form." });
    });
};
