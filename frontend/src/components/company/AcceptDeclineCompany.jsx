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
import { formatDate, formatDateTime } from "../../utils/validaciones";
import BackBtn from "../navigation/BackBtn";

const AcceptDeclineCompany = () => {
  const { id } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
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
      if (updateData?.company?.status === "A") {
        setConfirmMessage("Solicitud ha sido aceptada exitosamente");
        setSnackbar({
          open: true,
          message: "Solicitud ha sido aceptada exitosamente",
          severity: "success",
        });
      }
      if (updateData?.company?.status === "R") {
        setConfirmMessage("Solicitud ha sido rechazada exitosamente");
        setSnackbar({
          open: true,
          message: "Solicitud ha sido rechazada exitosamente",
          severity: "success",
        });
      }
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
    <Box className="section-container">
      <BackBtn/>
      <Container maxWidth="md">
        <Box sx={{ mb: 5 }}>
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
            backgroundColor: "info.gray",
            borderRadius: "15px",
            padding: 3,
            mb: 5,
          }}
        >
          {[
            { label: "Nombre largo", value: companyData.company.long_name },
            { label: "Nombre corto", value: companyData.company.short_name },
            { label: "Correo electrónico", value: companyData.company.email },
            { label: "Dirección", value: companyData.company.address },
            { label: "Celular", value: companyData.company.phone },
            {
              label: "Fecha de solicitud",
              value: new Intl.DateTimeFormat("es-AR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(companyData.company.updated_at)),
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography variant="h6" sx={{ flex: 1 }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>
                {item.value}
              </Typography>
            </Box>
          ))}

          {/* Miembros */}
          <Box sx={{ mt: 2 }}>
            <MemberAccordion
              members={companyData.company.members.filter(
                (member) => member.status === "A"
              )}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            mb: 5,
          }}
        >
          {/* Botón Aceptar */}
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
            content={"¿Estás seguro que deseas aceptar esta solicitud?"}
            onAccept={handleAccept}
          />

          {/* Botón Rechazar */}
          <Button
            onClick={() => setOpenR(true)}
            variant="outlined"
            disabled={isUpdateLoading}
            // color="secondary"
            sx={{ mb: 2, px: 11, py: 1 }}
          >
            Rechazar
          </Button>
          <DialogMod
            open={openR}
            setOpen={setOpenR}
            title={"Rechazar"}
            content={"¿Estás seguro que deseas rechazar esta solicitud?"}
            onAccept={handleDecline}
          />

          {/* Modal de confirmación */}
          <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>{"Actualización exitosa"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* Su acción fue registrada exitosamente. */}
                {confirmMessage}
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
    </Box>
    
  );
};

export default AcceptDeclineCompany;
