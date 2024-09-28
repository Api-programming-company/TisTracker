import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { validarContraseña, validateEmail } from "../utils/validaciones";
import { useRegisterUserMutation } from "../api/userApi";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const UserRegister = () => {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    user_type: "D",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [
    registerUser,
    { data, isFetching, isLoading, isSuccess, isError, error },
  ] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Registro exitoso:", data);
    }
    if (isError) {
      console.log("Error de registro:", error);
      // Handle server errors
      const errorResponse = error?.data?.errors || {};
      const newErrors = {};

      for (const [field, messages] of Object.entries(errorResponse)) {
        newErrors[field] = messages.join(" ");
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
    }
    if (isFetching) {
      console.log("esta fetching el registro!!!!");
    }
    if (isLoading) {
      console.log("esta loadinga el registro!!!!");
    }
  }, [isSuccess, isError, error, isFetching, isLoading, data]);
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegister = () => {
    const { first_name, last_name, email, password, password_confirmation } =
      formData;
    let hasError = false;
    const newErrors = {};

    const validations = {
      first_name: {
        condition: !first_name,
        message: "El nombre es obligatorio.",
      },
      last_name: {
        condition: !last_name,
        message: "Los apellidos son obligatorios.",
      },
      email: {
        condition: !email || !validateEmail(email),
        message: !email
          ? "El correo electrónico es obligatorio."
          : "Ingrese un correo electrónico válido.",
      },
      password: {
        condition: !password,
        message: "La contraseña es obligatoria.",
        additionalCheck: password.includes(" ")
          ? "La contraseña no puede contener espacios."
          : !validarContraseña(password) &&
            "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.",
      },
      password_confirmation: {
        condition: !password_confirmation,
        message: "Debe confirmar su contraseña.",
        additionalCheck:
          password !== password_confirmation && "Las contraseñas no coinciden.",
      },
    };

    for (const [
      field,
      { condition, message, additionalCheck },
    ] of Object.entries(validations)) {
      if (condition || additionalCheck) {
        newErrors[field] = additionalCheck || message;
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    console.log("Enviando datos:", formData);
    registerUser(formData);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 12, mb: 5, position: "relative" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Regístrate como Docente
        </Typography>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : isSuccess ? (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="h6" color="success.main">
              ¡Registro exitoso!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {data?.message || "Tu cuenta ha sido creada exitosamente."}
            </Typography>
          </Box>
        ) : (
          /* Mostrar el contenido cuando no está cargando */
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre*"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.first_name)}
              helperText={errors.first_name}
            />
            <TextField
              label="Apellidos*"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.last_name)}
              helperText={errors.last_name}
            />

            <TextField
              label="Correo electrónico*"
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
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password}
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
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.password_confirmation}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.password_confirmation)}
              helperText={errors.password_confirmation}
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
          </Box>
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

export default UserRegister;
