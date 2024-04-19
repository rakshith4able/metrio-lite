import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { setError } from "appState/slices/errorSlice";

export const handleAxiosError = (
  error: AxiosError,
  dispatch: Dispatch<any>
) => {
  if (error.response) {
    // Server responded with an error status code (4xx, 5xx)
    const status = error.response.status;
    let errorMessage;
    switch (status) {
      case 404:
        errorMessage = "Resource not found. Please try again later.";
        break;
      case 500:
        errorMessage = "Internal server error. Please try again later.";
        break;
      default:
        errorMessage = `An error occurred: ${error.response.statusText}`;
    }
    dispatch(setError(errorMessage));
  } else if (error.request) {
    // Request made but no response received
    dispatch(setError("No response from server. Please try again later."));
  } else {
    // Something else happened while setting up the request
    dispatch(setError("Network error. Please check your internet connection."));
  }
};
