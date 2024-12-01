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
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyByIdMutation,
} from "../api/companyApi";
import DialogMod from "../components/DialogMod";
import BackBtn from "../components/navigation/BackBtn";

const statusMap = {
  A: "Aceptado",
  P: "Pendiente",
  R: "Rechazado",
};

const ConformacionGE = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const { data, error, isSuccess, isError, isLoading, isFetching } =
    useGetCompanyByIdQuery(id);

  useEffect(() => {
    if (isSuccess) console.log(data);
    if (isError) console.log(error);
  }, [data, error, isSuccess, isError]);

  useEffect(() => {
    if (isUpdateCompanySuccess) {
      setOpenConfirmModal(true);
      setSnackbarMessage("Solicitud enviada correctamente.");
      setSnackbarOpen(true);
      console.log(updateCompanyData);
    }
    if (isUpdateCompanyError) {
      setSnackbarMessage(
        updateCompanyError.data?.message || "Error al enviar la solicitud."
      );
      setSnackbarOpen(true);
      console.log(updateCompanyError);
    }
  }, [
    isUpdateCompanyError,
    updateCompanyError,
    updateCompanyData,
    isUpdateCompanySuccess,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const acceptedMembersCount = data.company.members.filter(
      (member) => member.status === "A"
    ).length;
    const pendingMembersCount = data.company.members.filter(
      (member) => member.status === "P"
    ).length;

    if (acceptedMembersCount < 3) {
      setSnackbarMessage(
        "Deben aceptar la invitación como mínimo 3 estudiantes"
      );
      setSnackbarOpen(true);
      return;
    }

    if (pendingMembersCount > 0) {
      setSnackbarMessage(
        "Tienes compañeros que faltan responder a la invitación"
      );
      setSnackbarOpen(true);
      return;
    }

    console.log("La lista se ha enviado a tu docente TIS");
    updateCompany({ id: id, data: { status: "P" } });
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

  const acceptedMembersCount = data.company.members.filter(
    (member) => member.status === "A"
  ).length;

  const handleConfirmAccept = () => {
    setOpenConfirmModal(false);
    navigate("/");
  };

  return (
    <Box className="section-container">
      <BackBtn/>
      <Container maxWidth="sm">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            Enviar solicitud de creación de <br /> Grupo Empresa
          </Typography>
          {data.company.status === "C" ? (
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
                      Estudiantes de la grupo empresa:
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          acceptedMembersCount === data.company.members.length
                            ? "green"
                            : "red",
                      }}
                    >
                      {acceptedMembersCount}/{data.company.members.length}
                    </Typography>
                  </Box>

                  <List>
                    {data.company.members.map((member,index) => (
                      <ListItem
                        key={member.id}
                        secondaryAction={
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            {index === 0 ? <b>Representante</b>: statusMap[member.status]}
                            
                          </Typography>
                        }
                        button
                        sx={{
                          backgroundColor: "info.gray",
                          mb: 0.5,
                        }}
                      >
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              bgcolor: "primary.main",
                              color: "white",
                              width: 56,
                              height: 56,
                              mr: 2,
                            }}
                          >
                            {member.user.first_name[0]}
                            {member.user.last_name[0]}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${member.user.first_name} ${member.user.last_name}`}
                          secondary={
                            <Typography variant="body2">
                              {member.user.email}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Typography component="p">
                  {acceptedMembersCount === data.company.members.length
                    ? "Todos los estudiantes que aceptaron formarán parte en tu grupo empresa. ¿Deseas enviar la lista oficial a tu docente de TIS?"
                    : "Todos los estudiantes deben aceptar o rechazar la invitación para conformar la lista oficial de la grupo empresa, antes de eso no podrás enviarle la solicitud de conformación a tu docente TIS."}
                </Typography>

                <Typography
                  component="p"
                  sx={{ color: "info.details", fontSize: "14px", mt: 2 }}
                >
                  Nota: Solamente se enviará la solicitud de conformación de la
                  grupo empresa, tu docente todavía debe aceptar a tu equipo de
                  trabajo.
                </Typography>
              </FormControl>

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
                  "Enviar Solicitud"
                )}
              </Button>
              <DialogMod
                open={openConfirmModal}
                setOpen={setOpenConfirmModal}
                title={"Confirmación"}
                content={"Solicitud enviada correctamente."}
                onAccept={handleConfirmAccept}
                onCancel={handleConfirmAccept}
                showButtonCancel={false}
              />
            </form>
          ) : data.company.status === "P" ? (
            <Typography>
              Ya enviaste la solicitud de creación de grupo empresa, espera a que tu docente
              acepte o rechace la solicitud.
            </Typography>
          ) : data.company.status === "A" ? (
            <Typography>
              La grupo empresa fue aceptada.
            </Typography>
          ) : (
            <Typography>
              La grupo empresa fue rechazada.
            </Typography>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={8000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        </Box>
      </Container>
    </Box>
    
  );
};

export default ConformacionGE;
