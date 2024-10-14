import React, { useEffect } from "react";
import SeeMilestone from "../components/planning/SeeMilestone";
import "../styles/planning.css";
import { useParams } from "react-router-dom";
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import { CircularProgress, Container, Alert } from "@mui/material";
import { data } from "../mock_objects/planificacion";

const SeeCompanyPlanning = () => {
  const { id } = useParams();
  const {isSuccess, isFetching, isError, error } =
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

  // if (isError) {
  //   return (
  //     <Container
  //       maxWidth="sm"
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "80vh",
  //       }}
  //     >
  //       <Alert severity="error">
  //         Ocurrió un error al cargar la planificación:{" "}
  //         {error?.data?.message || "Error desconocido"}
  //       </Alert>
  //     </Container>
  //   );
  // }

  return (
    <div className="container" id="conpanyPlanning">
      <div className="section-header">
        <h1>Planificación de grupo empresa</h1>
        <h4 className="text-neutral-500">Agile programming Innovators</h4>
      </div>
      <div className="planning-body">
        <div className="milestones">
          {data?.planning?.milestones.map((milestone) => (
            <SeeMilestone key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeCompanyPlanning;
