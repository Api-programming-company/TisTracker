import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { RegistroDocente, RegistroEstudiante } from "../components";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleSwitchUserType = () => {
    setUserType((prevUserType) =>
      prevUserType === "docente" ? "estudiante" : "docente"
    );
  };
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Regístrate
        </Typography>

        {!userType ? (
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setUserType("docente")}
              sx={{ mb: 2 }}
            >
              Registrarse como Docente
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setUserType("estudiante")}
            >
              Registrarse como Estudiante
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              variant="outlined"
              color="default"
              fullWidth
              onClick={handleSwitchUserType}
              sx={{ mb: 2 }}
            >
              Cambiar a {userType === "docente" ? "Estudiante" : "Docente"}
            </Button>

            {userType === "docente" ? (
              <RegistroDocente />
            ) : (
              <RegistroEstudiante />
            )}
          </Box>
        )}

        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={handleLoginRedirect}
          sx={{ mt: 2 }}
        >
          Ya tienes una cuenta? Inicia sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Registro;
