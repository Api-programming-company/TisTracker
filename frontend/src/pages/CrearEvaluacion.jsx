import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Snackbar,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { useGetAllEvaluationTemplatesQuery } from "../api/evaluationApi";
import DialogMod from "../components/DialogMod";
import { useParams } from "react-router-dom";
import { useCreateAcademicPeriodEvaluationMutation } from "../api/academicPeriodEvaluationsApi";
import { format } from "date-fns";

const RegistroGE = () => {
  const navigate = useNavigate();
  const { academic_period_id } = useParams();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [plantillas, setPlantillas] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [opentoConfirm, setOpentoConfirm] = useState(false);

  const [selectedEvaluation, setSelectedEvaluation] = useState("");
  const [selectedPlantilla, setSelectedPlantilla] = useState("");
  const [selectedPlantillaId, setSelectedPlantillaId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);

  const { data, error, isFetching, isError, isSuccess } =
    useGetAllEvaluationTemplatesQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setPlantillas(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, error, isSuccess, isError]);

  const [
    createAcademicPeriodEvaluation,
    {
      isLoading: isCreatingEvaluation,
      isSuccess: isCreated,
      isError: isCreateError,
      data: createData,
      error: createError,
    },
  ] = useCreateAcademicPeriodEvaluationMutation();

  useEffect(() => {
    if (isCreated) {
      console.log(createData);
      setOpenConfirm(true);
    }
    if (isCreateError) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        createError.data?.message || "Error al crear la evaluación"
      );
      console.log(createError);
    }
  }, [createData, createError, isCreated, isCreateError]);

  const handleOpenDialog = (e) => {
    e.preventDefault();
    if (
      !selectedEvaluation ||
      !selectedPlantilla ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime
    ) {
      setSnackbarMessage("Todos los campos son obligatorios.");
      setSnackbarOpen(true);
      return;
    }

    if (!validateDates(startDate, endDate, startTime, endTime)) {
      return;
    }

    setOpentoConfirm(true);
  };

  const handleNavigate = (e) => {
    console.log("Creating");
    const evaluationMap = {
      Autoevaluación: "A",
      "Evaluación Cruzada": "C",
      "Evaluación de Pares": "U",
    };

    // Formatear las fechas con el desplazamiento horario
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedStartTime = format(
      new Date(
        startDate.setHours(startTime.getHours(), startTime.getMinutes())
      ),
      "yyyy-MM-dd'T'HH:mm:ssXXX",
      { timeZone }
    );
    const formattedEndTime = format(
      new Date(endDate.setHours(endTime.getHours(), endTime.getMinutes())),
      "yyyy-MM-dd'T'HH:mm:ssXXX",
      { timeZone }
    );

    const formData = {
      evaluation_id: selectedPlantillaId,
      academic_period_id: academic_period_id,
      evaluation_type: evaluationMap[selectedEvaluation],
      start_date: formattedStartTime,
      end_date: formattedEndTime,
    };
    console.log("Mis fechas");
    console.log(formData.start_date);
    console.log(formData.end_date);
    console.log(startDate);
    console.log(endDate);

    createAcademicPeriodEvaluation(formData);
  };

  const formatDate = (date, hour) => {
    if (!date || !hour) return;

    console.log(date, hour);
    const formattedDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hour.getHours(),
        hour.getMinutes(),
        hour.getSeconds()
      )
    );

    return formattedDate.toISOString();
  };

  const validateDates = (startDate, endDate, startTime, endTime) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate && endDate) {
      if (startDate < today) {
        setSnackbarMessage(
          "La fecha de inicio no puede ser anterior a la fecha actual."
        );
        setSnackbarOpen(true);
        setStartDateError(true);
        return false;
      }
      if (endDate < today) {
        setSnackbarMessage(
          "La fecha de fin no puede ser anterior a la fecha actual."
        );
        setSnackbarOpen(true);
        setEndDateError(true);
        return false;
      }
      if (startDate > endDate) {
        setSnackbarMessage(
          "La fecha de inicio no puede ser posterior a la fecha de fin."
        );
        setSnackbarOpen(true);
        setStartDateError(true);
        setEndDateError(true);
        return false;
      }

      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      if (startDate.getTime() === endDate.getTime()) {
        if (startTime && endTime) {
          const startHour = new Date(
            startDateTime.setHours(startTime.getHours(), startTime.getMinutes())
          );
          const endHour = new Date(
            endDateTime.setHours(endTime.getHours(), endTime.getMinutes())
          );

          if (startHour.getTime() === endHour.getTime()) {
            setSnackbarMessage(
              "La hora de inicio no puede ser la misma que la hora de fin."
            );
            setSnackbarOpen(true);
            setStartTimeError(true);
            return false;
          }
          if (startHour > endHour) {
            setSnackbarMessage(
              "La hora de inicio no puede ser mayor a la hora de fin."
            );
            setSnackbarOpen(true);
            setStartTimeError(true);
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const evaluations = [
    { id: 1, title: "Autoevaluación" },
    { id: 2, title: "Evaluación Cruzada" },
    { id: 3, title: "Evaluación de Pares" },
  ];

  if (isFetching || isCreatingEvaluation) {
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
    <Box
      sx={{
        mx: { xs: 3, sm: "auto" },
        mt: 12,
        mb: 10,
        maxWidth: 600,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 3 }}
      >
        Crear Evaluación
      </Typography>
      <form>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Seleccionar tipo de evaluación</InputLabel>
          <Select
            value={selectedEvaluation}
            onChange={(e) => setSelectedEvaluation(e.target.value)}
            label="Seleccionar tipo de evaluación"
          >
            {evaluations.map((evaluation) => (
              <MenuItem key={evaluation.title} value={evaluation.title}>
                {evaluation.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de plantillas */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Seleccionar Plantilla</InputLabel>
          <Select
            value={selectedPlantilla}
            onChange={(e) => {
              setSelectedPlantilla(e.target.value);
              const selectedPlantillaObj = plantillas.find(
                (plantilla) => plantilla.title === e.target.value
              );
              setSelectedPlantillaId(selectedPlantillaObj.id);
            }}
            label="Seleccionar Plantilla"
          >
            {plantillas.map((plantilla) => (
              <MenuItem key={plantilla.id} value={plantilla.title}>
                {plantilla.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Fecha de Inicio y Fecha Fin */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <DatePicker
                label="Fecha de Inicio"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setStartDateError(false);
                  setEndDateError(false);
                }}
                slotProps={{
                  textField: {
                    helperText: "DD/MM/AAAA",
                    fullWidth: true,
                    error: startDateError,
                  },
                }}
                format="dd/MM/yyyy"
              />
              <DatePicker
                label="Fecha de Fin"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  setStartDateError(false);
                  setEndDateError(false);
                }}
                slotProps={{
                  textField: {
                    helperText: "DD/MM/AAAA",
                    fullWidth: true,
                    error: endDateError,
                  },
                }}
                format="dd/MM/yyyy"
              />
            </Box>
          </LocalizationProvider>
        </FormControl>
        {/* Hora de Inicio y Hora Fin */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <TimePicker
                label="Hora de Inicio"
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                  setStartTimeError(false);
                }}
                slotProps={{
                  textField: {
                    helperText: "HH:MM",
                    fullWidth: true,
                    error: startTimeError,
                  },
                }}
                format="HH:mm"
              />
              <TimePicker
                label="Hora de Fin"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                  setEndTimeError(false);
                }}
                slotProps={{
                  textField: {
                    helperText: "HH:MM",
                    fullWidth: true,
                    error: endTimeError,
                  },
                }}
                fullWidth
                format="HH:mm"
              />
            </Box>
          </LocalizationProvider>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{ display: "block", mx: "auto", mt: 3, px: 12, py: 1 }}
        >
          Crear Evaluación
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      {/* Dialog de confirmación */}
      <DialogMod
        open={openConfirm}
        setOpen={setOpenConfirm}
        title={"Confirmación de creación"}
        content={"Se ha creado la evaluación correctamente"}
        onAccept={() => navigate("/")}
        onCancel={() => navigate("/")}
        showButtonCancel={false}
      />
      <DialogMod
        open={opentoConfirm}
        setOpen={setOpentoConfirm}
        title={"Crear Evaluación"}
        content={"¿Estás seguro de crear esta evaluación?"}
        onAccept={() => {
          handleNavigate();
          setOpentoConfirm(false);
        }}
        onCancel={() => setOpentoConfirm(false)}
      />
    </Box>
  );
};

export default RegistroGE;
