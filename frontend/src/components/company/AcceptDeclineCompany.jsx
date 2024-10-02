import {
  Box,
  Button,
  Container,
  Grid2,
  Snackbar,
  Typography,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MemberAccordion from "./MemberAccordion";
import { useNavigate, useParams } from "react-router-dom";
import DialogMod from "../DialogMod";
import {
  useUpdateCompanyByIdMutation,
  useGetCompanyByIdQuery,
} from "../../api/companyApi";
import { formatDate } from "../../utils/validaciones";

const AcceptDeclineCompany = () => {
  const { id } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    data: companyData,
    error: companyError,
    isSuccess: isCompanySuccess,
    isError: isCompanyError,
    isFetching: isCompanyFetching,
  } = useGetCompanyByIdQuery(id);

  useEffect(() => {
    if (isCompanySuccess) {
      console.log("Company data:", companyData);
    }

    if (isCompanyError) {
      console.error("Error fetching company:", companyError);
    }
  }, [isCompanySuccess, isCompanyError, companyData, companyError]);

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

  useEffect(() => {
    if (isUpdateSuccess) {
      console.log("Company data:", updateData);
      setSnackbar({
        open: true,
        message: "Solicitud actualizada exitosamente",
        severity: "success",
      });
      setOpenConfirm(true);
    }

    if (isUpdateError) {
      setSnackbar({
        open: true,
        message:
          updateError?.data?.message ||
          "Ocurrió un error al actualizar la solicitud.",
        severity: "error",
      });
      console.error("Error al actualizar la solicitud:", updateError);
    }
  }, [isUpdateSuccess, isUpdateError, updateError, updateData]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openA, setOpenA] = useState(false);
  const [openR, setOpenR] = useState(false);
  const navigate = useNavigate();

  const handleAccept = async () => {
    setOpenA(false);
    updateCompany({
      id: companyData.company.id,
      data: { status: "A" },
    });
  };

  const handleDecline = async () => {
    setOpenR(false);
    updateCompany({
      id: companyData.company.id,
      data: { status: "R" },
    });
  };

  const handleConfirmAccept = () => {
    setOpenConfirm(false);
    navigate(
      `/academic-period/${companyData.company.academic_period_id}/pending`
    );
  };

  if (isUpdateLoading || isCompanyFetching) {
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

  if (isCompanyError || !companyData?.company) {
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
        <Typography variant="h6" color="error">
          No se encontró la empresa solicitada.
        </Typography>
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
              {companyData.company.long_name}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Nombre corto</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {companyData.company.short_name}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Correo electrónico</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{companyData.company.email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Dirección</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {companyData.company.address}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Teléfono</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">{companyData.company.phone}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h6">Fecha de solicitud</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1">
              {formatDate(companyData.company.updated_at)}
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <MemberAccordion members={companyData.company.members} />
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
          content={"¿Estas seguro que deseas aceptar esta invitación?"}
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
          content={"¿Estas seguro que deseas rechazar esta invitación?"}
          onAccept={handleDecline}
        />
        {/* Modal de confirmación */}
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>{"Actualización exitosa"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              La solicitud fue aceptada exitosamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmAccept} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
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
