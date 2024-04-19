import { Box, styled, Typography } from "@mui/material";

const StyledTitleText = styled(Typography)(({ theme }) => ({
  mr: 2,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: theme.palette.text.primary,
  textDecoration: "none",
  minWidth: 170,
}));

const StyledTitleContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  "& :hover": {
    cursor: "pointer",
  },
}));

export { StyledTitleText, StyledTitleContainer };
