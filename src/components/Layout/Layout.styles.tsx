import { styled, Container, Box } from "@mui/material";

const StyledLayout = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const StyledMainLayout = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
}));

const StyledMain = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  display: "flex",
}));

export { StyledMainLayout, StyledMain, StyledLayout };
