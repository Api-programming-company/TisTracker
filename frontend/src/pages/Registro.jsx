import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { RegistroDocente, RegistroEstudiante } from "../components";
import { useNavigate } from "react-router-dom";
import VerificacionCodigo from "../components/VerificacionCodigo";

const Registro = () => {
  const [userType, setUserType] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSwitchUserType = () => {
    setUserType((prevUserType) =>
      prevUserType === "docente" ? "estudiante" : "docente"
    );
  };

  const handleRegister = () => {
    // Lógica para registrar al usuario
    setIsRegistering(true);
    // Aquí podrías realizar el registro y, al finalizar, redirigir a la página de verificación.
    // Por ejemplo, podrías usar navigate("/verificacion-codigo");
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
        ) : !isRegistering ? (
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
              <RegistroDocente onRegister={handleRegister} />
            ) : (
              <RegistroEstudiante onRegister={handleRegister} />
            )}
          </Box>
        ) : (
            <VerificacionCodigo/>
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
