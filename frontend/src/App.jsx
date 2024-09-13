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
import { CssBaseline, useMediaQuery, IconButton } from "@mui/material";
import { AppProvider } from "./context/AppContext";
import { Sidebar } from "./components";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
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
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
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
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Sidebar open={open} setOpen={setOpen} hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
          <IconButton 
            onClick={toggleDarkMode} 
            style={{ position: 'fixed', top: 16, right: 16, zIndex: 1200 }} // Position the button in the top-right corner
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <main
            style={{
              padding: '16px',
              marginLeft: hideSidebar ? 0 : (isSmallScreen ? 0 : 240),
              transition: 'margin-left 0.3s ease',
              position: 'relative',
              zIndex: 1,
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
