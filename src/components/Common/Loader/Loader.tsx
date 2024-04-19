import LinearProgress from "@mui/material/LinearProgress";
import { StyledLoaderContainer } from "./Loader.styles";

export default function Loader() {
  return (
    <StyledLoaderContainer>
      <LinearProgress color="primary" />
    </StyledLoaderContainer>
  );
}
