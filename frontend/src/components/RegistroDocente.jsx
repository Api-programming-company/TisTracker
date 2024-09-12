import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegistrarDocenteMutation } from "../api/docenteSlice";

const RegistroDocente = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registrarDocente, { isLoading, error }] =
    useRegistrarDocenteMutation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registrarDocente({
        nombre,
        apellidos,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }).unwrap();
      // Maneja el éxito del registro (por ejemplo, redirige al usuario o muestra un mensaje)
    } catch (error) {
      console.error("Error al registrar docente:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crea tu cuenta docente
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              helperText="*obligatorio"
            />
          </FormControl>

          {/* Apellidos */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              required
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              helperText="*obligatorio"
            />
          </FormControl>

          {/* Email */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="*obligatorio"
            />
          </FormControl>

          {/* Contraseña */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="*obligatorio"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {/* Confirmar Contraseña */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Confirmar Contraseña"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              helperText="*obligatorio"
            />
          </FormControl>

          {/* Botón de Registro */}
          <Box sx={{ position: "relative" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(255, 255, 255, 0.8)", // Opcional: Fondo semi-transparente para el área de carga
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error al registrar: {error.message}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default RegistroDocente;
