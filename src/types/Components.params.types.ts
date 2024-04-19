import { FormData } from "./Forms.types";
import { DataEntry } from "./Data.types";
import { ReactNode } from "react";

//  components/Forms/FormsLists

export type FormActionsProps = {
  handleEditForm: (formId: number) => void;
  handleDeleteForm: (formId: number) => void;
  navigate: (path: string) => void;
  form: FormData;
};

export type FormCardProps = {
  form: FormData;
  handleEditForm: (formId: number) => void;
  handleDeleteForm: (formId: number) => void;
  navigate: (path: string) => void;
};

//  components/FormData/DataEntryForm
export type DataEntryFormProps = {
  form: FormData;
  initialValues?: DataEntry | null;
  onClose: () => void;
};

//  components/common/ErrorDialog
export type ErrorDialogProps = {
  onClose: () => void;
};

// components/FormData/DataEntryModal
export type DataEntryModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

//  components\Forms\FormsList\FormsFooter
export type FormsFooterProps = {
  filteredFormsLength: number;
  formsPerPage: number;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
};

//  components\Forms\FormsList\FormsHeader
export type FormsHeaderProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
