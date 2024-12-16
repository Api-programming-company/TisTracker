import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Snackbar, Alert, Container } from "@mui/material";
import Milestone from "./Milestone";
import DialogMod from "../DialogMod";
import { useParams, useNavigate } from "react-router-dom";
import { useRegisterPlanningMutation } from "../../api/planningApi";
import { usePlanningContext } from "../../context/PlanningContext";
import "../../styles/planning_record.css";
import BackBtn from "../navigation/BackBtn";
import { sortMilestones } from "../../utils/planningUtils";
import { useGetPlanningByCompanyIdQuery } from "../../api/planningApi";

const CompanyPlanning = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    milestones,
    setMilestones,
    addMilestone,
    checkErrors,
  } = usePlanningContext();
  const navigate = useNavigate();

  const { data, isSuccess, isFetching, isError, error } =
  useGetPlanningByCompanyIdQuery(id);

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
    if (!checkErrors()) {
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

      registerPlanning(form);
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
      setSnackbarMessage("Planificación registrada con éxito");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      navigate("/");
    }
    if (registerPlanningIsError) {
      setSnackbarMessage(registerPlanningError.data?.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [registerPlanningSuccess, registerPlanningError, navigate, registerPlanningIsError]);

 

  useEffect(() => {
    if (isSuccess) {
      const sortedMilestones = sortMilestones(data.planning.milestones).map((milestone) => {
        return {
          ...milestone,
          end_date: new Date(milestone.end_date),
          start_date: new Date(milestone.start_date),
        };
      });
      setMilestones(sortedMilestones);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data, setMilestones]);

  return (
    <Box className="section-container">
      <BackBtn url={`/company/${id}`}/>
      <Container maxWidth="lg" sx={{ mb:6}}>
        <Box className="section-header" sx={{ mb: 4 }}>
          <Typography component="h1" sx={{ fontSize: "40px", lineHeight: "1" }}>
            Planificación de grupo empresa
          </Typography>
        </Box>
        
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
            disabled={isLoading}
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
            Confirmar
          </Button>
        </Box>
        <div className="planning-btns-container">
          <DialogMod
            open={open}
            setOpen={setOpen}
            title={"Confirmar"}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={handleConfirm}
            onCancel={() => setOpen(false)}
          />
        </div>

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
      </Container>
      
    </Box>
  );
};

export default CompanyPlanning;
