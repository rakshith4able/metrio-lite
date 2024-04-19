import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useAppDispatch } from "appState/hooks";
import {
  updateFormAsync,
  deleteFormAsync,
  selectFormsStatus,
} from "appState/slices/formsSlice";
import { CreateFormInput } from "types/Forms.types";
import useAlert from "hooks/useAlert";
import { RootState } from "appState/store";
import { StyledCreateFormContainer } from "./Forms.styles";

import {
  handleInputChange,
  handleUpdateForm,
  handleDeleteForm,
  handleAddTag,
  handleRemoveTag,
  handleTagNameChange,
  handleAddOption,
  handleRemoveOption,
  handleOptionChange,
} from "utils/formDetailsHandlers";
import useConfirmActionDialog from "hooks/useConfirmDialog";
import { selectDataEntriesStatus } from "appState/slices/dataSlice";

export default function FormDetails() {
  const { formId } = useParams<{ formId: string }>();
  const { pathname } = useLocation();
  const isEditMode = pathname.includes("/edit");
  const navigate = useNavigate();
  const { isOpen, openDialog, ConfirmActionDialog } = useConfirmActionDialog();

  const [formData, setFormData] = useState<CreateFormInput>({
    id: Number(formId),
    name: "",
    tags: [],
  });

  const [editMode, setEditMode] = useState<boolean>(isEditMode);
  const { showAlert, AlertComponent } = useAlert();

  const dispatch = useAppDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const formsStatus = useSelector(selectFormsStatus);
  const dataStatus = useSelector(selectDataEntriesStatus);

  useEffect(() => {
    if (dataStatus === "succeeded" && formsStatus === "succeeded") {
      const form = forms.find((form) => form.id === Number(formId));
      if (form) {
        setFormData(form);
      } else {
        showAlert({
          severity: "error",
          message: "The form doesn't exist",
          onClose: () => {
            navigate("/");
          },
        });
      }
    }
  }, [formId, forms]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setFormData);
  };

  const handleDeleteButtonClick = () => {
    openDialog(
      "Delete Item",
      "Are you sure you want to delete this form?",
      () =>
        handleDeleteForm(
          formData.id,
          dispatch,
          showAlert,
          setFormData,
          navigate
        )
    );
  };

  return (
    <StyledCreateFormContainer maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {editMode ? "Edit Form" : "Form Details"}
      </Typography>
      {editMode ? (
        <>
          <TextField
            fullWidth
            label="Form Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          {formData.tags.map((tag, index) => (
            <Accordion key={index} defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{tag.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tag Name"
                      value={tag.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleTagNameChange(e, index, setFormData)
                      }
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveTag(index, setFormData)}
                      style={{ marginTop: "10px" }}
                    >
                      Delete Tag
                    </Button>
                  </Grid>
                  {tag.choices.map((choice, optionIndex) => (
                    <Grid item xs={12} key={optionIndex}>
                      <TextField
                        fullWidth
                        label={`Choice ${optionIndex + 1}`}
                        value={choice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOptionChange(e, index, optionIndex, setFormData)
                        }
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleRemoveOption(index, optionIndex, setFormData)
                        }
                        style={{ marginTop: "10px" }}
                      >
                        Delete Choice
                      </Button>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={() => handleAddOption(index, setFormData)}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      Add Choice
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            variant="contained"
            onClick={() => handleAddTag(setFormData)}
            style={{ marginTop: "20px" }}
          >
            Add Tag
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleUpdateForm(
                formData,
                formData.id,
                dispatch,
                showAlert,
                setEditMode,
                navigate
              )
            }
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Update Form
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteButtonClick}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Delete Form
          </Button>
          <Button
            variant="contained"
            onClick={() => setEditMode(false)}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Form Name: {formData.name}</Typography>
          {formData.tags.map((tag, index) => (
            <Accordion key={index} defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{tag.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {tag.choices.map((choice, optionIndex) => (
                    <Grid item xs={12} key={optionIndex}>
                      <Typography>{`Choice ${
                        optionIndex + 1
                      }: ${choice}`}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            variant="contained"
            onClick={() => setEditMode(true)}
            style={{ marginTop: "20px" }}
          >
            Edit Form
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteButtonClick}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Delete Form
          </Button>
        </>
      )}
      <AlertComponent />
      {isOpen && ConfirmActionDialog}
    </StyledCreateFormContainer>
  );
}
