import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPedingCompaniesQuery } from "../api/companyApi";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import PendingCompanyCard from "../components/company/PendingCompanyCard";

const SeeSolicitudesGE = () => {
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
      <Box sx={{ mt: 12, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Ver solicitudes de creación de Grupo Empresas
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          sx={{ gap: 2, mb: 12 }}
        >
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
                flexBasis={{
                  xs: "100%", // 1 item
                  sm: "48%", // 2 items
                  md: "30%", // 3 items
                }}
                sx={{ minWidth: 0 }}
              >
                <PendingCompanyCard
                  key={request.id}
                  request={request}
                  showButton={false}
                />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SeeSolicitudesGE;
