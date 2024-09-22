import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Snackbar,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { useCreateCompanyMutation } from "../api/companyApi";
import { useSearchStudentQuery } from "../api/studentApi"; // Importar el hook
import { useNavigate } from "react-router-dom";

const RegistroGE = () => {
  const navigate = useNavigate();
  const [createCompany, { data, isSuccess, isError, isLoading }] =
    useCreateCompanyMutation();

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

  // Buscador
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const { data: studentData, isFetching } = useSearchStudentQuery(searchTerm, {
    skip: searchTerm.length < 3, // Solo ejecutar la consulta si el término tiene al menos 3 caracteres
  });

  useEffect(() => {
    if (studentData && studentData.student) {
      // Verificar si el estudiante ya está seleccionado
      const student = studentData.student;
      if (!selectedItems.some((item) => item.id === student.id)) {
        setSelectedItems((prevItems) => [...prevItems, student]);
      }
      setSearchTerm(""); // Limpiar el campo de búsqueda
    }
  }, [studentData, selectedItems]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedItems.length < 3) {
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

    try {
      await createCompany(companyData).unwrap();
    } catch (error) {
      setSnackbarMessage("Error al enviar el formulario: " + error.message);
      setSnackbarOpen(true);
    }
  };

  const handleAddItem = (student) => {
    if (!selectedItems.some((item) => item.id === student.id)) {
      setSelectedItems((prevItems) => [...prevItems, student]);
      setSearchTerm(""); // Limpiar el campo de búsqueda después de agregar
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Registrar Grupo-Empresa
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: 2 }}>
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
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  value={emailGE}
                  onChange={handleEmailChange}
                  helperText={
                    emailError ? "Máx. 150 caracteres" : "* Obligatorio"
                  }
                  error={emailError}
                />
                <TextField
                  label="Dirección"
                  variant="outlined"
                  fullWidth
                  required
                  value={address}
                  onChange={handleAddressChange}
                  helperText={
                    addressError ? "Máx. 150 caracteres" : "* Obligatorio"
                  }
                  error={addressError}
                />
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  required
                  fullWidth
                  value={telefono}
                  onChange={handleTelefonoChange}
                  helperText="* Obligatorio"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Buscar estudiante"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearch}
                  helperText="min. 3 caracteres"
                />
                {isFetching && <CircularProgress size={24} />}
                {studentData && studentData.student && (
                  <List>
                    <ListItem
                      button
                      onClick={() => handleAddItem(studentData.student)}
                      sx={{ backgroundColor: "#F6F6F6", mb: 0.5 }}
                    >
                      <ListItemIcon>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${studentData.student.first_name} ${studentData.student.last_name}`}
                        secondary={`Email: ${studentData.student.email}`}
                      />
                    </ListItem>
                  </List>
                )}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Integrantes
                </Typography>
                <List>
                  {selectedItems.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Delete />
                        </IconButton>
                      }
                      sx={{ backgroundColor: "aliceblue", mb: 0.5 }}
                    >
                      <ListItemIcon>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${item.first_name} ${item.last_name}`}
                        secondary={`Email: ${item.email}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </FormControl>
            </Box>
          </FormControl>

          {/* Botón de Registro */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{
              display: "block",
              mx: "auto",
              mt: 2,
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
    </Container>
  );
};

export default RegistroGE;
