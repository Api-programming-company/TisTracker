import React, { useEffect,useState } from "react";
import SeeMilestone from "../components/planning/SeeMilestone";
import "../styles/planning.css";
import { useParams } from "react-router-dom";
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import {
  CircularProgress,
  Container,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { sortMilestones } from "../utils/planningUtils";
import BackBtn from "../components/navigation/BackBtn";

const SeeCompanyPlanning = () => {
  const { id } = useParams();
  const [milestones, setMilestones] = useState([]);
  const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setMilestones(sortMilestones(data.planning.milestones));
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
          {error?.data?.message ||
            "Ocurrio un error al cargar la planificación"}
        </Alert>
      </Container>
    );
  }

  return (
    <Box className="section-container">
      <BackBtn url={`/company/${data.planning.company.id}`}/>
        <Container maxWidth="lg" id="companyPlanning">
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1">
                Planificación de grupo empresa
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {`${data.planning.company.long_name} [${data.planning.company.short_name}]`}
              </Typography>
            </Box>
            <Box>
              {milestones.map((milestone) => (
                <SeeMilestone key={milestone.id} milestone={milestone} />
              ))}
            </Box>
          </Box>
      </Container>
    </Box>
    
  );
};

export default SeeCompanyPlanning;
