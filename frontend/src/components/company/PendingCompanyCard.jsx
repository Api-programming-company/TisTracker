import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/validaciones";

const PendingCompanyCard = ({ request, showButton = true }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        transition: "background-color 0.3s, box-shadow 0.3s", // Transición suave para fondo y sombra
        "&:hover": {
          backgroundColor: "info.gray", // Cambia a un color de fondo activo al hacer hover
          boxShadow: 4, // Aumenta un poco la sombra
        },
      }}
    >
      <CardHeader
        title={request.long_name}
        subheader={request.short_name}
      />
      <CardContent>
        <Typography
          component="p"
          sx={{ color: "info.details", fontSize: "14px" }}
        >
          <PersonIcon />
          Cuenta con {request.members_count} integrantes.
        </Typography>
        <Typography
          component="p"
          sx={{ color: "info.details", fontSize: "14px" }}
        >
          <CalendarMonthIcon />
          La solicitud se realizó el {formatDate(request.created_at)}.
        </Typography>
      </CardContent>
      {showButton && (
        <CardActions>
          <Button
            onClick={() =>
              navigate(`/request/${request.id}/pending`, { state: { request } })
            }
            variant="contained"
            color="primary"
            sx={{
              mb: 1,
              py: 1,
              position: "relative",
              width: "100%",
            }}
          >
            Ver solicitud
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default PendingCompanyCard;
