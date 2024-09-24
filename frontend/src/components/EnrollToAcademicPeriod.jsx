import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import {
  useGetAcademicPeriodsGroupedByTeacherQuery,
  useEnrollInAcademicPeriodMutation,
} from "../api/academicPeriodApi";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const EnrollToAcademicPeriod = () => {
  const navigate = useNavigate();
  const { user, checkUser } = useContext(AppContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (user?.academic_period_id) {
      console.log("Ya está inscrito");
      navigate("/");
    }
  }, [user]);

  const {
    data: groupedPeriods = [],
    error,
    isSuccess,
    isError,
    isLoading,
  } = useGetAcademicPeriodsGroupedByTeacherQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(groupedPeriods);
    }
    if (isError) {
      console.log(error);
      setSnackbarMessage(error.data.message || "Error al obtener los períodos académicos");
      setSnackbarOpen(true);
    }
  }, [isSuccess, isError, error, groupedPeriods]);

  const [
    enrollInAcademicPeriod,
    {
      data: enrollData,
      error: enrollError,
      isSuccess: isEnrollSuccess,
      isError: isEnrollError,
      isLoading: isEnrollLoading,
    },
  ] = useEnrollInAcademicPeriodMutation();

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [academicPeriods, setAcademicPeriods] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  useEffect(() => {
    if (selectedTeacher) {
      const teacher = groupedPeriods.find(
        (teacher) => teacher.teacher_name === selectedTeacher
      );
      if (teacher) {
        setAcademicPeriods(teacher.academic_periods);
      }
    }
  }, [selectedTeacher, groupedPeriods]);

  useEffect(() => {
    if (isEnrollSuccess) {
      console.log(enrollData);
      setOpenSuccessDialog(true); // Mostrar diálogo de éxito
    }
    if (isEnrollError) {
      console.log(enrollError);
      setSnackbarMessage(enrollError.data.message || "Error al inscribirse");
      setSnackbarOpen(true);
    }
  }, [isEnrollSuccess, isEnrollError, enrollData, enrollError]);

  const handleInscribirse = () => {
    setOpenDialog(false);
    console.log(selectedPeriod);
    enrollInAcademicPeriod({ academic_period_id: selectedPeriod });
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    checkUser();
    navigate("/"); // Redirigir después de confirmar el éxito
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: { xs: 2, md: 4 },
        }}
      >
        Inscribirse a grupo TIS
      </Typography>

      {/* Selector de docentes */}
      <FormControl fullWidth sx={{ mb: 3 }} disabled={isEnrollLoading}>
        <InputLabel>Consultor TIS</InputLabel>
        <Select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          label="Seleccionar Docente"
        >
          {groupedPeriods.map((teacher) => (
            <MenuItem key={teacher.teacher_email} value={teacher.teacher_name}>
              {teacher.teacher_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Selector de periodos académicos */}
      {selectedTeacher && (
        <FormControl fullWidth sx={{ mb: 3 }} disabled={isEnrollLoading}>
          <InputLabel>Gestión</InputLabel>
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            label="Seleccionar Período Académico"
          >
            {academicPeriods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.name} - {period.start_date} a {period.end_date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Botón de Inscribirse */}
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedPeriod || isEnrollLoading}
        onClick={() => setOpenDialog(true)} // Abrir diálogo de confirmación
      >
        {isEnrollLoading ? <CircularProgress size={24} /> : "Inscribirse"}
      </Button>

      {/* Diálogo de Confirmación */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)} // Cerrar el diálogo al cancelar
      >
        <DialogTitle>Confirmar Inscripción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas inscribirte en el período académico
            seleccionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleInscribirse} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Éxito */}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
      >
        <DialogTitle>Inscripción Exitosa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Te has inscrito exitosamente en el período académico.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para errores */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default EnrollToAcademicPeriod;
