import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetPedingCompaniesQuery,
  useUpdateCompanyByIdMutation,
} from "../api/companyApi";
import SolicitudesGECard from "../components/SolicitudesGECard";
import PendingCompanyCard from "../components/company/PendingCompanyCard";

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
      console.log(data);
      setCompanies(data.companies);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess, isError, error]);

  const handleAccept = async () => {
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
    }
  };

  const handleDecline = async (companyId) => {
    setLoading(true);
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
            // <SolicitudesGECard
            //   key={request.id}
            //   request={request}
            //   setSelectedCompany={setSelectedCompany}
            //   isUpdateLoading={isUpdateLoading}
            //   handleAccept={handleAccept}
            //   handleDecline={handleDecline}
            //   openA={openA}
            //   setOpenA={setOpenA}
            //   openR={openR}
            //   setOpenR={setOpenR}
            // />
            <PendingCompanyCard key={request.id} request={request} />
          ))
        )}

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
