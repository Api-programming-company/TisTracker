import {
  Box,
  Button,
  Container,
  Grid2,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MemberAccordion from "./MemberAccordion";
import DialogMod from "../DialogMod";
import { useUpdateCompanyByIdMutation } from "../../api/companyApi";

const AcceptDeclineCompany = () => {
  const invitacionesEjemplo = {
    message: "Compañías pendientes obtenidas correctamente.",
    company: {
      id: 33,
      long_name: "asdfasasdasf",
      short_name: "asdas",
      email: "asdasd@sadas.com",
      address: "sdasdasd",
      phone: "77665453",
      academic_period_id: 1,
      created_at: "2024-09-24T05:58:41.000000Z",
      updated_at: "2024-09-27T02:56:01.000000Z",
      status: "A",
      members_count: 2,
      members: [
        {
          user_id: 8,
          email: "123456789@est.umss.edu",
          pivot: {
            company_id: 33,
            user_id: 8,
            status: "P",
            permission: "W",
            created_at: "2024-09-24T05:58:42.000000Z",
            updated_at: "2024-09-24T05:58:42.000000Z",
          },
        },
        {
          user_id: 9,
          email: "123456789@est.umss.edu",
          pivot: {
            company_id: 33,
            user_id: 9,
            status: "P",
            permission: "W",
            created_at: "2024-09-24T05:58:42.000000Z",
            updated_at: "2024-09-24T05:58:42.000000Z",
          },
        },
        {
          user_id: 10,
          email: "123456789@est.umss.edu",
          pivot: {
            company_id: 33,
            user_id: 10,
            status: "P",
            permission: "W",
            created_at: "2024-09-24T05:58:42.000000Z",
            updated_at: "2024-09-24T05:58:42.000000Z",
          },
        },
      ],
    },
    invitation_date: "2024-09-24T05:58:42.000000Z",
  };
  //---------------------------------------------------------------------
  const [
    updateCompany,
    {
      data: updateData,
      error: updateError,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateCompanyByIdMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openA, setOpenA] = useState(false);
  const [openR, setOpenR] = useState(false);
  const formatDate = (date) => {
    const newDate = new Date(date);
    const formatedDate =
      newDate.getDate() +
      1 +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();
    return formatedDate;
  };

  const handleAccept = async () => {
    setOpenA(false);
    try {
      await updateCompany({
        id: invitacionesEjemplo.company.id,
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
  };
  const handleDecline = async () => {
    setOpenR(false);
    try {
      await updateCompany({
        id: invitacionesEjemplo.company.id,
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
          Detales de la solicitud
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
              {invitacionesEjemplo.company.long_name}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Nombre corto</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {invitacionesEjemplo.company.short_name}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Correo electrónico</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {invitacionesEjemplo.company.email}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Dirección</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {invitacionesEjemplo.company.address}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Teléfono</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {invitacionesEjemplo.company.phone}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Fecha de solicitud</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {formatDate(invitacionesEjemplo.invitation_date)}
            </Typography>
          </Grid2>
          {/* <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Integrantes</Typography>
          </Grid2> */}
          <Grid2 size={12}>
            {/* desplegable */}
            <MemberAccordion members={invitacionesEjemplo.company.members} />
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
          disabled={isUpdateLoading}
          sx={{ mb: 2, px: 12, py: 1 }}
        >
          Aceptar
        </Button>
        <DialogMod
          open={openA}
          setOpen={setOpenA}
          title={"Aceptar"}
          content={"¿Estás seguro de realizar esta acción?"}
          onAccept={handleAccept}
        />
        {/* Rechazar solicitud */}
        <Button
          onClick={() => setOpenR(true)}
          variant="outlined"
          disabled={isUpdateLoading}
          color="transparent"
          sx={{ mb: 2, px: 11, py: 1 }}
        >
          Rechazar
        </Button>
        <DialogMod
          open={openR}
          setOpen={setOpenR}
          title={"Rechazar"}
          content={"¿Estás seguro de realizar esta acción?"}
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

export default AcceptDeclineCompany;
