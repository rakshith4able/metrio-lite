import { Typography } from "@mui/material";
import { StyledNotFoundPageContainer } from "./StyledNotFoundPage";

export default function NotFoundPage() {
  return (
    <StyledNotFoundPageContainer maxWidth="sm">
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" align="center">
        The page you are looking for does not exist.
      </Typography>
    </StyledNotFoundPageContainer>
  );
}
