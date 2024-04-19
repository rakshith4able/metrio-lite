import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { RootState } from "appState/store";
import { FormData } from "types/Forms.types";
import { motion } from "framer-motion";

export default function ViewFormDataSelector() {
  const forms = useSelector((state: RootState) => state.forms.forms);
  const [selectedFormId, setSelectedFormId] = useState<string>("");

  const handleFormChange = (event: SelectChangeEvent<string>) => {
    setSelectedFormId(event.target.value as string);
  };

  return (
    <Grid
      container
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom align="center">
          Select a Form to View Data:
        </Typography>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Select fullWidth value={selectedFormId} onChange={handleFormChange}>
            {forms.map((form: FormData) => (
              <MenuItem key={form.id} value={form.id}>
                {form.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            disabled={!selectedFormId}
            component={Link}
            to={`/forms/${selectedFormId}/data`}
          >
            View Data
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
