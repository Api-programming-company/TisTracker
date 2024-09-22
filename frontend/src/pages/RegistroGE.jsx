import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useCreateCompanyMutation } from "../api/companyApi";
import { StudentSearch } from "../components";

const RegistroGE = () => {
  const navigate = useNavigate();
  const [createCompany, { data, error, isSuccess, isError, isLoading }] =
    useCreateCompanyMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
      
    }
  }, [isSuccess, isError, error, data])

  // Campos del formulario
  const [nombreLargo, setNombreLargo] = useState("");
  const [errorNombreLargo, setErrorNombreLargo] = useState(false);
  const [nombreCorto, setNombreCorto] = useState("");
  const [errorNombreCorto, setErrorNombreCorto] = useState(false);
  const [emailGE, setEmailGE] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [telefono, setTelefono] = useState("");

  // Integrantes seleccionados
  const [selectedItems, setSelectedItems] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setSnackbarMessage("Formulario enviado con éxito");
      setSnackbarOpen(true);
      navigate("/");
    }

    if (isError) {
      setSnackbarMessage("Error al enviar el formulario");
      setSnackbarOpen(true);
    }
  }, [isSuccess, isError, navigate]);

  const handleInputChange = (event, setValue, setError, maxLength) => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      setValue(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleNombreCortoChange = (event) => {
    handleInputChange(event, setNombreCorto, setErrorNombreCorto, 150);
  };

  const handleNombreLargoChange = (event) => {
    handleInputChange(event, setNombreLargo, setErrorNombreLargo, 150);
  };

  const handleEmailChange = (event) => {
    handleInputChange(event, setEmailGE, setEmailError, 150);
  };

  const handleAddressChange = (event) => {
    handleInputChange(event, setAddress, setAddressError, 150);
  };

  const handleTelefonoChange = (event) => {
    const value = event.target.value;
    const phoneRegex = /^(\+|\d|\s)*$/;
    if (phoneRegex.test(value) && value.length <= 15) {
      setTelefono(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedItems.length < 1) {
      setSnackbarMessage("Deben ser mínimo 3 integrantes");
      setSnackbarOpen(true);
      return;
    }

    const companyData = {
      long_name: nombreLargo,
      short_name: nombreCorto,
      email: emailGE,
      address: address,
      phone: telefono,
      members: selectedItems.map((item) => item.id),
    };
    console.log(companyData);
    //createCompany(companyData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ mt: 5, mb: 10, maxWidth: 600, mx: "auto" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 3 }}
      >
        Registrar Grupo-Empresa
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Nombre largo"
            variant="outlined"
            fullWidth
            required
            helperText={
              errorNombreLargo ? "Máx. 150 caracteres" : "* Obligatorio"
            }
            error={errorNombreLargo}
            value={nombreLargo}
            onChange={handleNombreLargoChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Nombre corto"
            variant="outlined"
            fullWidth
            required
            helperText={
              errorNombreCorto ? "Máx. 150 caracteres" : "* Obligatorio"
            }
            error={errorNombreCorto}
            value={nombreCorto}
            onChange={handleNombreCortoChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={emailGE}
            onChange={handleEmailChange}
            helperText={emailError ? "Máx. 150 caracteres" : "* Obligatorio"}
            error={emailError}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={handleAddressChange}
            helperText={addressError ? "Máx. 150 caracteres" : "* Obligatorio"}
            error={addressError}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Teléfono"
            variant="outlined"
            required
            fullWidth
            value={telefono}
            onChange={handleTelefonoChange}
            helperText="* Obligatorio"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          {/* Integración del buscador de estudiantes */}
          <StudentSearch
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </Box>

        {/* Botón de Registro */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            display: "block",
            mx: "auto",
            mt: 3,
            px: 12,
            py: 1,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "REGISTRAR"
          )}
        </Button>
      </form>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default RegistroGE;
