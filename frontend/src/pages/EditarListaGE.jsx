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
import { useNavigate } from "react-router-dom";

const EditarListaGE = () => {
  const navigate = useNavigate();
  const [{ isSuccess, isError, isLoading }] = useCreateCompanyMutation();
  const [itemColor, setItemColor] = useState({});
  // Buscador
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  //Lista de estudiantes del curso
  const [allItems] = useState([
    { id: 1, name: "Juan Alberto Peredo Pozo", codsis: "202000571" },
    { id: 2, name: "Carlos José Padilla Poma", codsis: "202000572" },
    { id: 3, name: "Daniela Torrico Torreón", codsis: "202000570" },
    { id: 4, name: "Andres Castillo Lozada", codsis: "202100580" },
    { id: 5, name: "Antonio Gomez Amaranto", codsis: "202200740" },
    { id: 6, name: "Camila Torrez Gutierrez", codsis: "202100712" },
  ]);

  //Lista de invitados que aun no han aceptado
  const [allToAcceptItems] = useState([
    { id: 2, name: "Carlos José Padilla Poma", codsis: "202000572" },
    { id: 4, name: "Andres Castillo Lozada", codsis: "202100580" },
    { id: 5, name: "Antonio Gomez Amaranto", codsis: "202200740" },
    { id: 6, name: "Camila Torrez Gutierrez", codsis: "202100712" },
  ]);

  //Lista de invitados que ya han aceptado
  const [allAcceptedItems] = useState([
    { id: 1, name: "Juan Alberto Peredo Pozo", codsis: "202000571" },
    { id: 3, name: "Daniela Torrico Torreón", codsis: "202000570" },
  ]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setSelectedItems((prevItems) => [...prevItems, ...allToAcceptItems]);

    if (isSuccess) {
      setSnackbarMessage("Formulario enviado con éxito");
      setSnackbarOpen(true);
      navigate("/");
    }

    if (isError) {
      setSnackbarMessage("Error al enviar el formulario");
      setSnackbarOpen(true);
    }
  }, [isSuccess, isError, navigate, allToAcceptItems]);

  //Funciones para el Buscador
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (itemId) => {
    const itemToAdd = allItems.find((item) => item.id === itemId);
    if (
      itemToAdd &&
      !selectedItems.some((item) => item.id === itemId) &&
      !allAcceptedItems.some((item) => item.id === itemId)
    ) {
      setSelectedItems((prevItems) => [...prevItems, itemToAdd]);
    } else if (allAcceptedItems.some((item) => item.id === itemId)) {
      setSnackbarMessage(`${itemToAdd.name} ya está en la lista de aceptados.`);
      setSnackbarOpen(true);
    }
    setSearchTerm("");

    //Colorear un item al agregarse
    setItemColor((prevColors) => ({
      ...prevColors,
      [itemId]: "success.soft",
    }));

    setTimeout(() => {
      setItemColor((prevColors) => ({
        ...prevColors,
        [itemId]: "info.gray",
      }));
    }, 2000);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedItems.length + allAcceptedItems.length < 3) {
      setSnackbarMessage("Deben ser mínimo 3 integrantes");
      setSnackbarOpen(true);
      return;
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
          Lista de integrantes para <br />
          conformación de grupo empresa
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
                  label="Buscar estudiante"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearch}
                  helperText=" "
                />
                {searchTerm && (
                  <List>
                    {filteredItems.map((item) => (
                      <ListItem
                        key={item.id}
                        button
                        disabled={selectedItems.some(
                          (selectedItem) => selectedItem.id === item.id
                        )}
                        onClick={() => handleAddItem(item.id)}
                        sx={{ backgroundColor: "info.gray", mb: 0.5 }}
                      >
                        <ListItemIcon>
                          <Avatar>
                            <Person />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          secondary={`CODSIS: ${item.codsis}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Por confirmar:
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
                      sx={{
                        backgroundColor: itemColor[item.id] || "info.gray",
                        mb: 0.5,
                      }}
                    >
                      <ListItemIcon>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={`CODSIS: ${item.codsis}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography>
                  Estudiantes que aceptaron la invitación:
                </Typography>
                <List>
                  {allAcceptedItems.map((item) => (
                    <ListItem
                      key={item.id}
                      button
                      disabled={selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      sx={{ backgroundColor: "info.gray", mb: 0.5 }}
                    >
                      <ListItemIcon>
                        <Avatar>
                          <Person />
                        </Avatar>
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
              "REALIZAR CAMBIOS"
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

export default EditarListaGE;
