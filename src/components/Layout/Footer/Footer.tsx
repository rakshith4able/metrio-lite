import { Toolbar, Typography } from "@mui/material";
import { StyledFooter } from "./Footer.styles";

export default function Footer() {
  return (
    <StyledFooter position="static" elevation={0}>
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          &copy; {new Date().getFullYear()} Metrio LITE. All rights reserved.
        </Typography>
      </Toolbar>
    </StyledFooter>
  );
}
