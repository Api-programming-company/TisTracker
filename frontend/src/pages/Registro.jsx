import React, { useState } from "react";
import { Button, Container, Typography, Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { VerificarEmail, VerificacionCodigo } from "../components";
import { validarContraseña } from "../utils/validaciones";
import { encryptData } from "../utils";

const Registro = () => {
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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("estudiante");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

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
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      setIsEmailVerified(false);
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleEmailVerification = (message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: message,
    }));
    setIsEmailVerified(!message);
  };

  const handleRegister = () => {
    const { nombre, apellidos, email, contraseña, confirmarContraseña } = formData;
    let hasError = false;
    const newErrors = {};

    const validations = {
      nombre: {
        condition: !nombre,
        message: "El nombre es obligatorio.",
      },
      apellidos: {
        condition: !apellidos,
        message: "Los apellidos son obligatorios.",
      },
      email: {
        condition: !email,
        message: "El correo electrónico es obligatorio.",
        additionalCheck: errors.email,
      },
      contraseña: {
        condition: !contraseña,
        message: "La contraseña es obligatoria.",
        additionalCheck:
          !validarContraseña(contraseña) &&
          "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.",
      },
      confirmarContraseña: {
        condition: !confirmarContraseña,
        message: "Debe confirmar su contraseña.",
        additionalCheck:
          contraseña !== confirmarContraseña && "Las contraseñas no coinciden.",
      },
    };

    for (const [field, { condition, message, additionalCheck }] of Object.entries(validations)) {
      if (condition || additionalCheck) {
        newErrors[field] = additionalCheck || message;
        hasError = true;
      }
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
      timestamp: new Date().toISOString(),
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

            <VerificarEmail
              email={formData.email}
              onEmailChange={handleInputChange}
              setErrors={handleEmailVerification}
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
