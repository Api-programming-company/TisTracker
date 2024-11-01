import {
  Box,
  Button,
  Container,
  Grid2,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DialogMod from "../DialogMod";
import { useUpdateInvitationByIdMutation } from "../../api/invitationApi";
import { formatDate } from "../../utils/validaciones";
import { useget } from "../../api/companyApi";
import { useInvitationDetailsByIdQuery } from "../../api/invitationApi";

const AcceptDeclineInvitation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isError, isSuccess, isLoading, isFetching } =
    useInvitationDetailsByIdQuery(id);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const [
    updateInvitation,
    {
      data: invitationData,
      error: invitationError,
      isSuccess: isInvitationSuccess,
      isLoading: isInvitationLoading,
      isError: isInvitationError,
    },
  ] = useUpdateInvitationByIdMutation();

  useEffect(() => {
    if (isInvitationSuccess) {
      console.log(invitationData);
      setSnackbar({
        open: true,
        message: invitationData?.message,
        severity: "sucess",
      });
      navigate("/");
    }
    if (isInvitationError) {
      console.log(invitationError);
      setSnackbar({
        open: true,
        message: invitationError?.data?.message,
        severity: "error",
      });
    }
  }, [isInvitationError, isInvitationSuccess, invitationData, invitationError]);
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

    await updateInvitation({
      id: id,
      data: { status: "A" },
    });
  };

  const handleDecline = async () => {
    setOpenR(false);
    updateInvitation({
      id: id,
      data: { status: "R" },
    });
  };

  if (isFetching || isInvitationLoading) {
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

  if (isError) {
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
        {error.data.message}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Detalles de la invitación
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "info.gray",
          borderRadius: "15px",
          padding: 5,
          mb: 5,
        }}
      >
        <Grid2 container spacing={2}>
          {}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Nombre largo</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{data.company.long_name}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Nombre corto</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{data.company.short_name}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Correo electrónico</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{data.company.email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Dirección</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{data.company.address}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Celular</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{data.company.phone}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Fecha de solicitud</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {formatDate(data.request_date)}
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
          content={"¿Estás seguro que deseas aceptar esta invitación?"}
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
          content={"¿Estás seguro que deseas rechazar esta invitación?"}
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
