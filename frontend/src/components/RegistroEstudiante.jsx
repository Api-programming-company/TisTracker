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

const RegistroEstudiante = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    codigoSIS: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.nombre) errors.nombre = "El nombre es obligatorio.";
    if (!formData.apellidos) errors.apellidos = "Los apellidos son obligatorios.";
    if (!formData.email) errors.email = "El correo electrónico es obligatorio.";
    if (!formData.codigoSIS) errors.codigoSIS = "El código SIS es obligatorio.";
    if (!formData.password) errors.password = "La contraseña es obligatoria.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Lógica para registrar al estudiante
      // Suponiendo que la función de registro devuelve una promesa
      //await registrarEstudiante(formData);
      if (onRegister) onRegister(); // Llamar a la función después del registro exitoso
    } catch (error) {
      // Manejar errores
      console.error("Error al registrar estudiante:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crea tu cuenta estudiante
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Nombre"
              name="nombre"
              variant="outlined"
              fullWidth
              required
              value={formData.nombre}
              onChange={handleChange}
              helperText={formErrors.nombre}
              error={!!formErrors.nombre}
            />
          </FormControl>

          {/* Apellidos */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Apellidos"
              name="apellidos"
              variant="outlined"
              fullWidth
              required
              value={formData.apellidos}
              onChange={handleChange}
              helperText={formErrors.apellidos}
              error={!!formErrors.apellidos}
            />
          </FormControl>

          {/* Email */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              helperText={formErrors.email}
              error={!!formErrors.email}
            />
          </FormControl>

          {/* Código SIS */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Código SIS"
              name="codigoSIS"
              variant="outlined"
              fullWidth
              required
              value={formData.codigoSIS}
              onChange={handleChange}
              helperText={formErrors.codigoSIS}
              error={!!formErrors.codigoSIS}
            />
          </FormControl>

          {/* Contraseña */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              name="password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              helperText={formErrors.password}
              error={!!formErrors.password}
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
              name="confirmPassword"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              helperText={formErrors.confirmPassword}
              error={!!formErrors.confirmPassword}
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
