import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import VerificacionCodigo from "../components/VerificacionCodigo";
import CryptoJS from "crypto-js";
import { validarContraseña } from "../utils/validaciones";

// Simulación de una función de backend para verificar si un correo ya está registrado
const verificarCorreoRegistrado = (email) => {
  const correosRegistrados = ["ejemplo@correo.com", "usuario@dominio.com"];
  return correosRegistrados.includes(email);
};

const Registro = () => {
  const [userType, setUserType] = useState("estudiante");
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleSwitchUserType = () => {
    setUserType((prevUserType) =>
      prevUserType === "docente" ? "estudiante" : "docente"
    );
    setFormData({
      nombre: "",
      apellidos: "",
      email: "",
      contraseña: "",
      confirmarContraseña: "",
    }); // Limpiar datos del formulario
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const encryptData = (data) => {
    const secretKey = "1234"; // Muy segura
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const handleRegister = () => {
    const { nombre, apellidos, email, contraseña, confirmarContraseña } =
      formData;
    let hasError = false;
    const newErrors = {};

    if (!nombre) {
      newErrors.nombre = "El nombre es obligatorio.";
      hasError = true;
    }

    if (!apellidos) {
      newErrors.apellidos = "Los apellidos son obligatorios.";
      hasError = true;
    }

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio.";
      hasError = true;
    } else if (verificarCorreoRegistrado(email)) {
      newErrors.email = "El correo ya está registrado.";
      hasError = true;
    }

    if (!contraseña) {
      newErrors.contraseña = "La contraseña es obligatoria.";
      hasError = true;
    } else if (!validarContraseña(contraseña)) {
      newErrors.contraseña =
        "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.";
      hasError = true;
    }

    if (!confirmarContraseña) {
      newErrors.confirmarContraseña = "Debe confirmar su contraseña.";
      hasError = true;
    } else if (contraseña !== confirmarContraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Si todo es válido, proceder con el registro
    const userTypeCode = userType === "docente" ? "D" : "E";
    const dataToSend = {
      ...formData,
      tipoUsuario: userTypeCode,
    };

    console.log("Enviando datos:", dataToSend);
    localStorage.setItem("userData", encryptData(dataToSend));
    setIsRegistering(true);
    navigate("/verify_email");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Regístrate como {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Typography>

        {!isRegistering ? (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre*"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
            />
            <TextField
              label="Apellidos*"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.apellidos)}
              helperText={errors.apellidos}
            />
            <TextField
              label="Email*"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Contraseña*"
              name="contraseña"
              type={showPassword ? "text" : "password"}
              value={formData.contraseña}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.contraseña)}
              helperText={errors.contraseña}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Confirmar Contraseña*"
              name="confirmarContraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmarContraseña}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.confirmarContraseña)}
              helperText={errors.confirmarContraseña}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
              sx={{ mt: 2 }}
            >
              Registrar
            </Button>

            <Button
              variant="outlined"
              color="default"
              fullWidth
              onClick={handleSwitchUserType}
              sx={{ mt: 2 }}
            >
              Cambiar a {userType === "docente" ? "Estudiante" : "Docente"}
            </Button>
          </Box>
        ) : (
          <VerificacionCodigo />
        )}

        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={handleLoginRedirect}
          sx={{ mt: 2 }}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Registro;
