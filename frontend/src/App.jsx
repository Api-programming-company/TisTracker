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
import ProtectedRoutes from "./utils/ProtectedRoutes";
import "./index.css";
import Autoevaluation from "./pages/Autoevaluation";
import EvaluationMemberGE from "./pages/EvaluationMemberGE";
import EvaluationGE from "./pages/EvaluationGE";
import SeeCompanyPlanning from "./pages/SeeCompanyPlanning";
import SetFinalDeliverablePeriod from "./pages/SetFinalDeliverablePeriod";
import StudentHome from "./components/student/StudentHome";
import TeacherHome from "./components/teacher/TeacherHome";
import Test from "./components/Test";
import EvaluationTemplate from "./pages/EvaluationTemplate";
import PlanningSpreadSheet from "./pages/PlanningSpreadSheet";
import VerPlantillas from "./pages/VerPlantillas";
// import PlantillasVisualizer from "./pages/PlantillasVisualizer";

function App({ toggleTheme, isDarkMode }) {
  const { user } = useContext(AppContext);
  const userType = user ? user.user_type : "G";

  return (
    <>
      <AppBarWithMenu
        darkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        userType={userType}
      />
      <Box sx={{ marginTop: "64px" }}>
        <Routes>
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path="/enroll-to-ap" element={<EnrollToAcademicPeriod />} />
            <Route path="/vergrupoe/:id" element={<VerGE />} />
            <Route path="/registroge" element={<RegistroGE />} />
            <Route path="/company-requests" element={<InvitacionesGE />} />

            <Route
              path="/company/:id/plannification"
              element={<CompanyPlanning />}
            />

            <Route
              path="/planning_spreadsheet/:id"
              element={<PlanningSpreadSheet />}
            ></Route>

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
            <Route
              path="/autoevaluation/:company_id"
              element={<Autoevaluation />}
            />
            <Route
              path="/user-evaluation/:id"
              element={<EvaluationMemberGE />}
            />
            <Route
              path="/company-evaluation/:company_id"
              element={<EvaluationGE />}
            />
            <Route
              path="/evaluationtemplate" ///:company_id
              element={<EvaluationTemplate />}
            />
            <Route
              path="/verplantillas/:company_id"
              element={<VerPlantillas />}
            />
            {/* <Route path="/plantillas" element={<PlantillasVisualizer />} /> */}

            {/* pruebas */}
            <Route path="/test" element={<Test />} />
          </Route>

          <Route path="/registro-estudiante" element={<UserRegister />} />
          <Route path="/registro-docente" element={<RegistroDocente />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/teacher-home" element={<TeacherHome />} />

          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/example" element={<Example />} />
          <Route path="/planning/:id" element={<SeeCompanyPlanning />} />

          <Route
            path="/update-academic-period/:id"
            element={<SetFinalDeliverablePeriod />}
          ></Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
