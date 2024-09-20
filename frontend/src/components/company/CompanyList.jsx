import {
  Container,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect } from "react";
import { useGetCompaniesByAcademicPeriodQuery } from "../../api/academicPeriodApi";
import AppContext from "../../context/AppContext";
import { CompanyCard } from "../";

const CompanyList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const { data, error, isLoading } = useGetCompaniesByAcademicPeriodQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleAddCompany = () => {
    navigate("/registroge"); // Redirige a la página de registro
  };

  if (!user.academic_period_id) {
    window.location.href = "/enroll-to-ap"; // Redirige a la página de inscripción
    return null;
  }

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6">Cargando empresas...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error.data?.message}
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
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {data.companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyList;
