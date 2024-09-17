import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
import {
  Home,
  NotFound,
  UserRegister,
  RegistroGE,
  RegistroPeriodoAcademico,
  ImageUpload,
  Login,
  VerifyEmail,
  Example,
} from "./pages";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Planificacion, AppBarWithMenu } from "./components";
import { lightTheme, darkTheme } from "./theme";
import VerGE from "./pages/VerGE";

function App() {
  const { user } = useContext(AppContext);
  const userType = user ? user.type : "guest";
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBarWithMenu
        darkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        userType={userType}
      />

      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/registroge" element={<RegistroGE />} />
        <Route
          path="/registroperiodoacademico"
          element={<RegistroPeriodoAcademico />}
        />
        <Route path="/registerplan" element={<Planificacion />} />
        <Route path="/upload" element={<ImageUpload />} />

        <Route path="/example" element={<Example />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
