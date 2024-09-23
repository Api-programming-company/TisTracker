import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Divider } from "@mui/material";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import CompanyDetails from "../components/company/CompanyDetails";
import CompanyPlanning from "../components/company/CompanyPlanning";

const VerGE = () => {
  const { id } = useParams();
  const { data, error, isSuccess, isLoading, isError, isFetching } =
    useGetCompanyByIdQuery(id);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      setFormData(data);
    }
    if (isError) {
      console.error("Error fetching company data:", error);
    }
  }, [data, isSuccess, isError, error]);
  useEffect(() => {
    if (formData) {
      console.log(formData);
    }
  }, [formData]);

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

  if (isError) return <div>Error al cargar los datos de la empresa</div>;
  if (!formData.company) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 2 }}>
      <CompanyDetails company={formData.company} />
      <Divider sx={{ my: 4 }} />
      <CompanyPlanning
        milestones={formData.milestones}
        setFormData={setFormData}
      />
    </Box>
  );
};

export default VerGE;
