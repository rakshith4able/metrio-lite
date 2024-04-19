import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { Severity, AlertParams } from "types/Hooks.params.types";

export default function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<Severity>("success");
  const [message, setMessage] = useState("");
  const [autoHideDuration, setAutoHideDuration] = useState(3000);

  const showAlert = ({
    severity,
    message,
    duration = 3000,
    onClose,
  }: AlertParams) => {
    setSeverity(severity);
    setMessage(message);
    setAutoHideDuration(duration);
    setIsOpen(true);

    if (onClose) {
      setTimeout(() => onClose(), duration);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const AlertComponent = () => (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { showAlert, AlertComponent };
}
