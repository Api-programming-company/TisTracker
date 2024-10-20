import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMilestone, getStatus } from "../reducers/planningSlice";
import { setMilestones, confirmChanges } from "../reducers/planningSlice";
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Alert, Box } from "@mui/material";
import MilestoneItem from "../components/planning/MilestoneItem";
import { Button, Snackbar } from "@mui/material";
import DialogMod from "../components/DialogMod";

const PlanningSpreadSheet = () => {
  const { id } = useParams();
  const [open, setOpen] = useState({ state: false, message: "", title: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const dispatch = useDispatch();
  const milestone = useSelector(selectCurrentMilestone);
  const status = useSelector(getStatus);
  const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);


  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setMilestones(data.planning.milestones));
      // dispatch(setMilestones(planningSpreadsheet.planning.milestones));
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data, dispatch]);

  const handleConfirm = () => {
    console.log("confirm");
    setOpen({ ...open, state: false });
    //Si es el endpoint se envia correctamente hacer que se ejecute este bloque de codigo debajo
    dispatch(confirmChanges());
    setSnackbarMessage("Cambios guardados correctamente");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

  };

  useEffect(() => {
    if(status === "E"){
      window.onbeforeunload = (e) => { 
          e.preventDefault();
          return ;
      };
    }

    
  }, [status]);

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

  if (milestone) {
    return (
      <div id="planning_spreadsheet" className="container">
        <div className="section-header">
          <h1>Planilla de Seguimiento Semanal</h1>
        </div>
        <div className="section-body">
          <MilestoneItem milestone={milestone} />
          
          {status === "E" && <p className="text-red-500">Editando</p>}
          {status === "A" && <p className="text-success">Hito Validado</p>}  
      
        </div>

        <Box>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              border: "white",
            }}
            onClick={() =>
              setOpen({
                state: true,
                message: "Al presionar aceptar ya no podras realizar cambios en la validación de este hito",
                title: "¿Estas seguro que quieres confirmar?",
              })
            }
          >
            Confirmar
          </Button>
        </Box>
        <DialogMod
          open={open.state}
          setOpen={setOpen}
          title={open.title}
          content={open.message}
          onAccept={handleConfirm}
          onCancel={() => setOpen({ ...open, state: false })}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default PlanningSpreadSheet;
