import React, { useEffect, useState } from "react";
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
  const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);
  const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);
  const milestone_index = useSelector(getCurrentMilestoneIndex);
  const [
    update,
    {
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

  const handleConfirm = () => {
    setOpen({ ...open, state: false });
    dispatch(confirmChanges());
    const formData = data.planning.milestones.map((t_milestone, index) => {
      if (index === milestone_index) {
        return {
          ...milestone,
          status: "A",
        };
      } else if (index === milestone_index + 1) {
        return {
          ...t_milestone,
          deliverables: [
            ...t_milestone.deliverables,
            ...milestone.deliverables
              .filter((deliverable, i) => {
                return deliverable.status === "C";
              })
              .map((newDeliverable, index) => {
                return {
                  ...newDeliverable,
                  id: index + t_milestone.deliverables.length,
                  status: "A",
                  name: newDeliverable.name,
                  expected_result: 0,
                  actual_result: 0,
                  observations: "",
                };
              }),
          ],
        };
      }
      return t_milestone;
    });
    console.log("dataaa", {
      id,
      data: {
        milestones: formData,
        company_id: data.planning.company_id,
      },
    });

    update({
      id,
      data: {
        milestones: formData,
        company_id: data.planning.company_id,
      },
    });
  };

  useEffect(() => {
    console.log(status, "");
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
      setSnackbarMessage("Hito validado correctamente");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
    if (updateIsError) {
      console.log(updateError);
      setSnackbarMessage(updateError.data?.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [isSuccess, error, isError, updatedSuccessfully, updateIsError]);

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
            disabled={
              pendingMilestoneIndex !== milestone_index || updateLoading
            }
            onClick={() =>
              setOpen({
                state: true,
                message:
                  "Al presionar aceptar ya no podras realizar cambios en la validación de este hito",
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
