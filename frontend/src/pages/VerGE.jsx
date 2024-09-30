import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Divider,Button, Stack } from "@mui/material";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import CompanyDetails from "../components/company/CompanyDetails";
import CompanyPlanning from "../components/company/CompanyPlanning";
import { useUpdateCompanyPlanningByIdMutation } from "../api/companyApi";
import { useNavigate } from "react-router-dom";

const VerGE = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (isError) return <div>Error al cargar los datos de la grupo empresa</div>;
  if (!formData.company) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 2, mb: 15 }}>
      <CompanyDetails company={formData.company} />
      <Divider sx={{ my: 4 }} />
       {/* Botones de navegación */}
       <Stack direction="row" spacing={2} mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/company/${id}/invite`)}
        >
          Invitar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/company/${id}/confirm`)}
        >
          Confirmar Conformación
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate(`/company/${id}/uninvite`)}
        >
          Retirar Invitaciones
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/company/${id}/plannification`)}
        >
          Agregar Planificación
        </Button>
      </Stack>
    </Box>

  );
};

export default VerGE;
