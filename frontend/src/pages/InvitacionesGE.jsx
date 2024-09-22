import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useGetPendingCompaniesRequestQuery } from "../api/studentApi";

const InvitacionesGE = () => {
  const { data, error, isSuccess, isFetching, isError } =
    useGetPendingCompaniesRequestQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);

  const [invitations] = useState([
    {
      id: 1,
      nombreCorto: "API",
      nombreLargo: "Agile Programming Innovators",
      fechaInvitacion: "05/09/2024",
      docente: "Docente 1",
      gestion: "Gestión 2-2024",
      integrantes: [
        {
          id: 1,
          name: "Juan Alberto Peredo Pozo",
          codsis: "202000571",
          ingroup: "false",
        },
        {
          id: 2,
          name: "Carlos José Padilla Poma",
          codsis: "202000572",
          ingroup: "false",
        },
        {
          id: 3,
          name: "Daniela Torrico Torreón",
          codsis: "202000570",
          ingroup: "false",
        },
        {
          id: 4,
          name: "Andres Castillo Lozada",
          codsis: "202100580",
          ingroup: "false",
        },
        {
          id: 5,
          name: "Antonio Gomez Amaranto",
          codsis: "202200740",
          ingroup: "false",
        },
        {
          id: 6,
          name: "Camila Torrez Gutierrez",
          codsis: "202100712",
          ingroup: "false",
        },
      ],
    },
    {
      id: 2,
      nombreCorto: "Cascade Inc.",
      nombreLargo: "Cascade Incorporation",
      fechaInvitacion: "01/09/2024",
      docente: "Docente 1",
      gestion: "Gestión 2-2024",
      integrantes: [
        {
          id: 2,
          name: "Carlos José Padilla Poma",
          codsis: "202000572",
          ingroup: "false",
        },
        {
          id: 4,
          name: "Andres Castillo Lozada",
          codsis: "202100580",
          ingroup: "false",
        },
        {
          id: 6,
          name: "Camila Torrez Gutierrez",
          codsis: "202100712",
          ingroup: "false",
        },
      ],
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

  if (isFetching) {
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
          Invitaciones de Grupo-Empresas
        </Typography>

        {data.companies.map((invitation) => (
          <Box
            key={invitation.company.id}
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
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Has recibido una invitación para formar parte de:
                </Typography>
                <Typography
                  component="h1"
                  sx={{ color: "black", fontSize: "36px", lineHeight: "1" }}
                >
                  {invitation.company.short_name}
                </Typography>
                <Typography component="h2" sx={{ color: "black" }}>
                  {invitation.company.long_name}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Fecha: {invitation.invitation_date}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Docente: {"?"}
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "#8E9090", fontSize: "14px" }}
                >
                  Gestión: {"?"}
                </Typography>
              </Box>

              {/* Botones de Aceptar y Rechazar */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mb: 3,
                  ml: 3,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleAccept(invitation.company.id)}
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
                  onClick={() => handleDecline(invitation.company.id)}
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

export default InvitacionesGE;
