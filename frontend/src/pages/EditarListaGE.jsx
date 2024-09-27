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
import DialogMod from "../components/DialogMod";
import { useNavigate } from "react-router-dom";

const EditarListaGE = () => {
  const navigate = useNavigate();
  const [openA, setOpenA] = useState(false);
  const [{ isSuccess, isError, isLoading }] = useCreateCompanyMutation();
  const [itemIdToRemove, setItemIdToRemove] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);

  //Lista de invitados que aun no han aceptado
  const [allToAcceptItems] = useState([
    {
      id: 3,
      name: "Daniela Torrico Torreón",
      fechainvitacion: "07/12/2021",
      correo: "daniela@example.com",
      estado: "Aceptado",
    },
    {
      id: 4,
      name: "Andres Castillo Lozada",
      fechainvitacion: "07/12/2021",
      correo: "andres@example.com",
      estado: "Aceptado",
    },
    {
      id: 5,
      name: "Antonio Gomez Amaranto",
      fechainvitacion: "07/12/2021",
      correo: "antonio@example.com",
    },
    {
      id: 6,
      name: "Camila Torrez Gutierrez",
      fechainvitacion: "07/12/2021",
      correo: "camila@example.com",
    },
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

  const handleConfirmRemoveItem = (itemId) => {
    setOpenA(false);
    handleRemoveItem(itemId);
  };
  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    {
      /* if (condicion) {
      setSnackbarMessage(
        "Mensaje"
      );
      setSnackbarOpen(true);
      return;
    } */
    }
    alert("Invitaciones retiradas correctamente");
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
          Invitaciones Pendientes
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
                <Typography variant="subtitle1">
                  Lista de Invitaciones a Retirar:
                </Typography>
                <List>
                  {selectedItems.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            setItemIdToRemove(item.id);
                            setOpenA(true);
                          }}
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
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Correo: {item.correo}
                            </Typography>
                            <Typography variant="body2">
                              Invitación realizada en: {item.fechainvitacion}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <DialogMod
                  open={openA}
                  setOpen={setOpenA}
                  title={"Confirmar retiro de invitación"}
                  content={"¿Estas seguro que deseas retirar esta invitación?"}
                  onAccept={() => {
                    if (itemIdToRemove !== null) {
                      handleConfirmRemoveItem(itemIdToRemove);
                    }
                  }}
                />
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
