import { Dialog } from "@mui/material";
import { DataEntryModalProps } from "types/Components.params.types";

export default function DataEntryModal({
  open,
  onClose,
  children,
}: DataEntryModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      {children}
    </Dialog>
  );
}
