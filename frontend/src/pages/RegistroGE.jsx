import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCreateCompanyMutation } from "../api/companyApi";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const RegistroGE = () => {
  const { user, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Estado para el dialog
  const navigate = useNavigate();
  const [createCompany, { data, error, isSuccess, isError, isLoading }] =
    useCreateCompanyMutation();

  useEffect(() => {
    if (isSuccess) {
      setConfirmationOpen(true); // Abrir el dialog cuando la creación sea exitosa
      console.log("nueva informacion del usuario: ", data.user);
      
      setUser(data.user)
    }

    if (isError) {
      // setSnackbarMessage("Error al enviar el formulario");
      setSnackbarMessage(error.data.message);
      setSnackbarOpen(true);
      console.log(error);

      // Manejo de errores de validación
      if (error?.status === 422 && error.data?.errors) {
        const serverErrors = error.data.errors;
        const newErrors = {};

        // Mapear los errores del servidor a los errores de estado
        for (const [key, messages] of Object.entries(serverErrors)) {
          const customMessages = {
            long_name: "El nombre largo ya está en uso.",
            short_name: "El nombre corto ya está en uso.",
            email: "El correo electrónico no es válido o ya está en uso.",
            address: "La dirección no es válido.",
            phone: "El teléfono no es válido.",
            members: "Los miembros no son válidos.",
          };
          newErrors[key] = customMessages[key] || messages[0];
        }
        setErrors(newErrors);
      }
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
          : "El nombre largo no debe exceder los 32 caracteres.",
      },
      short_name: {
        condition: !short_name || short_name.length > 8,
        message: !short_name
          ? "El nombre corto es obligatorio."
          : "El nombre corto no debe exceder los 8 caracteres.",
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
        condition:
          !phone ||
          !/^\d+$/.test(phone) ||
          phone.length > 8 ||
          phone.length < 7,
        message: !phone
          ? "El teléfono es obligatorio."
          : "El teléfono debe contener 7 u 8 dígitos.",
      },
    };

    for (const [field, { condition, message }] of Object.entries(validations)) {
      if (condition) {
        newErrors[field] = message;
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = {
      long_name,
      short_name,
      email,
      address,
      phone,
      academic_period_id: user?.academic_period_id,
    };

    createCompany(dataToSend);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setConfirmationOpen(false);
    navigate("/"); // Redirigir al cerrar el cuadro de diálogo
  };

  return (
    <Box sx={{ mt: 12, mb: 10, maxWidth: 600, mx: "auto" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 3 }}
      >
        Registrar Grupo Empresa
      </Typography>

      <form onSubmit={handleSubmit}>
        {[
          { label: "Nombre largo*", value: "long_name" },
          { label: "Nombre corto*", value: "short_name" },
          { label: "Correo electrónico*", value: "email" },
          { label: "Dirección*", value: "address" },
          { label: "Celular*", value: "phone" },
        ].map(({ label, value }) => (
          <Box sx={{ mb: 2 }} key={value}>
            <TextField
              label={label}
              variant="outlined"
              fullWidth
              name={value}
              value={formData[value] || ""}
              onChange={(e) => {
                // Permite solo números para el campo "phone"
                if (value === "phone") {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    handleInputChange(e);
                  }
                } else {
                  handleInputChange(e);
                }
              }}
              helperText={errors[value]}
              error={!!errors[value]}
            />
          </Box>
        ))}

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

      {/* Dialog de confirmación */}
      <Dialog
        open={confirmationOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Registro exitoso"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La empresa se ha creado con éxito.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegistroGE;
