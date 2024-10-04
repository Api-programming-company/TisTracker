import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import {
  Home,
  NotFound,
  UserRegister,
  RegistroGE,
  RegisterAcademicPeriod,
  ImageUpload,
  Login,
  VerifyEmail,
  Example,
  InvitacionesGE,
  SolicitudesGE,
  EditarListaGE,
  ConformacionGE,
  RegistroDocente,
} from "./pages";
import {
  AppBarWithMenu,
  AcademicPeriodList,
  EnrollToAcademicPeriod,
  CompanyList,
  StudentSearch,
} from "./components";
import { Box } from "@mui/material";

import VerGE from "./pages/VerGE";
import AcceptDeclineCompany from "./components/company/AcceptDeclineCompany";
import AcceptDeclineInvitation from "./components/student/AcceptDeclineInvitation";
import CompanyPlanning from "./components/company/CompanyPlanning";

import "./index.css";
import Autoevaluation from "./pages/Autoevaluation";

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
      <Box sx={{ marginTop: "64px" }}>
        <Routes>
          <Route path="/registro-estudiante" element={<UserRegister />} />
          <Route path="/registro-docente" element={<RegistroDocente />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/enroll-to-ap" element={<EnrollToAcademicPeriod />} />
          <Route path="/vergrupoe/:id" element={<VerGE />} />
          <Route path="/registroge" element={<RegistroGE />} />
          <Route path="/company-requests" element={<InvitacionesGE />} />

          <Route
            path="/company/:id/plannification"
            element={<CompanyPlanning />}
          />
          <Route path="/company/:id/invite" element={<StudentSearch />} />
          <Route path="/company/:id/confirm" element={<ConformacionGE />} />
          <Route path="/company/:id/uninvite" element={<EditarListaGE />} />
          <Route path="/academic-periods" element={<AcademicPeriodList />} />
          <Route path="/register-ap" element={<RegisterAcademicPeriod />} />

          <Route
            path="/academic-period/:id/companies"
            element={<CompanyList />}
          />
          <Route
            path="/academic-period/:id/pending"
            element={<SolicitudesGE />}
          />
          <Route
            path="/request/:id/pending"
            element={<AcceptDeclineCompany />}
          />
          <Route
            path="/invitation/:id/pending"
            element={<AcceptDeclineInvitation />}
          />

          {/* evaluacion */}
          <Route path="/autoevaluation" element={<Autoevaluation />} />

          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/example" element={<Example />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
