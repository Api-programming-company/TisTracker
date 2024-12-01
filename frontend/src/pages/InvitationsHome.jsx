import React, { useContext } from "react";
import { Typography, Paper, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const InvitationsHome = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      label: "Invitar estudiantes a Grupo Empresa",
      path: `/company/${user.company?.company_id}/invite`,
    },
    {
      label: "Enviar Solicitud de Creación de Grupo Empresa",
      path: `/company/${user.company?.company_id}/confirm`,
    },
    {
      label: "Retirar Invitaciones a estudiantes invitados",
      path: `/company/${user.company?.company_id}/uninvite`,
    },
  ];
  const menuItems2 = [
    {
      label: "Ver invitaciones de Grupo Empresas",
      path: `/see-company-requests`,
    },
    {
      label: "Aceptar/Rechazar invitaciones",
      path: `/company-requests`,
    },
  ];

  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="h4" gutterBottom>
        Invitaciones
      </Typography>
      <Divider sx={{ width: "100%", mt: 1, mb: 4 }} />{" "}
      <Box
        display="flex"
        // justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
        mb={3}
      >
        {user?.user_type === "E" &&
          user?.company?.permission === "W" && // solo los que tienen privilegios
          menuItems.map((item, index) => (
            <Box key={index} flexBasis={{ xs: "100%", md: "30%" }}>
              <Paper
                elevation={3}
                style={{
                  cursor: "pointer",
                  paddingTop: "32px",
                  paddingBottom: "32px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  textAlign: "center",
                }}
                onClick={() => handleNavigate(item.path)}
              >
                <Typography variant="h5">{item.label}</Typography>
              </Paper>
            </Box>
          ))}
          {user?.user_type === "E" &&
          menuItems2.map((item, index) => (
            <Box key={index} flexBasis={{ xs: "100%", md: "30%" }}>
              <Paper
                elevation={3}
                style={{
                  cursor: "pointer",
                  paddingTop: "32px",
                  paddingBottom: "32px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  textAlign: "center",
                }}
                onClick={() => handleNavigate(item.path)}
              >
                <Typography variant="h5">{item.label}</Typography>
              </Paper>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default InvitationsHome;
