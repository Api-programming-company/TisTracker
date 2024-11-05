import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import "../styles/set_final_period.css";
import {
  useGetAcademicPeriodByIdQuery,
  useUpdateAcademicPeriodByIdMutation,
} from "../api/academicPeriodApi";
import { useParams } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";
import moment from "moment-timezone";

const SetFinalDeliverablePeriod = () => {
  const { id } = useParams();
  const {
    data: periodData,
    isSuccess: isPeriodSuccess,
    isError: isPeriodError,
    isFetching: isPeriodFetching,
    error: periodError,
  } = useGetAcademicPeriodByIdQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isPeriodSuccess) {
      setStartDate(new Date(periodData.academic_period.start_date));
      setEndDate(new Date(periodData.academic_period.end_date));
    }
    if (isPeriodError) {
      console.log(periodError);
    }
  }, [isPeriodSuccess, isPeriodError, periodError, periodData]);

  const [
    updateAcademicPeriodById,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateAcademicPeriodByIdMutation();

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

      const clientTimezone = moment.tz.guess();
      console.log("Zona horaria del cliente:", clientTimezone);

      const startDateInClientTZ = moment
        .utc(startDate)
        .tz(clientTimezone)
        .format();
      const endDateInClientTZ = moment.utc(endDate).tz(clientTimezone).format();

      console.log(id, {
        start_date: startDateInClientTZ,
        end_date: endDateInClientTZ,
      });
      updateAcademicPeriodById({
        id,
        start_date: startDateInClientTZ,
        end_date: endDateInClientTZ,
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Periodo académico actualizado correctamente");
      setSnackbarOpen(true);
      setErrors({});
    }
    if (isUpdateError) {
      if (updateError?.status === 422) {
        setErrors(updateError.data.errors);
      } else {
        setErrors({});
        console.log(updateError);
        setSnackbarSeverity("error");
        setSnackbarMessage(updateError?.data?.message || "Error desconocido");
        setSnackbarOpen(true);
      }
    }
  }, [isUpdateError, isUpdateSuccess, updateError]);

  const findError = (name) => {
    const error = errors[name];
    return error;
  };

  if (isPeriodFetching || isUpdating) {
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
    <Box className="container" sx={{ p: 3 }}>
      <Box className="section-header" sx={{ mb: 3 }}>
        <Typography variant="h4">Ajustar periodo académico</Typography>
      </Box>
      <Box className="container-body">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box
            className="dates-input-container"
            sx={{ display: "flex", gap: 2, mb: 2 }}
          >
            <Box className="date-item">
              <DatePicker
                label="Fecha de inicio"
                value={startDate}
                onChange={handleStartDateChange}
                slotProps={{
                  textField: {
                    error: Boolean(errors.start_date),
                    helperText: errors.start_date,
                  },
                }}
                format="dd/MM/yyyy"
              />
            </Box>

            <Box className="date-item">
              <DatePicker
                label="Fecha de fin"
                value={endDate}
                onChange={handleEndDateChange}
                slotProps={{
                  textField: {
                    error: Boolean(errors.end_date),
                    helperText: errors.end_date,
                  },
                }}
                format="dd/MM/yyyy"
              />
            </Box>
          </Box>
        </LocalizationProvider>

        <Box className="flex-start" sx={{ display: "flex", gap: 1 }}>
          <Button
            disabled={isUpdating}
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              backgroundColor: "primary",
            }}
            onClick={() => setOpen(true)}
          >
            Guardar
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">
              Ajustar Periodo de Entrega Final
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">
                ¿Está seguro de realizar esta acción?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  onSubmit();
                  setOpen(false);
                }}
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default SetFinalDeliverablePeriod;
