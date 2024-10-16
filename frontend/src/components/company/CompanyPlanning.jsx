import React, { useEffect, useState } from "react";
import { Box, Typography, List, Button, Snackbar, Alert } from "@mui/material";
import Milestone from "./Milestone";
import { useUpdateCompanyPlanningByIdMutation } from "../../api/companyApi";
import DialogMod from "../DialogMod";
import { CiCirclePlus } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import { useRegisterPlanningMutation } from "../../api/planningApi";
import { usePlanningContext } from "../../context/PlanningContext";
import "../../styles/planning_record.css";

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
    changeMilestones,
    checkErrors,
  } = usePlanningContext();
  const navigate = useNavigate();

  const [registerPlanning, { data, isSuccess, error, isError, isLoading }] =
    useRegisterPlanningMutation();

  const handleConfirm = () => {
    const form = { name: "planning", company_id: id, milestones: milestones };
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
    if (isSuccess) {
      setSnackbarMessage("Planificación registrada con éxito");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      navigate("/");
    }
    if (isError) {
      setSnackbarMessage(error.data?.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [data, isSuccess, error, isError, navigate]);

  return (
    <div className="container">
      <Typography component="h1" sx={{ fontSize: "40px", lineHeight: "1" }}>
        Planificación de equipo
      </Typography>
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
    </div>
  );
};

export default CompanyPlanning;
