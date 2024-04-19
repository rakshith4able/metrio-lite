import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "appState/hooks";
import { deleteFormAsync } from "appState/slices/formsSlice";
import { DataEntry } from "types/Data.types";
import { FormData } from "types/Forms.types";
import useAlert from "hooks/useAlert";

export const useFormHandlers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();

  const handleEditForm = (formId: number) => {
    navigate(`/forms/${formId}/edit`);
  };

  const handleDeleteForm = async (formId: number) => {
    try {
      await dispatch(deleteFormAsync(formId));
      showAlert({
        severity: "success",
        message: "Form deleted successfully.",
      });
    } catch (error) {
      showAlert({ severity: "error", message: "Failed to delete form." });
    }
  };

  return { handleEditForm, handleDeleteForm };
};

export const useFormDataCount = (forms: FormData[], data: DataEntry[]) => {
  return forms.map((form: FormData) => {
    const count = data.filter(
      (item: DataEntry) => item.formId === form.id
    ).length;
    return {
      ...form,
      dataCount: count,
    };
  });
};
