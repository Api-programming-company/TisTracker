import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useGetAcademicPeriodsQuery } from "../../api/academicPeriodApi";
import AcademicPeriodCard from "../AcademicPeriodCard";

const formatDate = (date) => format(new Date(date), "dd MMM yyyy");

const AcademicPeriodList = () => {
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
  
    if (isLoading) {
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
      <Container maxWidth="lg" sx={{ mt: 5 }}>
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
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          {periods.map((period) => (
            <Box
              key={period.id}
              flexBasis={{
                xs: "100%", // 100% width for extra small screens
                sm: "48%",  // Two items per row for small screens
                md: "30%",  // Three items per row for medium screens
              }}
              mb={2}
            >
              <AcademicPeriodCard period={period} isEnroll={false} />
            </Box>
          ))}
        </Box>
      </Container>
    );
  };
  
  export default AcademicPeriodList;