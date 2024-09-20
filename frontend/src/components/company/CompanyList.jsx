import {
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useGetCompaniesByAcademicPeriodQuery } from "../../api/academicPeriodApi";
import AppContext from "../../context/AppContext";

const CompanyList = () => {
  const { user } = useContext(AppContext);
  const {
    data,
    error,
    isLoading,
  } = useGetCompaniesByAcademicPeriodQuery(user?.academic_period_id);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  // Si el usuario es nulo o el período académico no está definido
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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Empresas
      </Typography>
      <List>
      {data.companies.map((company) => (
          <ListItem key={company.id}>
            <ListItemText
              primary={company.long_name}
              secondary={`nombre corto: ${company.short_name}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CompanyList;
