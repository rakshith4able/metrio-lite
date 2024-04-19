import { Dialog, styled, Box } from "@mui/material";
import { purple } from "@mui/material/colors";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    backgroundColor: purple[50],
    color: theme.palette.error.main,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiSvgIcon-root ": {
    justifySelf: "flex-start",
  },
  "& .MuiDialogContent-root": {
    padding: "20px",
    textAlign: "center",
  },
}));

const StyledBackdrop = styled(Box)({
  zIndex: 1300,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export { StyledBackdrop, StyledDialog };
