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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./css/RegistroEstudiante.css";

const RegistroEstudiante = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crea tu cuenta estudiante
        </Typography>

        <form>
          {/* Nombre */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              required
              helperText="* Obligatorio"
            />
          </FormControl>

          {/* Apellidos */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              required
              helperText="* Obligatorio"
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
              helperText="* Obligatorio"
            />
          </FormControl>

          {/* Código SIS */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Código SIS"
              variant="outlined"
              fullWidth
              required
              helperText="* Obligatorio"
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
              helperText="* Obligatorio"
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
              helperText="* Obligatorio"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {/* Botón de Registro */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistroEstudiante;
