import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMilestone } from '../reducers/planningSlice'
import { setMilestones } from '../reducers/planningSlice'
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Alert } from "@mui/material";
import SeeMilestone from '../components/planning/SeeMilestone';
import PlanningItem from '../components/planning/PlanningItem';




const PlanningSpreadSheet = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const milestone = useSelector(selectCurrentMilestone);

    const {data,isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);



    useEffect(() => {
      if (isSuccess) {
        dispatch(setMilestones(data.planning.milestones));
      }
      if (isError) {
        console.log(error);
      }
    }, [isSuccess, isError, error, data, dispatch]);

    useEffect(() => {
      console.log(milestone,"current Milestone");
    },[milestone])
  
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
            Ocurrió un error al cargar la planificación:{" "}
            {error?.data?.message || "Error desconocido"}
          </Alert>
        </Container>
      );
    }


  return (
    <div id='planning_spreadsheet' className='container'>
      <div className="section-header">
        <h1>Planilla de Seguimiento Semanal</h1>
      </div>
      <div className="section-body">
      
      </div>
    </div>
  )
}

export default PlanningSpreadSheet
