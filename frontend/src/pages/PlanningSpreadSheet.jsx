import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMilestone } from '../reducers/planningSlice'
import { setMilestones } from '../reducers/planningSlice'
import { useGetPlanningByCompanyIdQuery } from "../api/planningApi";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Alert, Box } from "@mui/material";
import MilestoneItem from '../components/planning/MilestoneItem';
import { planningSpreadsheet } from '../mock_objects/planificacion';
import { Button, Snackbar } from '@mui/material'
import DialogMod from "../DialogMod";

const PlanningSpreadSheet = () => {

    const { id } = useParams();

    const [open, setOpen] = useState({state: true, message: ""});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const dispatch = useDispatch();

    const milestone = useSelector(selectCurrentMilestone);

    const {data,isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);


    const handleConfirm = () => {
      console.log("confirm");
    }

    useEffect(() => {
      if (isSuccess) {
        // dispatch(setMile stones(data.planning.milestones));
        dispatch(setMilestones(planningSpreadsheet.planning.milestones));
      }
      if (isError) {
        console.log(error);
      }
    }, [isSuccess, isError, error, data, dispatch]);

   useEffect(() => {
    window.onbeforeunload = confirmExit;
            function confirmExit()
            {
              return "show warning";
            }
   },[])
  
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

    if(milestone){
      return (
        <div id='planning_spreadsheet' className='container'>
          <div className="section-header">
            <h1>Planilla de Seguimiento Semanal</h1>
          </div>
          <div className="section-body">
            <MilestoneItem milestone={milestone}/>
          </div>
          <Box>
            <Button
              variant='outlined'
              sx={
                {
                  backgroundColor : 'primary.main',
                  color: 'white',
                  border: 'white',
                }
              }
            >Confirmar</Button>
          </Box>
          <DialogMod
            open={open.state}
            setOpen={setOpen}
            title={"Confirmar"}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={handleConfirm}
            onCancel={() => setOpen(false)}
      />

<Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
          
        </div>
      )
    }

  
}

export default PlanningSpreadSheet
