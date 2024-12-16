import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMilestonePlanningStatus, getToday } from "../../utils/dateFormat";
import { formatDate } from "../../utils/dateFormat";

const CompanyCard2 = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/planning_spreadsheet/${company.planning.id}`);
  };
  const [currentMilestone,setCurrentMilestone] = useState(-1);
  const [currentMiltestoneDate,setCurrentMilestoneDate] = useState("");
  const [milestoneStatus, setMilestoneStatus] = useState("pending");

  useEffect(() => {
    if (company.planning) {
      const milestones = company.planning.milestones;
      const sortedMilestones = [...milestones].sort((a, b) => {
        const dateA = new Date(a.end_date).getTime();
        const dateB = new Date(b.end_date).getTime();
        return dateA - dateB;
      })
      const currentIndex = sortedMilestones.findIndex((milestone) => milestone.status === "P")

      setCurrentMilestone(currentIndex);
      console.log(company.long_name,new Date(sortedMilestones[currentIndex].end_date).getTime(), getToday().getTime())
      setCurrentMilestoneDate(new Date(sortedMilestones[currentIndex].end_date));
    }
  },[company.planning])


  useEffect(() => {
    if(currentMiltestoneDate){
      setMilestoneStatus(getMilestonePlanningStatus(currentMiltestoneDate));
    }
  },[currentMiltestoneDate])
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
          color: milestoneStatus === "late" ? "red" : "primary.main",
          mt: 1,
          mb: 0,
          ml: 2,
          mr: 2,
        }}
      >
        {company.planning && company.planning.milestones &&
          (currentMilestone === -1 ?  "Sin entregable":

          milestoneStatus === "late"?
            "Entregable (retrasado)" :
            milestoneStatus === "current" 
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
            company.planning.milestones && currentMiltestoneDate ?
              formatDate(currentMiltestoneDate)
              : "Sin entregable"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard2;
