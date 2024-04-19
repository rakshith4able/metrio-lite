import { Box, IconButton, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  MenuOpen,
  Description as FormsIcon,
  DataArray as DataIcon,
  AddBox as CreateIcon,
  Home as HomeIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import {
  Menu,
  MenuItem,
  SubMenu,
  Sidebar as ProSidebar,
} from "react-pro-sidebar";
import { useAppDispatch } from "appState/hooks";
import {
  selectMenuCollapsed,
  selectMenuToggled,
  toggleMenu,
  toggleMenuCollapse,
} from "appState/slices/menuSlice";
import Title from "components/Common/Title/Title";

export default function Sidebar() {
  const collapsed = useSelector(selectMenuCollapsed);
  const toggled = useSelector(selectMenuToggled);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const handleToggleSidebar = () => {
    dispatch(toggleMenuCollapse());
  };
  return (
    <ProSidebar
      collapsed={collapsed}
      breakPoint="sm"
      toggled={toggled}
      backgroundColor={theme.palette.customColorPalette[6]}
      onBackdropClick={() => dispatch(toggleMenu())}
    >
      <Menu closeOnClick={true}>
        {collapsed ? (
          <MenuItem onClick={handleToggleSidebar} icon={<MenuIcon />} />
        ) : (
          <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
            <Title variant="body1" />
            <IconButton onClick={handleToggleSidebar}>
              <MenuOpen />
            </IconButton>
          </Box>
        )}
        <MenuItem
          icon={<HomeIcon color="primary" />}
          component={<Link to="/forms" />}
        >
          Home
        </MenuItem>
        <SubMenu label="Forms" icon={<FormsIcon color="primary" />}>
          <MenuItem
            icon={<CreateIcon color="primary" />}
            component={<Link to="/forms/create" />}
          >
            Create Forms
          </MenuItem>
          <MenuItem
            icon={<EditIcon color="primary" />}
            component={<Link to="/forms/modify" />}
          >
            Modify Forms
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<DataIcon color="primary" />}
          component={<Link to="/forms/data" />}
        >
          Data
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}
