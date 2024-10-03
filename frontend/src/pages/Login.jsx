import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/userApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateEmail } from "../utils/validaciones";
import AppContext from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [loginUser, { data, error, isLoading, isSuccess, isError }] =
    useLoginUserMutation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("logeado supuestamente", data);
      if (data.user) {
        setUser(data.user);
        navigate("/");
      }
      
    }

    if (isError) {
      if (error?.status === 401) {
        setErrors({ ...errors, general: "Credenciales incorrectas" });
      } else if (error?.status === 422 && error?.data?.errors) {
        setErrors(error.data.errors);
      } else {
        setErrors({
          ...errors,
          general: "Se ha producido un error inesperado.",
        });
      }
    }
  }, [isSuccess, isError]);

  const handleLogin = (event) => {
    event.preventDefault();

    // Validaciones
    const newErrors = {};
    let hasError = false;

    if (!email || !validateEmail(email)) {
      newErrors.email = !email
        ? "El correo electrónico es obligatorio."
        : "Ingrese un correo electrónico válido.";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
      hasError = true;
    }

    // Si hay errores, establecerlos y no enviar la solicitud
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores, enviar los datos
    loginUser({ email, password });
  };

  const handleRegisterRedirect = (type) => {
    navigate(`/registro-${type}`);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }

    // borramos el error general y el del campo
    setErrors({
      ...errors,
      [field]: "",
      general: "",
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 12,
          mb: 5,
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
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
            slotProps={{
              input: {
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
              },
            }}
          />
          {errors.general && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.general}
            </Alert>
          )}
          <Button
            id="log"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading || errors.general}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              color="primary"
              onClick={() => handleRegisterRedirect("docente")}
              disabled={isLoading}
            >
              Regístrate como Docente
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => handleRegisterRedirect("estudiante")}
              disabled={isLoading}
            >
              Regístrate como Estudiante
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
