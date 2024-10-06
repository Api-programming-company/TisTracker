import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "../styles/set_final_period.css";
import DialogMod from "../components/DialogMod";
import {
  useGetAcademicPeriodByIdQuery,
  useUpdateAcademicPeriodByIdMutation,
} from "../api/academicPeriodApi";
import { useParams } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";

const SetFinalDeliverablePeriod = () => {
  const { id } = useParams();
  const {
    data: periodData,
    isSuccess: isPeriodSuccess,
    isError: isPeriodError,
    isFetching: isPeriodFetching,
    error: periodError,
  } = useGetAcademicPeriodByIdQuery(id);

  useEffect(() => {
    if (isPeriodSuccess) {
      console.log(periodData);
      setStartDate(new Date(periodData.academic_period.start_date));
      setEndDate(new Date(periodData.academic_period.end_date));
    }
    if (isPeriodError) {
      console.log(periodError);
    }
  }, [isPeriodSuccess, isPeriodError, periodError]);

  const [
    updateAcademicPeriodById,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateAcademicPeriodByIdMutation();

  useEffect(() => {
    if (isUpdateSuccess) {
      console.log("Periodo de entrega final ajustado con exito");
    }
    if (isUpdateError) {
      console.log(updateError);
    }
  }, [isUpdateSuccess, isUpdateError, updateError]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      start_date: undefined,
    }));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      end_date: undefined,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = () => {
    if (!startDate || !endDate) {
      setErrors({
        start_date: startDate ? undefined : "La fecha de inicio es requerida",
        end_date: endDate ? undefined : "La fecha de fin es requerida",
      });
    } else if (endDate < startDate) {
      setErrors({
        end_date:
          "La fecha de fin debe ser mayor o igual que la fecha de inicio",
      });
    } else {
      //sucess
      console.log({id, data: { start_date: startDate, end_date: endDate }});
      updateAcademicPeriodById({id, data: { start_date: startDate, end_date: endDate }});
      setSnackbarMessage("Periodo de entrega final ajustado con exito");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
    setOpen(false);
  };

  const findError = (name) => {
    const error = errors[name];
    return error;
  };

  if (isUpdating || isPeriodFetching) {
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

  if (isPeriodError) {
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
          {periodError?.data?.message || "Error desconocido"}
        </Alert>
      </Container>
    );
  }

  return (
    <div className="container">
      <div className="section-header">
        <h1>Ajustar periodo de entrega final</h1>
      </div>
      <div className="container-body">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="dates-input-container">
            <div className="date-item">
              <DatePicker
                label="Fecha de inicio"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {findError("start_date") && (
                <p className="text-red-300 text-sm">
                  {findError("start_date")}
                </p>
              )}
            </div>

            <div className="date-item">
              <DatePicker
                label="Fecha de fin"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {findError("end_date") && (
                <p className="text-red-300 text-sm">{findError("end_date")}</p>
              )}
            </div>
          </div>
        </LocalizationProvider>
        <div className="flex-start">
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            }}
            type="submit"
            onClick={() => setOpen(true)}
          >
            Guardar
          </Button>
          <DialogMod
            open={open}
            setOpen={setOpen}
            title={"Ajustar Periodo de Entrega Final"}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={() => {
              onSubmit();
              // deleteMilestone(milestone.id)
            }}
            onCancel={() => setOpen(false)}
          />
        </div>
      </div>
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

export default SetFinalDeliverablePeriod;
