import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard2 = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/planning_spreadsheet/${company.planning.id}`);
  };
  const [currentMilestone,setCurrentMilestone] = useState(-1);
  const [currentMiltestoneDate,setCurrentMilestoneDate] = useState("");

  useEffect(() => {
    if (company.planning) {
      const currentIndex = company.planning.milestones.findIndex((milestone) => milestone.status === "P")
      setCurrentMilestone(currentIndex);
      setCurrentMilestoneDate(new Date(company.planning.milestones[currentIndex].end_date));
    }
  },[company.planning])



  return (
    <Card
      onClick={handleClick}
      sx={{
        paddingX:"1rem",
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
          color: currentMiltestoneDate === "" ? "primary.main":currentMiltestoneDate.getTime() < new Date().getTime() ? "error.main" :"primary.main",
          mt: 1,
          mb: 0,
          ml: 2,
          mr: 2,
        }}
      >
        {company.planning && company.planning.milestones &&
          (currentMilestone === -1 ?  "Sin entregable":

          currentMiltestoneDate.getTime() < new Date().getTime() ?
            "Entregable (retrasado)" :
            new Date().getTime() + 6 * 24 * 60 * 60 * 1000 < currentMiltestoneDate.getTime()  
            ?  "Entregable"
            : "Revisión")}
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
          <b>Número de integrantes:</b> {company.members && company.members.length} integrantes
        </Typography>
        <Typography variant="body2" noWrap>
          <b>Dia de entregable:</b>{" "}
          {company.planning &&
            company.planning.milestones && currentMilestone !== -1 ?
              new Date(
                Date.parse(
                  company.planning.milestones[currentMilestone].end_date
                )
              ).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              : "Sin entregable"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard2;
