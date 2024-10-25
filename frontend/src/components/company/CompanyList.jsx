import {
  Container,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // Importar el icono para solicitudes pendientes
import AssignmentIcon from "@mui/icons-material/Assignment";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
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

  const handleEvaluations = () => {
    navigate("/evaluations-home");
  };

  const handlePendingRequests = () => {
    navigate(`/academic-period/${id}/pending`); // Navegar a solicitudes pendientes
  };

  const handleWeekly = () => {
    navigate(`/academic-period/${id}/weekly_companies`);
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
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Lista de Grupo Empresass
        </Typography>
        <Box>
          {user?.user_type === "E" && (
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
                mr: 1,
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          )}

          {user?.user_type === "D" && (
            <Box>
              <IconButton
                color="primary"
                aria-label="Solicitudes pendientes"
                title="Solicitudes pendientes"
                onClick={handlePendingRequests}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  mr: 1,
                }}
              >
                <PendingActionsIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Evaluaciones"
                title="Evaluaciones"
                onClick={handleEvaluations}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  mr: 1,
                }}
              >
                <AssignmentIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Revisión Semanal"
                title="Revisión Semanal"
                onClick={handleWeekly}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <AppRegistrationIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <Divider sx={{ width: "100%", mt: 1, mb: 4 }} />{" "}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start" // Mantener alineación de izquierda a derecha
        sx={{ gap: 2, mb: 12 }} // Espacio entre tarjetas
      >
        {data?.companies?.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No hay empresas registradas en este período académico.
          </Typography>
        ) : (
          data?.companies?.map((company) => (
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
          ))
        )}
      </Box>
    </Container>
  );
};

export default CompanyList;
