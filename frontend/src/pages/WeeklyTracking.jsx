import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentMilestone,
  getStatus,
  getCurrentMilestoneIndex,
  getPendingMilestoneIndex,
} from "../reducers/planningSlice";
import { setMilestones, confirmChanges } from "../reducers/planningSlice";
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import { useUpdateCompanyPlanningByIdMutation } from "../api/companyApi";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Container, Alert, Box } from "@mui/material";
import { Button, Snackbar } from "@mui/material";
import DialogMod from "../components/DialogMod";
import AppContext from "../context/AppContext";
import TrackingMilestone from "../components/planning/TrackingMilestone";
const WeeklyTracking = () => {
    const { id } = useParams();
    const [open, setOpen] = useState({ state: false, message: "", title: "" });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const dispatch = useDispatch();
    const milestone = useSelector(selectCurrentMilestone);
    const status = useSelector(getStatus);
    const { user } = useContext(AppContext);
    const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);
    const { data, isSuccess, isFetching, isError, error } =
      useGetPlanningByCompanyIdQuery(id);
      
    const milestone_index = useSelector(getCurrentMilestoneIndex);
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
  
    useEffect(() => {
      if (isSuccess) {
        dispatch(setMilestones(data.planning.milestones));
        // dispatch(setMilestones(planningSpreadsheet.planning.milestones));
      }
    }, [isSuccess, isError, error, data, dispatch]);
  
    useEffect(() => {
      if(user.user_type === "E"){
        navigate("/")
      }
    },[navigate, user])
  
  
    const handleConfirm = () => {
      setOpen({ ...open, state: false });
      const milestonesData = data.planning.milestones.map((c_milestone, index) => {
        if (index === milestone_index) {
          return{
            ...milestone,
            status: "P",
          }
        }else{
          return c_milestone
        }
       });

       update({
        id,
        data: {
          milestones: milestonesData,
          company_id: data.planning.company_id,
        },
      });
    }
  
  
    useEffect(() => {
      window.onbeforeunload = (e) => {
        if (status === "E") {
          e.preventDefault();
          return;
        }
      };
    }, [status]);
  
    useEffect(() => {
      if (updatedSuccessfully) {
        dispatch(confirmChanges());
        setSnackbarMessage("Hito actualizado correctamente");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
      if (updateIsError) {
        console.log(updateError);
        setSnackbarMessage(updateError.data?.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }, [isSuccess, error, isError, updatedSuccessfully, updateIsError, dispatch, updateError]);
  
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
            <h1>Seguimiento Semanal</h1>
          </div>
          <div className="section-body">
            <TrackingMilestone milestone={milestone} />
            {status === "E" && <p className="text-red-500">Editando</p>}
            {status === "A" && <p className="text-success">Hito Validado</p>}
          </div>
  
          <Box>
            <Button
              variant="outlined"
              sx={{
                backgroundColor:
                  pendingMilestoneIndex !== milestone_index || updateLoading || status !== "E"
                    ? "info.gray"
                    : "primary.main",
                color: "white",
                border: "white",
              }}
              disabled={
                pendingMilestoneIndex !== milestone_index || updateLoading || status !== "E"
              }
              onClick={handleConfirm}
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
}

export default WeeklyTracking
