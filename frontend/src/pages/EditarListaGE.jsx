import React, { useEffect, useState } from "react";
import {
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
  // Buscador
  const [selectedItems, setSelectedItems] = useState([]);

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
      setSnackbarMessage("Lista de integrantes enviada correctamente");
      setSnackbarOpen(true);
      navigate("/");
    }

    if (isError) {
      setSnackbarMessage("Error al enviar la lista de integrantes");
      setSnackbarOpen(true);
    }
  }, [isSuccess, isError, navigate, allToAcceptItems]);

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedItems.length + allAcceptedItems.length < 3) {
      setSnackbarMessage(
        "Deben ser mínimo 3 integrantes para conformar la grupo empresa"
      );
      setSnackbarOpen(true);
      return;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Lista de integrantes para <br />
          conformación de Grupo Empresa
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography variant="subtitle1">Por confirmar:</Typography>
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
                        backgroundColor: "info.gray",
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
