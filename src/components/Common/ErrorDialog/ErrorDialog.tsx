import { useSelector, useDispatch } from "react-redux";
import { DialogTitle, DialogContent, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { clearError, selectError } from "appState/slices/errorSlice";
import { StyledBackdrop, StyledDialog } from "./ErrorDialog.styles";
import { ErrorDialogProps } from "types/Components.params.types";

export default function ErrorDialog({ onClose }: ErrorDialogProps) {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  return (
    <>
      {error && <StyledBackdrop />}
      <StyledDialog
        open={Boolean(error)}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <ErrorIcon color="error" /> Error!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">{error}</Typography>
        </DialogContent>
      </StyledDialog>
    </>
  );
}
