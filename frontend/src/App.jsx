import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  NotFound,
  Registro,
  RegistroPeriodoAcademico,
  ImageUpload,
  Login,
} from "./pages";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { AppProvider } from "./context/AppContext";
import { Sidebar } from "./components";

// Tema de material design
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#673ab7",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // fuente global
  },
});

function App() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Ajusta según el breakpoint deseado
  const [open, setOpen] = useState(false); // Manejo del estado abierto/cerrado

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Sidebar open={open} setOpen={setOpen}/>
          <main
            style={{
              padding: '16px',
              marginLeft: isSmallScreen ? 0 : 240, // Ajusta el margen solo si el Sidebar está abierto en pantallas grandes
              transition: 'margin-left 0.3s ease', // Transición suave para el margen
              position: 'relative', // Posición relativa para que el contenido no se mueva con el Sidebar
              zIndex: 1, // Asegura que el contenido esté debajo del Sidebar
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/registroperiodoacademico" element={<RegistroPeriodoAcademico />} />
              <Route path="/upload" element={<ImageUpload />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
