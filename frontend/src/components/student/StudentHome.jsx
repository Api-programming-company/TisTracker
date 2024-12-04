import React, { useContext } from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { InvitationsHome } from "../../pages";
import AcademicPeriodAbout from "../academicPeriod/AcademicPeriodAbout";

const StudentHome = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      label: user.company ? "Mi Grupo Empresa" : "Crear Grupo Empresa",
      path: user.company
        ? `/company/${user.company.company_id}`
        : "/registroge",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Taller de Ingeniería de Software
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />{" "}
      <Box display="flex" justifyContent="start" flexWrap="wrap" gap={3}>
        {user.academic_period_id ? (
          <>
            {menuItems.map((item, index) => (
              <Box key={index} flexBasis={{ xs: "100%", md: "30%" }}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "16px",
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
            <InvitationsHome />
            <AcademicPeriodAbout />
          </>
        ) : (
          <Box flexBasis={{ xs: "100%", md: "30%" }}>
            <Paper
              elevation={3}
              style={{ padding: "16px", cursor: "pointer" }}
              onClick={() => handleNavigate("/enroll-to-ap")}
            >
              <Typography variant="h5">Registrarse a un grupo</Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StudentHome;
