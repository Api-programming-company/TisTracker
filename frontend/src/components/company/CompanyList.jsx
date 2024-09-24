import {
  Container,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // Importar el icono para solicitudes pendientes
import React, { useContext, useEffect } from "react";
import { useGetCompaniesByAcademicPeriodQuery } from "../../api/academicPeriodApi";
import AppContext from "../../context/AppContext";
import { CompanyCard } from "../";

const CompanyList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, checkUser } = useContext(AppContext);
  const { data, error, isLoading, isError, isSuccess } =
    useGetCompaniesByAcademicPeriodQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
      if (error.status === 400 || error.status === 403) {
        checkUser();
        navigate("/");
      }
    }
  }, [isSuccess, isError, data, error]);

  const handleAddCompany = () => {
    navigate("/registroge");
  };

  const handlePendingRequests = () => {
    navigate(`/academic-period/${id}/pending`); // Navegar a solicitudes pendientes
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
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

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error?.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Lista de Empresas
        </Typography>
        <Box>
          <IconButton
            color="primary"
            aria-label="Agregar empresa"
            onClick={handleAddCompany}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              mr: 1, // Espacio entre botones
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
          <IconButton
            color="primary" // Cambiar color si lo deseas
            aria-label="Solicitudes pendientes"
            onClick={handlePendingRequests}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <PendingActionsIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start" // Mantener alineación de izquierda a derecha
        sx={{ gap: 2 }} // Espacio entre tarjetas
      >
        {data.companies.map((company) => (
          <Box
            key={company.id}
            flexBasis={{
              xs: "100%", // 1 item
              sm: "48%", // 2 items
              md: "30%", // 3 items
            }}
            sx={{ minWidth: 0 }}
          >
            <CompanyCard company={company} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CompanyList;
