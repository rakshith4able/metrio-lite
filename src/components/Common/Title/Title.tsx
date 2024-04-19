import { useNavigate } from "react-router-dom";
import { Variant } from "@mui/material/styles/createTypography";
import DragIndicator from "@mui/icons-material/DragIndicator";
import { StyledTitleContainer, StyledTitleText } from "./Title.styles";

type TitleProps = {
  variant?: Variant;
};

export default function Title({ variant = "h5" }: TitleProps) {
  const navigate = useNavigate();
  return (
    <StyledTitleContainer onClick={() => navigate("/")}>
      <DragIndicator sx={{ mr: 1 }} color="primary" />
      <StyledTitleText variant={variant} noWrap>
        Metrio LITE
      </StyledTitleText>
    </StyledTitleContainer>
  );
}
