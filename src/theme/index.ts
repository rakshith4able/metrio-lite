import { createTheme, responsiveFontSizes } from "@mui/material";

// Define your custom color palette
const customColorPalette = [
  "#7f2add",
  "#f50057",
  "#19D3DA",
  "#373A40",
  "#686D76",
  "#EEEEEE",
  "#f3e5f5",
];

// Extend the MUI theme interfaces to include custom properties
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface Palette {
    customColorPalette: string[];
    card: {
      background: string;
    };
  }
  interface PaletteOptions {
    customColorPalette?: string[];
    card: {
      background: string;
    };
  }
}

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: customColorPalette[0],
    },
    secondary: {
      main: customColorPalette[1],
    },
    customColorPalette: customColorPalette,
    card: {
      background: "#fcf9ff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
