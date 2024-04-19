import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "appState/store";
import { FormData } from "types/Forms.types";
import { StyledFormsContainer } from "../Forms.styles";
import FormCard from "./FormCard";
import FormsHeader from "./FormsHeader";
import FormsFooter from "./FormsFooter";
import { useFormHandlers, useFormDataCount } from "utils/formHandlers";
import useAlert from "hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Forms() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { handleEditForm, handleDeleteForm } = useFormHandlers();

  const formsPerPage = 5;
  const navigate = useNavigate();
  const { AlertComponent } = useAlert();

  const forms = useSelector((state: RootState) => state.forms.forms);
  const data = useSelector((state: RootState) => state.data.dataEntries);

  const formsWithDataCount = useFormDataCount(forms, data);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const filteredForms = formsWithDataCount.filter((form) =>
  form.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const paginatedForms = filteredForms.slice(
    (page - 1) * formsPerPage,
    page * formsPerPage
  );

  return (
    <StyledFormsContainer
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <FormsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Grid className="FormsBody" container spacing={2}>
        {paginatedForms.map((form: FormData) => (
          <FormCard
            key={form.id}
            form={form}
            handleEditForm={handleEditForm}
            handleDeleteForm={handleDeleteForm}
            navigate={navigate}
          />
        ))}
      </Grid>

      <FormsFooter
        filteredFormsLength={filteredForms.length}
        formsPerPage={formsPerPage}
        page={page}
        handleChangePage={handleChangePage}
      />

      <AlertComponent />
    </StyledFormsContainer>
  );
}
