import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetPedingCompaniesQuery,
  useUpdateCompanyByIdMutation,
} from "../api/companyApi";
import DialogMod from "../components/DialogMod";

const SolicitudesGE = () => {
  const { id } = useParams();
  const { data, error, isError, isSuccess, isLoading, isFetching } =
    useGetPedingCompaniesQuery(id);
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

  const [companies, setCompanies] = useState([]);
  const [openA, setOpenA] = useState(false);
  const [openR, setOpenR] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (isSuccess) {
      setCompanies(data.companies);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess, isError, error]);

  const handleAccept = async () => {
    setOpen(false);
    if (!selectedCompany) return;
    setLoading(true);
    setOpenA(false);
    try {
      await updateCompany({
        id: selectedCompany,
        data: { status: "A" },
      }).unwrap();
      setSnackbar({
        open: true,
        message: "Solicitud aceptada",
        severity: "success",
      });
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== selectedCompany)
      );
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      setSnackbar({
        open: true,
        message: "Ocurrió un error al aceptar la solicitud.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      // handleClose();
    }
  };

  const handleDecline = async (companyId) => {
      setLoading(true);
      setOpenR(false);
    setOpenR(false);
    try {
      await updateCompany({ id: companyId, data: { status: "R" } }).unwrap();
      setSnackbar({
        open: true,
        message: "Solicitud rechazada",
        severity: "success",
      });
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      setSnackbar({
        open: true,
        message: "Ocurrió un error al rechazar la solicitud.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading || isFetching) {
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
          Solicitudes de creación de Grupo Empresas
        </Typography>

        {companies.length === 0 ? (
          <Typography
            variant="h6"
            component="p"
            sx={{ textAlign: "center", mt: 5 }}
          >
            No hay solicitudes pendientes
          </Typography>
        ) : (
          companies.map((request) => (
            <Box
              key={request.id}
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
                <Box sx={{ flex: 1, mr: 2, mb: 3 }}>
                  <Typography
                    component="h1"
                    sx={{ color: "black", fontSize: "36px", lineHeight: "1" }}
                  >
                    {request.short_name}
                  </Typography>
                  <Typography component="h2" sx={{ color: "black" }}>
                    {request.long_name}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ color: "#8E9090", fontSize: "14px" }}
                  >
                    <Icon>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                        alt="Icono persona"
                        style={{
                          width: "17px",
                          height: "17px",
                        }}
                      />
                    </Icon>{" "}
                    {request.members_count} integrantes
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ color: "#8E9090", fontSize: "14px" }}
                  >
                    Desean formar parte del grupo de TIS
                  </Typography>
                </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  mb: 3,
                }}
              >
                <Button
                  onClick={() => {
                    setSelectedCompany(request.id);
                    setOpenA(true);
                  }} //() => handleClickOpen(request.id)
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    px: 12,
                    py: 1,
                    position: "relative",
                  }}
                >
                  ACEPTAR
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Button>
                <DialogMod
                  open={openA}
                  setOpen={setOpenA}
                  title={"Confirmar"}
                  content={"¿Está seguro de que desea aceptar esta solicitud?"}
                  onAccept={handleAccept}
                  paramsAccept={request.id}
                />

                <Button
                  onClick={() => setOpenR(true)} 
                  variant="contained"
                  color="transparent"
                  sx={{
                    px: 12,
                    py: 1,
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  RECHAZAR
                </Button>
                <DialogMod
                  open={openR}
                  setOpen={setOpenR}
                  title={"Rechazar"}
                  content={"¿Está seguro de que desea rechazar esta solicitud?"}
                  onAccept={handleDecline}
                  paramsAccept={request.id}
                />
              </Box>
            </Box>
          </Box>
        ))}
      

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </Container>
  );
};

export default SolicitudesGE;
