import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { UseConfirmActionDialog } from "types/Hooks.params.types";

export default function useConfirmActionDialog(): UseConfirmActionDialog {
  const [isOpen, setIsOpen] = useState(false);
  const [actionCallback, setActionCallback] = useState<(() => void) | null>(
    null
  );
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const openDialog = (title: string, message: string, callback: () => void) => {
    setIsOpen(true);
    setDialogTitle(title);
    setDialogMessage(message);
    setActionCallback(() => callback);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogTitle("");
    setDialogMessage("");
    setActionCallback(null);
  };

  const confirmAction = () => {
    if (actionCallback) {
      actionCallback();
    }
    closeDialog();
  };

  const ConfirmActionDialog = (
    <div>
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmAction} color="primary">
            Confirm
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return {
    isOpen,
    openDialog,
    closeDialog,
    confirmAction,
    dialogTitle,
    dialogMessage,
    ConfirmActionDialog,
  };
}
