import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { AppProvider } from "./context/AppContext";
import { Planificacion, AppBarWithMenu } from "./components";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AppBarWithMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} userType={"guest"}/>

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
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
