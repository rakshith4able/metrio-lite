import { Pagination } from "@mui/material";
import { FormsFooterProps } from "types/Components.params.types";

export default function FormsFooter({
  filteredFormsLength,
  formsPerPage,
  page,
  handleChangePage,
}: FormsFooterProps) {
  return (
    <Pagination
      count={Math.ceil(filteredFormsLength / formsPerPage)}
      page={page}
      onChange={handleChangePage}
      variant="outlined"
      shape="circular"
      sx={{ mt: 2, alignSelf: "center" }}
    />
  );
}
