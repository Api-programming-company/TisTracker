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
import { useNavigate } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import { useUpdateCompanyByIdMutation } from "../api/companyApi";

const ConformacionGE = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [
    updateCompany,
    {
      data: updateCompanyData,
      isSuccess: isUpdateCompanySuccess,
      isLoading: isUpdateCompanyLoading,
      isError: isUpdateCompanyError,
      error: updateCompanyError,
    },
  ] = useUpdateCompanyByIdMutation();

  useEffect(() => {
    if (isUpdateCompanySuccess) {
      console.log("Actualización exitosa:", updateCompanyData);
    }

    if (isUpdateCompanyError) {
      console.error("Error al actualizar la compañía:", updateCompanyError);
    }
  }, [
    isUpdateCompanySuccess,
    isUpdateCompanyError,
    updateCompanyData,
    updateCompanyError,
  ]);

  const { data, error, isSuccess, isError, isLoading, isFetching } =
    useGetCompanyByIdQuery(id);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (isUpdateCompanySuccess) {
      setSnackbarMessage("Formulario enviado con éxito");
      setSnackbarOpen(true);
      console.log(updateCompanyData);
    }

    if (isUpdateCompanyError) {
      setSnackbarMessage("Error al enviar el formulario");
      setSnackbarOpen(true);
      console.log(updateCompanyError);
    }
  }, [
    isUpdateCompanyError,
    updateCompanyError,
    updateCompanyData,
    isUpdateCompanySuccess,
  ]);

  //Modificar aqui
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.company.members.filter((member) => member.pivot.status === "A")
        .length < 3
    ) {
      setSnackbarMessage(
        "Deben aceptar la invitación como mínimo 3 estudiantes"
      );
      setSnackbarOpen(true);
      return;
    }
    if (
      data.company.members.filter((member) => member.pivot.status === "P")
        .length
    ) {
      setSnackbarMessage(
        "Tienes compañeros que faltan responder a la invitación"
      );
      setSnackbarOpen(true);
      return;
    } else {
      alert("La lista se ha enviado a tu docente TIS");
      console.log("La lista se ha enviado a tu docente TIS");
      updateCompany({ id: id, data: { status: "P" } });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isFetching || isUpdateCompanyLoading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 12, mb: 10 }}>
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
                  Estudiantes invitados a la grupo empresa:
                </Typography>
                <Typography
                  sx={{
                    color:
                      data.company.members.filter(
                        (member) => member.pivot.status === "A"
                      ).length === data.company.members.length
                        ? "green"
                        : "red",
                  }}
                >
                  {
                    data.company.members.filter(
                      (member) => member.pivot.status === "A"
                    ).length
                  }
                  /{data.company.members.length}
                </Typography>
              </Box>

              <List>
                {data.company.members.map((member) => (
                  <ListItem
                    key={member.id}
                    secondaryAction={
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        {member.estado}
                      </Typography>
                    }
                    button
                    sx={{ backgroundColor: "#F6F6F6", mb: 0.5 }}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={`${member.first_name} ${member.last_name}`}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Correo: {member.email}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Typography component="p">
              {data.company.members.filter(
                (member) => member.pivot.status === "A"
              ).length === data.company.members.length
                ? "Todos los estudiantes que aceptaron formarán parte en tu grupo empresa. ¿Deseas enviar la lista oficial a tu docente de TIS?"
                : `Todos los estudiantes deben aceptar o rechazar la invitación para conformar la lista oficial de la grupo empresa, antes de eso no podrás enviarle la solicitud de conformación a tu docente TIS.`}
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
            disabled={isLoading || isUpdateCompanyLoading}
            sx={{
              display: "block",
              mx: "auto",
              px: 12,
              py: 1,
            }}
          >
            {isLoading || isUpdateCompanyLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "CONFIRMAR INTEGRANTES"
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
