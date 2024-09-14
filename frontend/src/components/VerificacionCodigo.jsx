import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../utils";
const TIME_LIMIT = 15 * 60 * 1000; // 15 minutos en milisegundos

const VerificacionCodigo = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData);
      const currentTime = new Date().getTime();
      const registrationTime = new Date(decryptedData.timestamp).getTime();

      if (currentTime - registrationTime > TIME_LIMIT) {
        // Si el tiempo ha superado el límite, borrar el localStorage y redirigir
        localStorage.removeItem("userData");
        navigate("/error");
      } else {
        setUserData(decryptedData);
        console.log("Datos recuperados:", decryptedData);
      }
    } else {
      navigate("/error");
    }
  }, [navigate]);

  const handleVerifyCode = () => {
    // Lógica para verificar el código
    navigate("/login");
  };
  const isButtonDisabled = codigo.length !== 6 || isNaN(Number(codigo));

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Verifica tu Correo Electrónico
        </Typography>
        <Typography variant="body1" gutterBottom>
          Por favor, ingresa el código de verificación enviado a tu correo
          electrónico.
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
          disabled={isButtonDisabled}
        >
          Verificar Código
        </Button>

        {!userData && (
          <Typography variant="body2" color="error" mt={2}>
            No se encontraron datos válidos o el tiempo de registro ha expirado.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default VerificacionCodigo;
