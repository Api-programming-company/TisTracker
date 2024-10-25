import React, { useContext } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const InvitationsHome = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleInvitations = () => {
    navigate("/company-requests");
  };

  const menuItems = [
    {
      label: "Invitar estudiantes a Grupo Empresa",
      path: `/company/${user.company.company_id}/invite`,
    },
    {
      label: "Confirmar la Conformación de mi Grupo Empresa",
      path: `/company/${user.company.company_id}/confirm`,
    },
    {
      label: "Retirar Invitaciones a estudiantes invitados",
      path: `/company/${user.company.company_id}/uninvite`,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Invitaciones
        </Typography>
        {user?.user_type === "E" && (
          <IconButton
            color="primary"
            aria-label="Ver Invitaciones"
            title="Ver Invitaciones"
            onClick={handleInvitations}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              mr: 1,
            }}
          >
            <PendingActionsIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ width: "100%", mt: 1, mb: 4 }} />{" "}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
      >
        {menuItems.map((item, index) => (
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
    </Container>
  );
};

export default InvitationsHome;
