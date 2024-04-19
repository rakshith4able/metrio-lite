import { styled, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGridContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  height: "100%;",
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  height: "85%;",
}));

export { StyledDataGridContainer, StyledDataGrid };
