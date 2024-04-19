import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "appState/store";
import { useAppDispatch } from "appState/hooks";
import { Box, Typography, Button, Toolbar, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DataEntry } from "types/Data.types";
import useAlert from "hooks/useAlert";
import DataEntryModal from "./DataEntryModal";
import DataEntryForm from "./DataEntryForm";
import { FormData } from "types/Forms.types";
import { Delete, Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

import {
  deleteDataEntryAsync,
  selectDataEntriesStatus,
} from "appState/slices/dataSlice";
import { StyledDataGrid, StyledDataGridContainer } from "./FormData.styles";
import {
  StyledEditIconButton,
  StyledDeleteIconButton,
} from "components/Forms/Forms.styles";
import { selectFormsStatus } from "appState/slices/formsSlice";
import useConfirmActionDialog from "hooks/useConfirmDialog";

export default function FormDataList() {
  const { formId } = useParams<{ formId?: string }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert, AlertComponent } = useAlert();

  const forms = useSelector((state: RootState) => state.forms.forms);
  const formsStatus = useSelector(selectFormsStatus);
  const dataStatus = useSelector(selectDataEntriesStatus);
  const { isOpen, openDialog, ConfirmActionDialog } = useConfirmActionDialog();

  const allDataEntries = useSelector(
    (state: RootState) => state.data.dataEntries
  );

  const [form, setForm] = useState<FormData>();
  const [filteredDataEntries, setFilteredDataEntries] = useState<DataEntry[]>(
    []
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<DataEntry | null>(null);

  const handleAddData = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const selectedEntry = filteredDataEntries.find((entry) => entry.id === id);
    setEditEntry(selectedEntry || null);
    setIsAddModalOpen(true);
  };

  const handleDeleteButtonClick = (id: number) => {
    openDialog(
      "Delete Item",
      "Are you sure you want to delete this item?",
      () => handleDelete(id)
    );
  };

  const handleDelete = (id: number) => {
    dispatch(deleteDataEntryAsync(id))
      .unwrap()
      .then(() => {
        showAlert({
          severity: "success",
          message: "Data entry deleted successfully",
        });
      })
      .catch(() => {
        showAlert({
          severity: "error",
          message: "Error deleting data entry",
        });
      });
  };

  useEffect(() => {
    if (!formId) return;
    if (formsStatus !== "succeeded" || dataStatus !== "succeeded") {
      return;
    } else {
      const selectedForm = forms.find((form) => form.id === parseInt(formId));
      setForm(selectedForm);

      if (!selectedForm) {
        showAlert({
          severity: "error",
          message: "Form not found!",
          onClose: () => navigate("/"),
        });
        return;
      } else {
        const filteredEntries = allDataEntries.filter(
          (entry) => entry.formId === parseInt(formId)
        );
        setFilteredDataEntries(filteredEntries);
      }
    }
  }, [formId, forms, formsStatus, dataStatus]);

  const getTagColumns = (dataEntries: DataEntry[]): GridColDef[] => {
    const tagColumns: GridColDef[] = [];
    dataEntries.forEach((entry) => {
      if (entry.tags) {
        Object.keys(entry.tags).forEach((tagName: string) => {
          if (!tagColumns.some((col) => col.field === tagName)) {
            tagColumns.push({
              field: tagName,
              headerName: tagName,
              headerClassName: "tag-column-header",
              width: 150,
              valueGetter: (params) => params.row.tags[tagName],
            });
          }
        });
      }
    });
    return tagColumns;
  };

  const tagColumns = getTagColumns(filteredDataEntries);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      valueGetter: (params) => {
        const dateStr = params.row.date;
        if (!dateStr) return null;
        const dateParts = dateStr.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const date = new Date(year, month, day);
        const formattedDate = date.toLocaleDateString("en-CA");
        return formattedDate;
      },
    },
    {
      field: "value",
      headerName: "Value",
      width: 110,
      valueGetter: (params) => {
        const valueStr = params.row.value;
        return valueStr ? parseInt(valueStr) : null;
      },
    },

    ...tagColumns,
    {
      field: "note",
      headerName: "Note",
      // width: 110,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit Data">
            <StyledEditIconButton onClick={() => handleEdit(params.row.id)}>
              <Edit />
            </StyledEditIconButton>
          </Tooltip>
          <Tooltip title="Delete Data">
            <StyledDeleteIconButton
              onClick={() => handleDeleteButtonClick(params.row.id)}
            >
              <Delete />
            </StyledDeleteIconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const selectedForm = formId
    ? forms.find((form) => form.id === parseInt(formId))
    : undefined;

  const formNameWithId = selectedForm
    ? `${selectedForm.name} (ID: ${formId})`
    : "";

  return (
    <StyledDataGridContainer>
      <Box
        component={motion.div}
        sx={{ height: "100%" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          {formId && (
            <Typography variant="h6" align="left" gutterBottom>
              Form: {formNameWithId}
            </Typography>
          )}
          <Button onClick={handleAddData}>Add Data</Button>
        </Toolbar>
        <StyledDataGrid
          rows={filteredDataEntries}
          columns={columns}
          pageSizeOptions={[5, 100]}
          disableRowSelectionOnClick
        />
        <AlertComponent />
        <DataEntryModal
          open={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditEntry(null);
          }}
          onSubmit={() => {
            setIsAddModalOpen(false);
            setEditEntry(null);
          }}
        >
          {form && (
            <DataEntryForm
              form={form}
              initialValues={editEntry}
              onClose={() => {
                setIsAddModalOpen(false);
                setEditEntry(null);
              }}
            />
          )}
        </DataEntryModal>

        {isOpen && ConfirmActionDialog}
      </Box>
    </StyledDataGridContainer>
  );
}
