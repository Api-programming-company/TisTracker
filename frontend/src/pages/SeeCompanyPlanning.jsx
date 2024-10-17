import React, { useEffect } from "react";
import SeeMilestone from "../components/planning/SeeMilestone";
import "../styles/planning.css";
import { useParams } from "react-router-dom";
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import { CircularProgress, Container, Alert, Typography, Box } from "@mui/material";

const SeeCompanyPlanning = () => {
  const { id } = useParams();
  const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);
  
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);

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

  if (isError) {
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
        <Alert severity="error">
          {error?.data?.message || "Ocurrio un error al cargar la planificación"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" id="companyPlanning">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Planificación de grupo empresa
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {`${data.planning.company.long_name} [${data.planning.company.short_name}]`}
        </Typography>
      </Box>
      <Box>
        {data?.planning?.milestones.map((milestone) => (
          <SeeMilestone key={milestone.id} milestone={milestone} />
        ))}
      </Box>
    </Container>
  );
};

export default SeeCompanyPlanning;
