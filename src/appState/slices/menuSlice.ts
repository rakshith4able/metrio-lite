import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "appState/store";

type MenuState = {
  collapsed: boolean;
  toggled: boolean;
};
const initialState: MenuState = {
  collapsed: false,
  toggled: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenuCollapse: (state) => {
      state.collapsed = !state.collapsed;
    },
    toggleMenu: (state) => {
      state.toggled = !state.toggled;
    },
  },
});

export const { toggleMenuCollapse, toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;

export const selectMenuCollapsed = (state: RootState) => state.menu.collapsed;

export const selectMenuToggled = (state: RootState) => state.menu.toggled;
