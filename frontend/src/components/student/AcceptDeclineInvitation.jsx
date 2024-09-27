import {
  Box,
  Button,
  Container,
  Grid2,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useActionData, useLocation } from "react-router-dom";
import DialogMod from "../DialogMod";
import { useUpdateInvitationByCompanyIdMutation } from "../../api/invitationApi";
import { formatDate } from "../utils/validaciones";

const AcceptDeclineInvitation = () => {
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
  // recuperando data de la empresa
  const companyInfo = useLocation().state.request;
  console.log(companyInfo);
  // para dialogs
  const [openA, setOpenA] = useState(false);
  const [openR, setOpenR] = useState(false);
  // para snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAccept = async () => {
    setOpenA(false);
    try {
        await updateInvitation({
          id: companyInfo.company.id,
          data: { status: "A" },
        }).unwrap();
        setSnackbar({
          open: true,
          message: "Solicitud aceptada",
          severity: "success",
        });
      } catch (error) {
        console.error("Error al aceptar la solicitud:", error);
        setSnackbar({
          open: true,
          message: "Ocurrió un error al aceptar la solicitud.",
          severity: "error",
        });
      }
  }

  const handleDecline = async () => {
    setOpenR(false);
    try {
      await updateInvitation({
        id: companyInfo.company.id,
        data: { status: "R" },
      }).unwrap();
      setSnackbar({
        open: true,
        message: "Solicitud rechazada",
        severity: "success",
      });
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      setSnackbar({
        open: true,
        message: "Ocurrió un error al rechazar la solicitud.",
        severity: "error",
      });
    }
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
          Detalles de la solicitud
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          borderRadius: "15px",
          padding: 2,
          mb: 5,
        }}
      >
        <Grid2 container spacing={2}>
          {}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Nombre largo</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {companyInfo.company.long_name}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Nombre corto</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {companyInfo.company.short_name}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Correo electrónico</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{companyInfo.company.email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Dirección</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {companyInfo.company.address}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Teléfono</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{companyInfo.company.phone}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Fecha de solicitud</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {formatDate(companyInfo.invitation_date)}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {/* Aceptar solicitud */}
        <Button
          onClick={() => setOpenA(true)}
          variant="contained"
          color="primary"
            disabled={isInvitationLoading}
          sx={{ mb: 2, px: 12, py: 1 }}
        >
          Aceptar
        </Button>
        <DialogMod
          open={openA}
          setOpen={setOpenA}
          title={"Aceptar"}
          content={"¿Estas seguro que deseas aceptar esta invitación?"}
            onAccept={handleAccept}
        />
        {/* Rechazar solicitud */}
        <Button
          onClick={() => setOpenR(true)}
          variant="outlined"
            disabled={isInvitationLoading}
          color="transparent"
          sx={{ mb: 2, px: 11, py: 1 }}
        >
          Rechazar
        </Button>
        <DialogMod
          open={openR}
          setOpen={setOpenR}
          title={"Rechazar"}
          content={"¿Estas seguro que deseas rechazar esta invitación?"}
            onAccept={handleDecline}
        />
        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={10000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </Container>
  );
};

export default AcceptDeclineInvitation;
