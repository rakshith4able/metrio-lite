import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "appState/slices/formsSlice";
import dataReducer from "appState/slices/dataSlice";
import loadingReducer from "appState/slices/loadingSlice";
import errorReducer from "appState/slices/errorSlice";
import menuReducer from "appState/slices/menuSlice";

const store = configureStore({
  reducer: {
    forms: formsReducer,
    data: dataReducer,
    loading: loadingReducer,
    error: errorReducer,
    menu: menuReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store };
