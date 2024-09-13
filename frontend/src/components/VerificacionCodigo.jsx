import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const decryptData = (encryptedData) => {
  const secretKey = "1234";
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const VerificacionCodigo = () => {
  const [codigo, setCodigo] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const TIME_LIMIT = 15 * 60 * 1000; // 15 minutos en milisegundos

  useEffect(() => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData);
      const currentTime = new Date().getTime();
      const registrationTime = new Date(decryptedData.timestamp).getTime();

      if (currentTime - registrationTime > TIME_LIMIT) {
        // Si el tiempo ha superado el límite, borrar el localStorage y redirigir
        localStorage.removeItem("userData");
        navigate("/error"); // Redirige a una página de error o similar
      } else {
        setUserData(decryptedData);
        console.log("Datos recuperados:", decryptedData);
      }
    } else {
      // Redirigir a otra página si no hay datos
      navigate("/error");
    }
  }, [navigate]);

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
          disabled={!userData} // Deshabilitar si no hay datos
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleVerifyCode}
          disabled={!userData} // Deshabilitar si no hay datos
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
