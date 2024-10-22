import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard2 = ({company}) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/vergrupoe/${company.id}`);
    };

    useEffect(() => {
        console.log(company,company.planning !== null);
        
    },[company])
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
        <Typography
          variant="body2"
          noWrap
          sx={{
            color: "primary.main",
            mt: 1,
            mb: 0,
            ml: 2,
            mr: 2,
          }}
        >
          {company.planning !== null && ( company.planning.milestones[0] &&
            new Date(company.planning.milestones[0].end_date).getTime() - new Date().getTime() <= 6 * 24 * 60 * 60 * 1000 ?
              "Entregable" :
              "Revisión")
          }
        </Typography>

        <CardHeader
          title={<Typography variant="h6">{company.long_name}</Typography>}
          sx={{
            mt: 0,
            pt: 0,
            pb: 1,
          }}
        />
        <CardContent
          sx={{
            pt: 0,
          }}
        >
          <Typography variant="body2" noWrap>
            <b>Nombre corto:</b> {company.short_name}
          </Typography>
          <Typography variant="body2" noWrap>
            <b>Número de integrantes:</b> {6} integrantes
          </Typography>
          <Typography variant="body2" noWrap>
            <b>Dia de entregable:</b> {company.planning && company.planning.milestones && company.planning.milestones[0] && new Date(company.planning.milestones[0].end_date).toLocaleDateString("es-AR", { year: "numeric", month: "2-digit", day: "2-digit" })}
          </Typography>
        </CardContent>
      </Card>
    );
  };


export default CompanyCard2
