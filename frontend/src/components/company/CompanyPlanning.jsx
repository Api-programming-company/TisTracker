import React, { useEffect, useState,useContext } from "react";
import { Box, Typography, Button, Snackbar, Alert, Container,CircularProgress } from "@mui/material";
import Milestone from "./Milestone";
import DialogMod from "../DialogMod";
import { useParams, useNavigate } from "react-router-dom";
import { useRegisterPlanningMutation } from "../../api/planningApi";
import { usePlanningContext } from "../../context/PlanningContext";
import "../../styles/planning_record.css";
import BackBtn from "../navigation/BackBtn";
import { sortMilestones } from "../../utils/planningUtils";
import { useGetPlanningByRealCompanyIdQuery } from "../../api/planningApi";
import { useUpdateCompanyPlanningByIdMutation } from "../../api/companyApi";
import AppContext from "../../context/AppContext";
import { formatDate } from "../../utils/dateFormat";
import { now } from "moment";

const CompanyPlanning = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [planningId,setPlanningId] = useState(0);
  const { user } = useContext(AppContext);


  const {
    milestones,
    setMilestones,
    addMilestone,
    checkErrors,
  } = usePlanningContext();
  const navigate = useNavigate();

  const { data, isSuccess, isFetching, isError, error,refetch } =
    useGetPlanningByRealCompanyIdQuery(id);

  const [
    update,
    {
      data: updateData,
      isLoading: updateLoading,
      isSuccess: updatedSuccessfully,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateCompanyPlanningByIdMutation();

  const [registerPlanning, { data: registerPlanningData, 
    isSuccess: registerPlanningSuccess,
     error: registerPlanningError, 
     isError: registerPlanningIsError, 
     isLoading }] =
    useRegisterPlanningMutation();

  const handleConfirm = () => {
    const form = { name: "planning", company_id: id, milestones: milestones };
    if(!milestones.length){
      setSnackbarMessage("Debes tener al menos un hito para confirmar la planificación");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setOpen(false)
      return;
    }
    if (!checkErrors(user?.academic_period?.evaluation_start_date)) {
      const sumBillingPercentage = milestones.reduce(
        (acc, curr) => acc + parseFloat(curr.billing_percentage),
        0
      );
      if (sumBillingPercentage > 100) {
        setSnackbarMessage(
          "La suma del porcentaje de facturación debe ser menor a 100"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if(!planningId){
        registerPlanning(form);
      }else{
        const newMilestones = milestones.map((milestone) => {
          
          return {
            ...milestone,
            id: milestone.isNew ? null : milestone.id,
            end_date: milestone.end_date.toISOString().split("T")[0],
            start_date: milestone.start_date.toISOString().split("T")[0],
            deliverables: milestone.deliverables.map((deliverable) => {
              return {
                ...deliverable,
                id: deliverable.isNew ? null : deliverable.id,
              };
            })
          };
        })
        update({
          id: planningId,
          data: {
            milestones: newMilestones,
            company_id: id,
          },
        });
      }
      
    } else {
      setSnackbarMessage("Al parecer tienes errores en los datos");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (registerPlanningSuccess) {
      refetch();
      setSnackbarMessage("Planificación registrada con éxito");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    }
    if (registerPlanningIsError) {
      setSnackbarMessage(registerPlanningError.data?.message);
      console.log(registerPlanningError);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [registerPlanningSuccess, registerPlanningError, navigate, registerPlanningIsError, refetch]);

 

  useEffect(() => {
    if (isSuccess) {
      console.log(data,"Data");
      if(data?.milestones){
        const sortedMilestones = sortMilestones(data.milestones).map((milestone) => {
          return {
            ...milestone,
            end_date: new Date( new Date(milestone.end_date).getTime()+ 4*60*60*1000), 
            start_date: new Date(new Date(milestone.start_date).getTime() + 4*60*60*1000),
            billing_percentage: Number(milestone.billing_percentage),
          };
        });
        if(sortedMilestones.length > 0){
          setPlanningId(data.id);
          setMilestones(sortedMilestones);
        }
      
      }else{
        setMilestones([]);
      }

    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data, setMilestones]);

  useEffect(() => {
    if (updatedSuccessfully) {
      refetch();
      setSnackbarMessage("Planificación actualizada con éxito");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
    if (updateIsError) {
      setSnackbarMessage(updateError.data?.message);
      console.log(updateError);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [updatedSuccessfully, updateError, updateIsError, refetch]);


  useEffect(() => {
    console.log(user,"user",id);
    if(user){
      if(user.company.company_id != id){
        navigate(`/company/${user.company.company_id}`);
      }
        
  
        if(user.user_type !== "E" || new Date(formatDate( user.academic_period.planning_end_date)).getTime() < new Date().getTime()){
          navigate(`/company/${id}`);
        }
      
    }
    
  },[user,id,navigate]);
 
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

  return (
    <Box className="section-container">
      <BackBtn url={`/company/${id}`}/>
      <Container maxWidth="lg" sx={{ mb:6}}>
        <Box className="section-header" sx={{ mb:1 }}>
          <Typography component="h1" sx={{ fontSize: "40px", lineHeight: "1" }}>
            Planificación de grupo empresa
          </Typography>
        </Box>
        {user?.academic_period && (
          <Box sx={{display: "flex", gap: 1, alignItems: "center", mb: 4}}>
            <Typography fontWeight={"bold"}>Intervalo válido:</Typography>
            <Typography color="textSecondary" fontSize={15}>{new Date(now() + 24*60*60*1000).toLocaleDateString()} - {new Date(new Date(user.academic_period.evaluation_start_date).getTime() + 4*60*60*1000 - 24*60*60*1000).toLocaleDateString()}</Typography>
          </Box>
        )}
        
        
        <div className="milestones-list">
          {milestones.length > 0 ? (
            milestones.map((milestone, index) => (
              <Milestone key={index} milestone={milestone} />
            ))
          ) : (
            <p className="text-neutral-500">No hay hitos asignados</p>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={addMilestone}
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                color: "white",
                backgroundColor: "primary.main",
              },
              mr: 2,
              mb: 2,
            }}
          >
            Agregar Hito
          </Button>
        </div>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={isLoading || updateLoading}
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid black",
              color: "white",
              "&:hover": {
                transform: "scale(1.02)",
              },
              width: "200px",
            }}
          >
            {!planningId ? "Registrar planificación" : "Actualizar planificación"}
          </Button>
        </Box>
          
      </Container>
      <DialogMod
            open={open}
            setOpen={setOpen}
            title={"Confirmar"}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={handleConfirm}
            onCancel={() => setOpen(false)}
          />

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </Box>
    
  );
};

export default CompanyPlanning;

