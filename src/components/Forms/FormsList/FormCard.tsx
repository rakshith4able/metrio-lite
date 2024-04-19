import {
  Grid,
  CardContent,
  CardActions,
  Typography,
  Tooltip,
} from "@mui/material";
import FormIcon from "@mui/icons-material/Description";
import DetailsIcon from "@mui/icons-material/Info";
import ViewDataIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledDeleteIconButton,
  StyledDetailsButton,
  StyledEditIconButton,
  StyledFormCard,
  StyledViewDataButton,
} from "../Forms.styles";
import { FormCardProps } from "types/Components.params.types";
import useConfirmActionDialog from "hooks/useConfirmDialog";

export default function FormCard({
  form,
  handleEditForm,
  handleDeleteForm,
  navigate,
}: FormCardProps) {
  const { isOpen, openDialog, ConfirmActionDialog } = useConfirmActionDialog();

  const handleDeleteButtonClick = () => {
    openDialog(
      "Delete Item",
      "Are you sure you want to delete this form?",
      () => handleDeleteForm(form.id)
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledFormCard>
        <CardContent>
          <FormIcon color="primary" />
          <Typography variant="h6">
            {form.name.length > 50 ? form.name.slice(0, 50) + "..." : form.name}
          </Typography>
          <Typography variant="subtitle1">
            Data Count: {form.dataCount}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Form Details">
            <StyledDetailsButton onClick={() => navigate(`/forms/${form.id}`)}>
              <DetailsIcon />
            </StyledDetailsButton>
          </Tooltip>
          <Tooltip title="View Data">
            <StyledViewDataButton
              onClick={() => navigate(`/forms/${form.id}/data`)}
            >
              <ViewDataIcon />
            </StyledViewDataButton>
          </Tooltip>
          <Tooltip title="Edit">
            <StyledEditIconButton onClick={() => handleEditForm(form.id)}>
              <EditIcon />
            </StyledEditIconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <StyledDeleteIconButton onClick={handleDeleteButtonClick}>
              <DeleteIcon />
            </StyledDeleteIconButton>
          </Tooltip>
        </CardActions>
      </StyledFormCard>
      {isOpen && ConfirmActionDialog}
    </Grid>
  );
}
