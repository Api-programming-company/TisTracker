import React, { useState } from "react";
import { Button, Container, Typography, Box, Icon } from "@mui/material";

const SolicitudesGE = () => {
  const [requests] = useState([
    {
      id: 1,
      nombreCorto: "API",
      nombreLargo: "Agile Programming Innovators",
      fechaInvitacion: "05/09/2024",
      docente: "Docente 1",
      gestion: "Gestión 2 - 2024",
      integrantes: 6,
    },
    {
      id: 2,
      nombreCorto: "Cascade Inc.",
      nombreLargo: "Cascade Incorporation",
      fechaInvitacion: "01/09/2024",
      docente: "Docente 1",
      gestion: "Gestión 2 - 2024",
      integrantes: 3,
    },
    {
      id: 3,
      nombreCorto: "Evil Inc.",
      nombreLargo: "Doofenshmirtz Evil Incorporated ",
      fechaInvitacion: "01/09/2024",
      docente: "Docente 1",
      gestion: "Gestión 2 - 2024",
      integrantes: 7,
    },
    {
      id: 4,
      nombreCorto: "Absolute",
      nombreLargo: "Absolute Incorporation",
      fechaInvitacion: "01/09/2024",
      docente: "Docente 1",
      gestion: "Gestión 2 - 2024",
      integrantes: 5,
    },
  ]);

  //Función para el botón ACEPTAR
  const handleAccept = (nombreCorto) => {
    alert(`Invitación de ${nombreCorto} aceptada`);
    console.log(`Invitación de ${nombreCorto} aceptada`);
  };

  //Función para el botón RECHAZAR
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

        {requests.map((request) => (
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
              {/* Bloque de texto a la izquierda */}
              <Box sx={{ flex: 1, mr: 2, mb: 3 }}>
                <Typography
                  component="h1"
                  sx={{ color: "black", fontSize: "36px", lineHeight: "1" }}
                >
                  {request.nombreCorto}
                </Typography>
                <Typography component="h2" sx={{ color: "black" }}>
                  {request.nombreLargo}
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
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Gestión: {request.gestion}
                </Typography>
              </Box>

              {/* Botones de Aceptar y Rechazar */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  mb: 3,
                }}
              >
                <Button
                  onClick={() => handleAccept(request.nombreCorto)}
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    px: 12,
                    py: 1,
                    borderRadius: "30px",
                  }}
                >
                  ACEPTAR
                </Button>

                <Button
                  onClick={() => handleDecline(request.nombreCorto)}
                  variant="contained"
                  color="#000000"
                  sx={{
                    px: 12,
                    py: 1,
                    borderRadius: "30px",
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
