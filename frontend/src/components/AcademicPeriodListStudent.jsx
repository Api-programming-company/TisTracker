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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetAcademicPeriodsGroupedByTeacherQuery,
  useEnrollInAcademicPeriodMutation,
} from "../api/academicPeriodApi";

const AcademicPeriodListStudent = () => {
  const {
    data: groupedPeriods = [],
    error,
    isLoading,
  } = useGetAcademicPeriodsGroupedByTeacherQuery();

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
    }
    if (isEnrollError) {
      console.log(enrollError);
    }
  }, [isEnrollSuccess, isEnrollError, enrollData, enrollError]);

  const handleInscribirse = () => {
    setOpenDialog(false); // Cerrar el diálogo
    console.log(selectedPeriod);
    enrollInAcademicPeriod({ academic_period_id: selectedPeriod });
  };

  if (isLoading || isEnrollLoading)
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

  if (error || enrollError) {
    const errorMessage = error
      ? error.data.message
      : enrollError
      ? enrollError.data.message
      : "";

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {errorMessage}
        </Typography>
      </Container>
    );
  }

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
      <FormControl fullWidth sx={{ mb: 3 }}>
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
        <FormControl fullWidth sx={{ mb: 3 }}>
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
        disabled={!selectedPeriod}
        onClick={() => setOpenDialog(true)} // Abrir diálogo de confirmación
      >
        Inscribirse
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
    </Container>
  );
};

export default AcademicPeriodListStudent;
