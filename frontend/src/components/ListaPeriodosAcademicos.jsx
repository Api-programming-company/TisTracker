import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Fab,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useGetAcademicPeriodsQuery } from "../api/academicPeriodApi";

const formatDate = (date) => format(new Date(date), "dd MMM yyyy");

const ListaPeriodosAcademicos = () => {
  const navigate = useNavigate();
  const { data: periods = [], error, isLoading } = useGetAcademicPeriodsQuery();

  const handleClick = () => {
    navigate("/registroperiodoacademico");
  };

  useEffect(() => {
    if (periods) {
      console.log(periods);
    }
    if (error) {
      console.log(error);
    }
  }, [error, periods]);

  if (isLoading)
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Períodos Académicos
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {periods.map((period) => (
          <Box
            key={period.id}
            flex="1 1 calc(33.333% - 24px)" // Adjust this to achieve the desired column width
            minWidth="250px" // Ensure cards are not too small
          >
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {period.name}
                </Typography>
                <Typography color="text.secondary">
                  Fecha de Inicio: {formatDate(period.start_date)}
                </Typography>
                <Typography color="text.secondary">
                  Fecha de Fin: {formatDate(period.end_date)}
                </Typography>
                {period.description && (
                  <Typography color="text.secondary">
                    Descripción: {period.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default ListaPeriodosAcademicos;
