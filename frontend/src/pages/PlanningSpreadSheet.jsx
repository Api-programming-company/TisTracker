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
import MilestoneItem from "../components/planning/MilestoneItem";
import { Button, Snackbar } from "@mui/material";
import DialogMod from "../components/DialogMod";
import AppContext from "../context/AppContext";
import BackBtn from "../components/navigation/BackBtn";
import { sortMilestones } from "../utils/planningUtils";


const PlanningSpreadSheet = () => {
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
  const { data, isSuccess, isFetching, isError, error,refetch } =
    useGetPlanningByCompanyIdQuery(id);
  const [userType, setUserType] = useState(user.user_type);
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
    if (isSuccess && data?.planning) {
      dispatch(setMilestones(data.planning.milestones));
      // dispatch(setMilestones(planningSpreadsheet.planning.milestones));
    }
  }, [isSuccess, isError, error, data, dispatch]);

  useEffect(() => {
    if(user && data?.planning){
      if(user.user_type === "E"){
        setUserType("E");
        if(data.planning.id !== Number(id)){
          navigate("/student-home");
        }
      }else{
        setUserType("D");
      }
    }
    
  },[navigate, user,id, data])


  const handleConfirm = () => {
    setOpen({ ...open, state: false });
    dispatch(confirmChanges());
    const carry_overs = milestone.deliverables.filter((deliverable) => {
      return deliverable.status === "C";
    })

    const form_carry_overs = carry_overs.map((carry_over, index) => {
      return {
        ...carry_over,
        id: null,
        status: "A",
        name: carry_over.name,
        expected_result: 0,
        actual_result: 0,
        createdBy: "D",
        observations: "",
      };
    })


    const sortedMilestones = sortMilestones(data.planning.milestones);
    const formData = sortedMilestones.map((t_milestone, index) => {
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
            ...form_carry_overs,
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
        company_id: data?.planning?.company_id,
      },
    });
  };

  useEffect(() => {
    window.onbeforeunload = (e) => {
      if (status === "E") {
        e.preventDefault();
        return;
      }
    };
  }, [status]);

  useEffect(() => {
    if (updatedSuccessfully && updateData) {
      refetch();
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
  }, [isSuccess, error, isError, updatedSuccessfully, updateIsError, dispatch, updateError,updateData]);

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
      <Box className="section-container">
        {data?.planning && <BackBtn url={`/company/${data.planning.company_id}`}/>}
        <Container maxWidth="lg">
          <Box className="section-container" sx={{ display: "flex", flexDirection: "column",gap: 4, marginBottom: 5}}>
            <div className="section-header">
              <h1>Planilla de Validación de Hito</h1>
            </div>
            <div className="section-body">
              <MilestoneItem milestone={milestone}/>

              {status === "E" && <p className="text-red-500">Editando</p>}
              {status === "A" && <p className="text-success">Hito Validado</p>}
            </div>

            <Box>
              {userType === "D" && (
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
              )}
              
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
          </Box>
        </Container>
      </Box>
    );
  }
};

export default PlanningSpreadSheet;
