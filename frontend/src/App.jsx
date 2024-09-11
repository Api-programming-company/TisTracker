import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFound,
  RegistroDocente,
  RegistroEstudiante,
  RegistroPeriodoAcademico,
  ImageUpload,
} from "./pages";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrodocente" element={<RegistroDocente />} />
          <Route path="/registroestudiante" element={<RegistroEstudiante />} />
          <Route
            path="/registroperiodoacademico"
            element={<RegistroPeriodoAcademico />}
          />
          <Route path="/upload" element={<ImageUpload />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
