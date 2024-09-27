import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetPedingCompaniesQuery,
} from "../api/companyApi";
import PendingCompanyCard from "../components/company/PendingCompanyCard";

const SolicitudesGE = () => {
  const { id } = useParams();
  const { data, error, isError, isSuccess, isLoading, isFetching } =
    useGetPedingCompaniesQuery(id);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setCompanies(data.companies);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess, isError, error]);

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
            <PendingCompanyCard key={request.id} request={request} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default SolicitudesGE;
