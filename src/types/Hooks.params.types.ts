//  hooks\useAlert.tsx
export type Severity = "success" | "info" | "warning" | "error";

export type AlertParams = {
  severity: Severity;
  message: string;
  duration?: number;
  onClose?: () => void;
};

//  hooks\useConfirmDialog.tsx
export type UseConfirmActionDialog = {
  isOpen: boolean;
  openDialog: (title: string, message: string, callback: () => void) => void;
  closeDialog: () => void;
  confirmAction: () => void;
  dialogTitle: string;
  dialogMessage: string;
  ConfirmActionDialog: JSX.Element;
};
