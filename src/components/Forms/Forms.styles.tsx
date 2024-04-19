import {
  styled,
  Box,
  Card,
  Container,
  IconButton,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";

const StyledFormsContainer = styled(motion(Box), {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme, ...props }) => ({
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "& .FormsHeader": { gap: "1em", justifyContent: "end" },

  "& .FormsBody": {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  "& #CardActions": {
    display: "flex",
    justifyContent: "end",
    alignSelf: "end",
  },
}));

const StyledFormCard = styled(Card)(({ theme }) => ({
  background: theme.palette.card.background,
  cursor: "pointer",
  transition: "transform 0.3s ease",
  height: "220px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledDetailsButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledViewDataButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.info.main,
}));

const StyledEditIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.customColorPalette[3],
}));

const StyledDeleteIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: theme.palette.customColorPalette[3],
  width: 30,
  height: 30,
}));

const StyledCreateFormContainer = styled(Container)(({ theme }) => ({
  overflow: "auto",
  maxHeight: "90%",
}));

export {
  StyledFormsContainer,
  StyledFormCard,
  StyledCreateFormContainer,
  StyledEditIconButton,
  StyledDeleteIconButton,
  StyledAvatar,
  StyledDetailsButton,
  StyledViewDataButton,
};
