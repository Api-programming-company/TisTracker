import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
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
  Logout
} from "./pages";
import { Planificacion, AppBarWithMenu } from "./components";

import VerGE from "./pages/VerGE";

function App({ toggleTheme, isDarkMode }) {
  const { user } = useContext(AppContext);
  const userType = user ? user.user_type : "guest";

  return (
    <>
      <AppBarWithMenu
        darkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        userType={userType}
      />

      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/logout" element={<Logout />} />

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
    </>
  );
}

export default App;
