import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useGetPendingCompaniesRequestQuery } from "../api/studentApi";
import { useUpdateInvitationByCompanyIdMutation } from "../api/invitationApi";

const InvitacionesGE = () => {
  const { data, error, isSuccess, isFetching, isError } =
    useGetPendingCompaniesRequestQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);

  const [
    updateInvitation,
    {
      data: invitationData,
      error: invitationError,
      isSuccess: isInvitationSuccess,
      isFetching: isInvitationFetching,
      isError: isInvitationError,
    },
  ] = useUpdateInvitationByCompanyIdMutation();

  useEffect(() => {
    if (isInvitationSuccess) {
      console.log(invitationData);
    }
    if (isInvitationError) {
      console.log(invitationError);
    }
  }, [isInvitationSuccess, invitationError, isInvitationError, invitationData]);

  const handleAccept = (id) => {
    updateInvitation({ id, data: { status: "A" } });
    console.log(`Invitación de ${id} aceptada`);
  };

  const handleDecline = (id) => {
    updateInvitation({ id, data: { status: "R" } });
    console.log(`Invitación de ${id} rechazada`);
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
          Invitaciones de Grupo-Empresas
        </Typography>

        {isSuccess && data.companies?.length === 0 && (
          <Typography variant="h6" align="center" color="textSecondary">
            No tienes invitaciones pendientes.
          </Typography>
        )}

        {isSuccess && data.companies?.map((invitation) => (
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
              {/* Detalles de la Grupo-Empresa, lado izquierdo */}
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
                >
                  ACEPTAR
                </Button>

                <Button
                  onClick={() => handleDecline(invitation.company.id)}
                  variant="contained"
                  color="transparent"
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
    </Container>
  );
};

export default InvitacionesGE;
