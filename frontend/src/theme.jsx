import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2A628F", // Azul
      towhite: "#2A628F", //Azul -> Blanco en modo oscuro
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
      details: "#8e9090", //Gris para textos de descripción
      gray: "#f6f6f6", //Gris claro para cajas grises
    },
    success: {
      main: "#c5e1a5", // Verde claro pastel
      soft: "aliceblue",
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
      main: "#0B3F69", // Azul oscuro
      towhite: "#f0f0f0",
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
      details: "#8e9090",
      gray: "#000000", // Transparente
    },
    success: {
      main: "#c5e1a5", // Verde claro pastel
      soft: "aliceblue",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export { darkTheme, lightTheme };
