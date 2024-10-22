import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { set, format } from "date-fns";
import { useParams } from "react-router-dom";
import { useCreateAcademicPeriodEvaluationMutation } from "../api/academicPeriodEvaluationsApi";

const RegistroGE = () => {
  const navigate = useNavigate();
  const { academic_period_id } = useParams();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [plantillas, setPlantillas] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [selectedEvaluation, setSelectedEvaluation] = useState("");
  const [selectedPlantilla, setSelectedPlantilla] = useState("");
  const [selectedPlantillaId, setSelectedPlantillaId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { data, error, isFetching, isError, isSuccess } =
    useGetAllEvaluationTemplatesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
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
      setConfirmationOpen(true);
      console.log(createData);
    }
    if (isCreateError) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        createError.data?.message || "Error al crear la evaluación"
      );
      console.log(createError);
    }
  }, [createData, createError, isCreated, isCreateError]);

  const handleNavigate = async (e) => {
    e.preventDefault();
    const evaluationMap = {
      Autoevaluación: "A",
      "Evaluación Cruzada": "C",
      "Evaluación de Pares": "U",
    };

    // Formatear las fechas con el desplazamiento horario
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedStartTime = format(
      new Date(startTime),
      "yyyy-MM-dd'T'HH:mm:ssXXX",
      { timeZone }
    );
    const formattedEndTime = format(
      new Date(endTime),
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
    console.log(formData);
    createAcademicPeriodEvaluation(formData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const evaluations = [
    { id: 1, title: "Autoevaluación" },
    { id: 2, title: "Evaluación Cruzada" },
    { id: 3, title: "Evaluación de Pares" },
  ];

  if (isFetching || isCreatingEvaluation) {
    return <Typography>Cargando...</Typography>;
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
      <form onSubmit={handleNavigate}>
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
              <MenuItem
                key={plantilla.id}
                value={plantilla.title}
                title={plantilla.title}
              >
                {plantilla.title.length > 50
                  ? `${plantilla.title.substring(0, 50)}...`
                  : plantilla.title}
              </MenuItem>
            ))}{" "}
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
                slotProps={{
                  textField: {
                    helperText: "DD/MM/AAAA",
                    fullWidth: true,
                  },
                }}
                format="dd/MM/yyyy"
              />
              <DatePicker
                label="Fecha de Fin"
                slotProps={{
                  textField: {
                    helperText: "DD/MM/AAAA",
                    fullWidth: true,
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
                onChange={(e) => setStartTime(e)}
                slotProps={{
                  textField: {
                    helperText: "HH:MM",
                    fullWidth: true,
                  },
                }}
                format="HH:mm"
              />
              <TimePicker
                label="Hora de Fin"
                value={endTime}
                onChange={(e) => setEndTime(e)}
                slotProps={{
                  textField: {
                    helperText: "HH:MM",
                    fullWidth: true,
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
      <Dialog
        open={confirmationOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Registro exitoso"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La Evaluación se ha creado correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegistroGE;
