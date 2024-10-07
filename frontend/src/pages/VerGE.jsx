import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import CompanyDetails from "../components/company/CompanyDetails";
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mt={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {[
          { text: "Invitar", color: "primary", path: `/company/${id}/invite` },
          {
            text: "Confirmar Conformación",
            color: "secondary",
            path: `/company/${id}/confirm`,
          },
          {
            text: "Retirar Invitaciones",
            color: "warning",
            path: `/company/${id}/uninvite`,
          },
          {
            text: "Agregar Planificación",
            color: "success",
            path: `/company/${id}/plannification`,
          },
          {
            text: "Ver Planificación",
            color: "info",
            path: `/planning/${data?.company?.planning?.id}`,
          },
          {
            text: "Evaluar Empresa",
            color: "error",
            path: `/company-evaluation/${id}`,
          },
        ].map((button, index) => (
          <Button
            key={index}
            variant="contained"
            color={button.color}
            fullWidth={true} // Asegura que ocupe todo el ancho disponible en pantallas pequeñas
            onClick={() => navigate(button.path)}
          >
            {button.text}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default VerGE;
