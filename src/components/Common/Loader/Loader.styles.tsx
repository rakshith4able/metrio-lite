import { Box, styled } from "@mui/material";

const StyledLoaderContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
}));

export { StyledLoaderContainer };
