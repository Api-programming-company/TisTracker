import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí puedes añadir la lógica de autenticación
    console.log("Email:", email);
    console.log("Password:", password);
    // Redirigir a la página principal u otra página después de la autenticación
    navigate("/");
  };

  const handleRegisterRedirect = () => {
    navigate("/registro");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                variant="text"
                color="primary"
                onClick={handleRegisterRedirect}
              >
                ¿No tienes una cuenta? Regístrate
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
