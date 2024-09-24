import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useGetPendingCompaniesRequestQuery } from "../api/studentApi";
import { useUpdateInvitationByCompanyIdMutation } from "../api/invitationApi";

const InvitacionesGE = () => {
  const { data, error, isSuccess, isFetching, isError } =
    useGetPendingCompaniesRequestQuery();

  const [
    updateInvitation,
    {
      data: invitationData,
      error: invitationError,
      isSuccess: isInvitationSuccess,
      isLoading: isInvitationLoading,
      isError: isInvitationError,
    },
  ] = useUpdateInvitationByCompanyIdMutation();

  // Estados para manejar invitaciones y mensajes
  const [invitations, setInvitations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Estados para el diálogo de confirmación
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'accept' o 'decline'

  useEffect(() => {
    if (isSuccess) {
      setInvitations(data.companies); // Establece las invitaciones en el estado
    }
    if (isError) {
      console.log(error);
      
    }
  }, [isSuccess, isError, error, data]);

  useEffect(() => {
    if (isInvitationSuccess) {
      const statusMessage =
        actionType === "accept"
          ? "Invitación aceptada con éxito."
          : "Invitación rechazada con éxito.";
      setSuccessMessage(statusMessage);
      setOpenSnackbar(true);
      // Elimina la invitación aceptada/rechazada del estado
      setInvitations((prev) =>
        prev.filter(
          (invitation) => invitation.company.id !== selectedInvitationId
        )
      );
    }
    if (isInvitationError) {
      console.log(invitationError);
      setErrorMessage("Error al actualizar la invitación.");
      setOpenSnackbar(true);
    }
  }, [
    isInvitationSuccess,
    isInvitationError,
    invitationError,
    actionType,
    selectedInvitationId,
  ]);

  const handleAccept = (id) => {
    setSelectedInvitationId(id);
    setActionType("accept");
    setOpenDialog(true);
  };

  const handleDecline = (id) => {
    setSelectedInvitationId(id);
    setActionType("decline");
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (actionType === "accept") {
      updateInvitation({ id: selectedInvitationId, data: { status: "A" } });
    } else if (actionType === "decline") {
      updateInvitation({ id: selectedInvitationId, data: { status: "R" } });
    }
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isFetching) {
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
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Invitaciones de Grupo Empresas
        </Typography>

        {invitations.length === 0 && (
          <Typography variant="h6" align="center" color="textSecondary">
            No tienes invitaciones pendientes.
          </Typography>
        )}

        {invitations.map((invitation) => (
          <Box
            key={invitation.company.id}
            sx={{
              backgroundColor: "whitesmoke",
              borderRadius: "15px",
              padding: 2,
              mb: 5,
            }}
          >
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                mb: 1,
                mt: 3,
                mr: 3,
                ml: 3,
              }}
            >
              {/* Detalles de la grupo empresa*/}
              <Box sx={{ flex: 1, mr: 2, mb: 3 }}>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Has recibido una invitación para formar parte de:
                </Typography>
                <Typography
                  component="h1"
                  sx={{ color: "black", fontSize: "36px", lineHeight: "1" }}
                >
                  {invitation.company.short_name}
                </Typography>
                <Typography component="h2" sx={{ color: "black" }}>
                  {invitation.company.long_name}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Fecha: {invitation.invitation_date}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Docente: {"?"}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Gestión: {"?"}
                </Typography>
              </Box>

              {/* Botones de Aceptar y Rechazar */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mb: 3,
                  ml: 3,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleAccept(invitation.company.id)}
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    px: 12,
                    py: 1,
                  }}
                  disabled={isInvitationLoading}
                >
                  ACEPTAR
                </Button>

                <Button
                  onClick={() => handleDecline(invitation.company.id)}
                  variant="contained"
                  color="transparent"
                  disabled={isInvitationLoading}
                  sx={{
                    px: 12,
                    py: 1,
                    color: "black",
                  }}
                >
                  RECHAZAR
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
      />

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {actionType === "accept"
            ? "Aceptar Invitación"
            : "Rechazar Invitación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actionType === "accept"
              ? "¿Estás seguro de que deseas aceptar esta invitación?"
              : "¿Estás seguro de que deseas rechazar esta invitación?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            {actionType === "accept" ? "Aceptar" : "Rechazar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvitacionesGE;
