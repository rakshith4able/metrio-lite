import { Link } from "react-router-dom";
import { Button, Toolbar, TextField } from "@mui/material";
import { FormsHeaderProps } from "types/Components.params.types";

export default function FormsHeader({
  searchTerm,
  setSearchTerm,
}: FormsHeaderProps) {
  return (
    <Toolbar className="FormsHeader" disableGutters>
      <TextField
        label="Search Forms"
        variant="outlined"
        value={searchTerm}
        size="small"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link to="/forms/create">
        <Button size="small" color="primary" variant="contained">
          Create Form
        </Button>
      </Link>
    </Toolbar>
  );
}
