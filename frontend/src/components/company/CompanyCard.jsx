import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vergrupoe/${company.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        cursor: "pointer", // Cambia el cursor a puntero
        transition: "background-color 0.3s, box-shadow 0.3s", // Transición suave para fondo y sombra
        "&:hover": {
          backgroundColor: "info.gray", // Cambia a un color de fondo activo al hacer hover
          boxShadow: 4, // Aumenta un poco la sombra
        },
      }}
    >
      <CardHeader
        title={company.long_name}
        sx={{ textAlign: "center" }} // Centrar el título
      />
      <CardContent>
        <Typography variant="body2" noWrap>
          Nombre corto: {company.short_name}
        </Typography>
        <Typography variant="body2" noWrap>
          Email: {company.email}
        </Typography>
        <Typography variant="body2" noWrap>
          Dirección: {company.address}
        </Typography>
        <Typography variant="body2" noWrap>
          Teléfono: {company.phone}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CompanyCard;
