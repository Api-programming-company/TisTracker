import React, { useContext } from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const EvaluationsHome = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  console.log(user);
  const menuItems = [
    { label: "Asignar una evaluación", path: `/crearevaluacion/${user.id}` },
    {
      label: "Crear plantilla de evaluación",
      path: "/evaluation-templates/create",
    },
    { label: "Ver plantillas de evaluación", path: "/evaluation-templates" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Evaluaciones
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />{" "}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
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

export default EvaluationsHome;
