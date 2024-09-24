import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Divider } from "@mui/material";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import CompanyDetails from "../components/company/CompanyDetails";
import CompanyPlanning from "../components/company/CompanyPlanning";
import { useUpdateCompanyPlanningByIdMutation } from "../api/companyApi";

const VerGE = () => {
  const { id } = useParams();
  const { data, error, isSuccess, isLoading, isError, isFetching } =
    useGetCompanyByIdQuery(id);
  const [
    updateCompanyPlanning,
    {
      data: updateData,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateCompanyPlanningByIdMutation();

  const [formData, setFormData] = useState({});
  const [sendData, setSendData] = useState(false);

  useEffect(() => {
    if (isUpdateSuccess) {
      console.log(updateData);
    }
    if (isUpdateError) {
      console.log(updateError);
    }
  }, [updateData, isUpdateSuccess, isUpdateError, updateError]);

  useEffect(() => {
    if (sendData) {
      setFormData(data);
      updateCompanyPlanning({
        id: formData.planning_id,
        data: { milestones: formData.milestones },
      });
      console.log({
        id: formData.planning_id,
        data: { milestones: formData.milestones },
      });
      setSendData(false);
    }
  }, [sendData]);

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
      //
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
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 2, mb: 15 }}>
      <CompanyDetails company={formData.company} />
      <Divider sx={{ my: 4 }} />
      <CompanyPlanning
        milestones={formData.milestones}
        setFormData={setFormData}
        setSendData={setSendData}
      />
    </Box>
  );
};

export default VerGE;
