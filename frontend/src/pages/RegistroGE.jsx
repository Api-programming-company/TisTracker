import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

const RegistroPeriodoAcademico = () => {
  const [nombreLargo, setNombreLargo] = useState("");
  const [errorNombreLargo, setErrorNombreLargo] = useState(false);
  const [nombreCorto, setNombreCorto] = useState("");
  const [errorNombreCorto, setErrorNombreCorto] = useState(false);
  const [emailGE, setEmailGE] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState("");
  const [selectedGestion, setSelectedGestion] = useState("");
  const [allItems] = useState([
    {
      id: 1,
      name: "Juan Alberto Peredo Pozo",
      codsis: "202000571",
      ingroup: "false",
    },
    {
      id: 2,
      name: "Carlos José Padilla Poma",
      codsis: "202000572",
      ingroup: "false",
    },
    {
      id: 3,
      name: "Daniela Torrico Torreón",
      codsis: "202000570",
      ingroup: "false",
    },
    {
      id: 4,
      name: "Andres Castillo Lozada",
      codsis: "202100580",
      ingroup: "false",
    },
    {
      id: 5,
      name: "Antonio Gomez Amaranto",
      codsis: "202200740",
      ingroup: "false",
    },
    {
      id: 6,
      name: "Camila Torrez Gutierrez",
      codsis: "202100712",
      ingroup: "false",
    },
  ]);

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

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (itemId) => {
    const itemToAdd = allItems.find((item) => item.id === itemId);
    if (itemToAdd && !selectedItems.some((item) => item.id === itemId)) {
      setSelectedItems((prevItems) => [...prevItems, itemToAdd]);
    }
    setSearchTerm("");
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleChangeDocente = (event) => {
    setSelectedDocente(event.target.value);
  };

  const handleChangeGestion = (event) => {
    setSelectedGestion(event.target.value);
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

        <form>
          {/*  */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: 2 }}>
                {/* Nombre largo */}
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
                  sx={{
                    "& .MuiFormHelperText-root": {
                      marginBottom: 1,
                    },
                  }}
                />
                {/* Nombre corto */}
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
                  sx={{
                    "& .MuiFormHelperText-root": {
                      marginBottom: 1,
                    },
                  }}
                />
                {/* Correo electrónico */}
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
                  sx={{
                    "& .MuiFormHelperText-root": {
                      marginBottom: 1,
                    },
                  }}
                />
                {/* Dirección */}
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
                  sx={{
                    "& .MuiFormHelperText-root": {
                      marginBottom: 1,
                    },
                  }}
                />
                {/* Telefono */}
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  required
                  fullWidth
                  value={telefono}
                  onChange={handleTelefonoChange}
                  helperText="* Obligatorio"
                  sx={{
                    "& .MuiFormHelperText-root": {
                      marginBottom: 1,
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Buscar estudiante"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearch}
                  helperText="min. 3 integrantes"
                />
                {searchTerm && (
                  <List>
                    {filteredItems.map((item) => (
                      <ListItem
                        key={item.id}
                        button
                        disabled={selectedItems.find(
                          (selectedItem) => selectedItem.id === item.id
                        )}
                        onClick={() => handleAddItem(item.id)}
                        style={{
                          backgroundColor: "aliceblue",
                          marginBottom: "2px",
                        }}
                      >
                        <ListItemIcon>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                            alt="Icono persona"
                            style={{ width: "25px", height: "25px" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          secondary={`CODSIS: ${item.codsis}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
                <p>Integrantes</p>
                <List>
                  {selectedItems.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <img
                            src="https://cdn-icons-png.freepik.com/256/484/484662.png?semt=ais_hybrid"
                            alt="Icono borrar"
                            onClick={() => handleRemoveItem(item.id)}
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                          />
                        </IconButton>
                      }
                      style={{
                        backgroundColor: "aliceblue",
                        marginBottom: "2px",
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                          alt="Icono persona"
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={`CODSIS: ${item.codsis}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </FormControl>
            </Box>
          </FormControl>

          {/* Docente */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <label for="docente-select">Consultor TIS</label>
            <Select
              id="docente-select"
              value={selectedDocente}
              onChange={handleChangeDocente}
              sx={{ textAlign: "center" }}
            >
              <MenuItem disabled value="">
                Seleccionar Consultor TIS
              </MenuItem>
              <MenuItem value="docente1">Docente 1</MenuItem>
              <MenuItem value="docente2">Docente 2</MenuItem>
            </Select>
          </FormControl>

          {/* Gestion */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <label for="gestion-select">Gestión</label>
            <Select
              id="gestion-select"
              value={selectedGestion}
              onChange={handleChangeGestion}
              sx={{ textAlign: "center" }}
            >
              <MenuItem disabled value="">
                Seleccionar Gestión
              </MenuItem>

              <MenuItem value="gestion1">Gestión 1 - 2024</MenuItem>
              <MenuItem value="gestion2">Gestión 2 - 2024</MenuItem>
              <MenuItem value="gestion3">Gestión 3 (Verano) - 2024</MenuItem>
              <MenuItem value="gestion4">Gestión 4 (Invierno) - 2024</MenuItem>
            </Select>
          </FormControl>

          {/* Botón de Registro */}
          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{
              display: "block",
              mx: "auto",
              mt: 2,
              px: 12,
              py: 1,
              borderRadius: "30px",
            }}
          >
            REGISTRAR
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistroPeriodoAcademico;
