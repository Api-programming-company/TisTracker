import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Alert, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../api/userApi";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [hasVerified, setHasVerified] = useState(false); // Nuevo estado para controlar la verificación

  // Hook de mutación para verificar el correo electrónico
  const [verifyEmail, { isLoading, isError, isSuccess, error }] = useVerifyEmailMutation();

  useEffect(() => {
    if (token && !hasVerified) {
      setHasVerified(true); // Actualiza el estado para evitar solicitudes duplicadas
      // Imprime el token en la consola para depuración
      console.log(token);

      // Llama a la mutación para verificar el correo electrónico
      verifyEmail(token);
      setHasVerified(false); // Actualiza el estado para evitar solicitudes duplicadas
    }
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      // Redirige a una página de éxito o al inicio
      //navigate('/login');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      // Imprime el error en la consola para depuración
      console.error("Error al verificar el correo electrónico:", error);
    }
  }, [isError, error]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Verificar Correo Electrónico
      </Typography>
      {isLoading && (
        <CircularProgress />
      )}
      {isError && (
        <Alert severity="error">
          {error?.data?.message || "Hubo un error al verificar el correo electrónico."}
        </Alert>
      )}
      {isSuccess && (
        <Alert severity="success">
          El correo electrónico ha sido verificado exitosamente.
        </Alert>
      )}
    </Container>
  );
};

export default VerifyEmail;
