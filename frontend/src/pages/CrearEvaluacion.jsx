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

const RegistroGE = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [selectedEvaluation, setSelectedEvaluation] = useState("");
  const [selectedPlantilla, setSelectedPlantilla] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    console.log("Crear Evaluacion");
  });

  const handleNavigate = () => {
    alert("Se ha creado la evaluación correctamente");
    //navigate("/");
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

  const plantillas = [
    { id: 1, title: "Plantilla 1" },
    { id: 2, title: "Plantilla para Evaluación Cruzada" },
    { id: 3, title: "Autoevaluación" },
    { id: 4, title: "Plantilla de prueba" },
    { id: 5, title: "Plantilla 100" },
    { id: 6, title: "Evaluación de grupo empresas" },
  ];

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
        {/* Selector de docentes */}
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

        {/* Selector de docentes */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Seleccionar Plantilla</InputLabel>
          <Select
            value={selectedPlantilla}
            onChange={(e) => setSelectedPlantilla(e.target.value)}
            label="Seleccionar Plantilla"
          >
            {plantillas.map((plantilla) => (
              <MenuItem key={plantilla.title} value={plantilla.title}>
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
