import { useSelector } from "react-redux";
import { AppBar, Box, Toolbar, IconButton, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Title from "components/Common/Title/Title";
import { toggleMenu, selectMenuToggled } from "appState/slices/menuSlice";
import { useAppDispatch } from "appState/hooks";

export default function Header() {
  const toggled = useSelector(selectMenuToggled);
  const dispatch = useAppDispatch();

  const handleMenuButtonClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <AppBar position="static" color="transparent" component={Box} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleMenuButtonClick}
              color="inherit"
              sx={{
                display: {
                  xs: toggled ? "none" : "block",
                  sm: "none",
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Title />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
