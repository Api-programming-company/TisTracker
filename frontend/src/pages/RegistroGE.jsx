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

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const RegistroGE = () => {
  // Estado para manejar datos del formulario y errores
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const [createCompany, { data, error, isSuccess, isError, isLoading }] =
    useCreateCompanyMutation();

  useEffect(() => {
    if (isSuccess) {
      setSnackbarMessage("Formulario enviado con éxito");
      setSnackbarOpen(true);
      navigate("/");
    }
    if (isError) {
      setSnackbarMessage("Error al enviar el formulario");
      setSnackbarOpen(true);
      console.log(error);
    }
  }, [isSuccess, isError, navigate, error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpia el error del campo al cambiar el valor
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { long_name, short_name, email, address, phone } = formData;
    let hasError = false;
    const newErrors = {};

    const validations = {
      long_name: {
        condition: !long_name || long_name.length > 32,
        message: !long_name
          ? "El nombre largo es obligatorio."
          : "El nombre largo no debe exceder 32 caracteres.",
      },
      short_name: {
        condition: !short_name || short_name.length > 10,
        message: !short_name
          ? "El nombre corto es obligatorio."
          : "El nombre corto no debe exceder 10 caracteres.",
      },
      email: {
        condition: !email || !validateEmail(email),
        message: !email
          ? "El correo electrónico es obligatorio."
          : "Ingrese un correo electrónico válido.",
      },
      address: {
        condition: !address,
        message: "La dirección es obligatoria.",
      },
      phone: {
        condition: !phone || !/^\d+$/.test(phone) || phone.length < 7,
        message: !phone
          ? "El teléfono es obligatorio."
          : "El teléfono debe contener solo dígitos y tener al menos 7 caracteres.",
      },
    };

    console.log(formData);

    for (const [field, { condition, message }] of Object.entries(validations)) {
      if (condition) {
        newErrors[field] = message;
        hasError = true;
      }
    }

    if (formData.members?.length < 1) {
      newErrors.members = "Deben ser mínimo 1 integrantes.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Prepara el nuevo formData con solo el ID y la permission de los miembros
    const membersData = formData.members.map((item) => ({
      id: item.id, // Asegúrate de que `item` tiene el campo `id`
      permission: item.permission || "R", // Asegúrate de que `item` tiene el campo `permission`
    }));

    const dataToSend = {
      long_name,
      short_name,
      email,
      address,
      phone,
      members: membersData, // Incluye solo los miembros con ID y permission
    };

    console.log("Enviando datos:", dataToSend);
    createCompany(dataToSend);
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
        {[
          { label: "Nombre largo*", value: "long_name" },
          { label: "Nombre corto*", value: "short_name" },
          { label: "Correo electrónico*", value: "email" },
          { label: "Dirección*", value: "address" },
          { label: "Teléfono*", value: "phone" },
        ].map(({ label, value }) => (
          <Box sx={{ mb: 2 }} key={value}>
            <TextField
              label={label}
              variant="outlined"
              fullWidth
              name={value}
              value={formData[value] || ""}
              onChange={handleInputChange}
              helperText={errors[value]}
              error={!!errors[value]}
            />
          </Box>
        ))}

        <Box sx={{ mb: 2 }}>
          <StudentSearch
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          {errors.members && (
            <Typography color="error" variant="caption">
              {errors.members}
            </Typography>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ display: "block", mx: "auto", mt: 3, px: 12, py: 1 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "REGISTRAR"
          )}
        </Button>
      </form>

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
