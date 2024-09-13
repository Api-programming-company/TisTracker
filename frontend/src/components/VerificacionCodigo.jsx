import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerificacionCodigo = () => {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleVerifyCode = () => {
    // Lógica para verificar el código
    // Si es válido, redirige al usuario al login o al dashboard
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Verifica tu Correo Electrónico
        </Typography>
        <Typography variant="body1" gutterBottom>
          Por favor, ingresa el código de verificación enviado a tu correo electrónico.
        </Typography>

        <TextField
          label="Código de Verificación"
          variant="outlined"
          fullWidth
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleVerifyCode}
        >
          Verificar Código
        </Button>
      </Box>
    </Container>
  );
};

export default VerificacionCodigo;
