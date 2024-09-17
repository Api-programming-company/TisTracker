import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#a5d6a7", // Verde pastel
    },
    secondary: {
      main: "#ffab91", // Coral pastel
    },
    error: {
      main: "#f48fb1", // Rosa pastel
    },
    warning: {
      main: "#ffe082", // Amarillo pastel
    },
    info: {
      main: "#81d4fa", // Azul pastel
    },
    success: {
      main: "#c5e1a5", // Verde claro pastel
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#80e27e", // Verde pastel claro
    },
    secondary: {
      main: "#ffab91", // Coral pastel
    },
    error: {
      main: "#f48fb1", // Rosa pastel
    },
    warning: {
      main: "#ffe082", // Amarillo pastel
    },
    info: {
      main: "#81d4fa", // Azul pastel
    },
    success: {
      main: "#c5e1a5", // Verde claro pastel
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export { darkTheme, lightTheme };
