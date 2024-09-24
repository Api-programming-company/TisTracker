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
  Snackbar,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useCreateCompanyMutation } from "../api/companyApi";
import { useNavigate } from "react-router-dom";

const ConformacionGE = () => {
  const navigate = useNavigate();
  const [{ isSuccess, isError, isLoading }] = useCreateCompanyMutation();

  //Lista de invitados de la grupo empresa
  const [allItems] = useState([
    { id: 1, name: "Juan Alberto Peredo Pozo", codsis: "202000571" },
    { id: 2, name: "Carlos José Padilla Poma", codsis: "202000572" },
    { id: 3, name: "Daniela Torrico Torreón", codsis: "202000570" },
    { id: 4, name: "Andres Castillo Lozada", codsis: "202100580" },
    { id: 5, name: "Antonio Gomez Amaranto", codsis: "202200740" },
    { id: 6, name: "Camila Torrez Gutierrez", codsis: "202100712" },
  ]);

  //Lista de invitados que ya han aceptado
  const [allAcceptedItems] = useState([
    { id: 1, name: "Juan Alberto Peredo Pozo", codsis: "202000571" },
    { id: 2, name: "Carlos José Padilla Poma", codsis: "202000572" },
    { id: 3, name: "Daniela Torrico Torreón", codsis: "202000570" },
    { id: 4, name: "Andres Castillo Lozada", codsis: "202100580" },
    { id: 5, name: "Antonio Gomez Amaranto", codsis: "202200740" },
    //{ id: 6, name: "Camila Torrez Gutierrez", codsis: "202100712" },
  ]);

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

  //Modificar aqui
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (allAcceptedItems.length !== allItems.length) {
      setSnackbarMessage(
        "Todos los integrantes deben aceptar la invitación antes de poder mandar la lista al docente TIS"
      );
      setSnackbarOpen(true);
      return;
    } else {
      alert("La lista se ha enviado a tu docente TIS");
      console.log("La lista se ha enviado a tu docente TIS");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Confirmar conformación de <br />
          Grupo Empresa
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography>
                  Estudiantes que aceptaron la invitación:
                </Typography>
                <Typography
                  sx={{
                    color:
                      allAcceptedItems.length === allItems.length
                        ? "green"
                        : "red",
                  }}
                >
                  {allAcceptedItems.length}/{allItems.length}
                </Typography>
              </Box>

              <List>
                {allAcceptedItems.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    sx={{ backgroundColor: "#F6F6F6", mb: 0.5 }}
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
            </Box>
            <Typography component="p">
              {allAcceptedItems.length === allItems.length
                ? "Todos los estudiantes aceptaron formar parte en tu grupo empresa. ¿Deseas enviar la lista oficial a tu docente de TIS?"
                : `Todos los estudiantes deben aceptar la invitación para conformar la lista oficial de la grupo empresa, antes de eso no podrás enviarle la solicitud de conformación a tu docente TIS.`}
            </Typography>

            <Typography
              component="p"
              sx={{ color: "#8E9090", fontSize: "14px", mt: 2 }}
            >
              Nota: Solamente se enviará la solicitud de conformación de la
              grupo empresa, tu docente todavía debe aceptar a tu equipo de
              trabajo para poder ser parte del curso de TIS
            </Typography>
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
              "ENVIAR"
            )}
          </Button>
        </form>

        {/* Snackbar para mensajes */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={8000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
};

export default ConformacionGE;
