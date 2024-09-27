import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useGetAcademicPeriodsQuery } from "../../api/academicPeriodApi";
import AcademicPeriodCard from "./AcademicPeriodCard";

const AcademicPeriodList = () => {
  const navigate = useNavigate();
  const {
    data: periods = [],
    error,
    isFetching,
    isLoading,
  } = useGetAcademicPeriodsQuery(undefined, {
    refetchOnMountOrArgChange: true, // Recargar al montar el componente
  });

  const handleClick = () => {
    navigate("/register-ap");
  };

  useEffect(() => {
    if (periods) {
      console.log(periods);
    }
    if (error) {
      console.log(error);
    }
  }, [error, periods]);

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

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Lista de Períodos Académicos
        </Typography>
        <IconButton
          color="primary"
          aria-label="Agregar período académico"
          onClick={handleClick}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start" // Mantener alineación de izquierda a derecha
        sx={{ gap: 2 }} // Espacio entre tarjetas
      >
        {periods.map((period) => (
          <Box
            key={period.id}
            flexBasis={{
              xs: "100%", // 1 item
              sm: "48%", // 2 items
              md: "30%", // 3 items
            }}
            sx={{ minWidth: 0 }}
          >
            <AcademicPeriodCard period={period} isEnroll={false} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AcademicPeriodList;
