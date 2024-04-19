import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "appState/hooks";
import { fetchForms, selectFormsStatus } from "appState/slices/formsSlice";
import {
  fetchDataEntries,
  selectDataEntriesStatus,
} from "appState/slices/dataSlice";
import { selectLoading } from "appState/slices/loadingSlice";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Loader from "components/Common/Loader/Loader";
import ErrorDialog from "components/Common/ErrorDialog/ErrorDialog";
import Router from "Router";
import theme from "theme";

function App() {
  const dispatch = useAppDispatch();
  const formsStatus = useSelector(selectFormsStatus);
  const dataStatus = useSelector(selectDataEntriesStatus);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (formsStatus === "idle") {
      dispatch(fetchForms());
    }
    if (dataStatus === "idle") {
      dispatch(fetchDataEntries());
    }
  }, [dispatch, formsStatus, dataStatus]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      {isLoading && <Loader />}
      <ErrorDialog onClose={() => {}} />
    </ThemeProvider>
  );
}

export default App;
