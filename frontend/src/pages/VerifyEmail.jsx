import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Alert, CircularProgress, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../api/userApi";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyEmail, { isLoading, isError, isSuccess, error }] = useVerifyEmailMutation();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (token) {
      console.log(token);
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    if (isSuccess) {
      setRedirecting(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Espera 2 segundos antes de redirigir
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Error al verificar el correo electrónico:", error);
    }
  }, [isError, error]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Verificar Correo Electrónico
      </Typography>
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Box textAlign="center">
          <Alert severity="error">
            {error?.data?.error || "Hubo un error al verificar el correo electrónico."}
          </Alert>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBackToHome}
            style={{ marginTop: '16px' }}
          >
            Volver al Home
          </Button>
        </Box>
      )}
      {isSuccess && !redirecting && (
        <Box textAlign="center">
          <Alert severity="success">
            El correo electrónico ha sido verificado exitosamente. Serás redirigido al login en breve.
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default VerifyEmail;
