import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box, Icon } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPedingCompaniesQuery } from "../api/companyApi";

const SolicitudesGE = () => {
  const { id } = useParams();
  const { data, error, isError, isSuccess, isLoading } =
    useGetPedingCompaniesQuery(id);
  
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
    if (isLoading) {
      console.log("cargando");
    }
  }, [data, isError, isLoading, data, error]);

  const handleAccept = (nombreCorto) => {
    alert(`Invitación de ${nombreCorto} aceptada`);
    console.log(`Invitación de ${nombreCorto} aceptada`);
  };

  const handleDecline = (nombreCorto) => {
    alert(`Invitación de ${nombreCorto} rechazada`);
    console.log(`Invitación de ${nombreCorto} rechazada`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Solicitudes de creación de Grupo-Empresas
        </Typography>

        {data.companies.map((request) => (
          <Box
            key={request.id}
            sx={{
              backgroundColor: "whitesmoke",
              borderRadius: "15px",
              padding: 2,
              mb: 5,
            }}
          >
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                mb: 1,
                mt: 3,
                mr: 3,
                ml: 3,
              }}
            >
              {/* Detalles de la Grupo-Empresa, lado izquierdo */}
              <Box sx={{ flex: 1, mr: 2, mb: 3 }}>
                <Typography
                  component="h1"
                  sx={{ color: "black", fontSize: "36px", lineHeight: "1" }}
                >
                  {request.short_name}
                </Typography>
                <Typography component="h2" sx={{ color: "black" }}>
                  {request.long_name}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  <Icon>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                      alt="Icono persona"
                      style={{
                        width: "17px",
                        height: "17px",
                      }}
                    />
                  </Icon>{" "}
                  {request.integrantes} integrantes
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Desean formar parte del grupo de TIS
                </Typography>
              </Box>

              {/* Botones de Aceptar y Rechazar, lado derecho */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  mb: 3,
                }}
              >
                <Button
                  onClick={() => handleAccept(request.id)}
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    px: 12,
                    py: 1,
                  }}
                >
                  ACEPTAR
                </Button>

                <Button
                  onClick={() => handleDecline(request.id)}
                  variant="contained"
                  color="transparent"
                  sx={{
                    px: 12,
                    py: 1,
                    color: "black",
                  }}
                >
                  RECHAZAR
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default SolicitudesGE;
