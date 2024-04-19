import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

import { useAppDispatch } from "appState/hooks";
import { RootState } from "appState/store";
import { CreateFormInput } from "types/Forms.types";
import useAlert from "hooks/useAlert";
import {
  handleInputChange,
  handleAddTag,
  handleRemoveTag,
  handleTagNameChange,
  handleAddOption,
  handleRemoveOption,
  handleOptionChange,
  handleSubmit,
} from "utils/createFormHandlers";

import { StyledCreateFormContainer } from "./Forms.styles";

export default function CreateForm() {
  const [formData, setFormData] = useState<CreateFormInput>({
    id: 0,
    name: "",
    tags: [],
  });
  const { showAlert, AlertComponent } = useAlert();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);

  return (
    <StyledCreateFormContainer maxWidth="sm">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              formData,
              forms,
              dispatch,
              showAlert,
              setFormData,
              navigate
            )
          }
        >
          <Typography variant="h5" gutterBottom>
            Form Name
          </Typography>
          <TextField
            fullWidth
            label="Form Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, setFormData)}
            margin="normal"
          />
          <Typography variant="h5" gutterBottom>
            Tags
          </Typography>
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
                      onChange={(e) =>
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
                        onChange={(e) =>
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
            type="submit"
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </motion.div>

      <AlertComponent />
    </StyledCreateFormContainer>
  );
}
