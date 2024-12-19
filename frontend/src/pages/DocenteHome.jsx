import React, { useContext } from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";

const DocenteHome = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const period = location.state?.period;
  const {academic_period_id} = useParams();

  const handleNavigate = (path) => {
    navigate(path, { state: { period } });
  };

  console.log("Usuario");
  console.log(user);
  console.log("Periodo academico");
  console.log(period);
  localStorage.setItem("periodId", JSON.stringify(academic_period_id));

  const menuItems = [
    {
      label: "Lista de Grupo Empresas",
      path: `/academic-period/${academic_period_id}/companies`,
    },
    {
      label: "Ver Grupo Empresas para Seguimiento Semanal",
      path: `/academic-period/${academic_period_id}/weekly_companies`,
    },
    {
      label: "Ver Solicitudes de creación de Grupo Empresas",
      path: `/academic-period/${academic_period_id}/seepending`,
    },
    {
      label: "Aceptar/Rechazar Solicitudes",
      path: `/academic-period/${academic_period_id}/pending`,
    },
    {
      label: "Ver calificaciones de Grupo Empresa",
      path: `/academic-period/${academic_period_id}/reports/companies`,
    },
    {
      label: "Ver calificaciones de estudiantes",
      path: `/academic-period/${academic_period_id}/reports/students`,
    },
    {
      label: "Ver reporte de evaluaciones semanales",
      path: `/academic-period/${academic_period_id}/companies-reports`,
    },
  ];

  const evaluationItems = [
    { label: "Asignar una evaluación", path: `/academic-period/${academic_period_id}/crearevaluacion/` },
    {
      label: "Crear plantilla de evaluación",
      path: `/academic-period/${academic_period_id}/evaluation-templates/create`,
    },
    { label: "Plantillas de evaluación", path: `/academic-period/${academic_period_id}/evaluation-templates` },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Periodo académico TIS
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />{" "}
      <Box
        display="flex"
        justifyContent="start"
        flexWrap="wrap"
        gap={3}
        sx={{ mb: 5 }}
      >
        {menuItems.map((item, index) => (
          <Box key={index} flexBasis={{ xs: "100%", md: "30%" }}>
            <Paper
              elevation={3}
              style={{
                cursor: "pointer",
                paddingTop: "32px",
                paddingBottom: "32px",
                paddingLeft: "16px",
                paddingRight: "16px",
                textAlign: "center",
                height: "100%",
              }}
              onClick={() => handleNavigate(item.path)}
            >
              <Typography variant="h5">{item.label}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Evaluaciones
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />{" "}
      <Box
        display="flex"
        justifyContent="start"
        flexWrap="wrap"
        gap={3}
        sx={{ mb: 5 }}
      >
        {evaluationItems.map((item, index) => (
          <Box key={index} flexBasis={{ xs: "100%", md: "30%" }}>
            <Paper
              elevation={3}
              style={{
                cursor: "pointer",
                paddingTop: "32px",
                paddingBottom: "32px",
                paddingLeft: "16px",
                paddingRight: "16px",
                textAlign: "center",
              }}
              onClick={() => handleNavigate(item.path)}
            >
              <Typography variant="h5">{item.label}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default DocenteHome;
