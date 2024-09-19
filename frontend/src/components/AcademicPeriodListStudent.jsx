import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Fab,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useGetAcademicPeriodsGroupedByTeacherQuery } from "../api/academicPeriodApi";

const formatDate = (date) => format(new Date(date), "dd MMM yyyy");

const AcademicPeriodListStudent = () => {
  const navigate = useNavigate();
  const { data: groupedPeriods = [], error, isLoading } = useGetAcademicPeriodsGroupedByTeacherQuery();
  const [openTeacher, setOpenTeacher] = useState({});

  const handleClick = () => {
    navigate("/registroperiodoacademico");
  };

  const handleToggleTeacher = (teacherName) => {
    setOpenTeacher((prev) => ({
      ...prev,
      [teacherName]: !prev[teacherName],
    }));
  };

  useEffect(() => {
    if (groupedPeriods) {
      console.log(groupedPeriods);
    }
    if (error) {
      console.log(error);
    }
  }, [error, groupedPeriods]);

  if (isLoading)
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Períodos Académicos
      </Typography>
      <Box>
        {groupedPeriods.map((teacher) => (
          <Box key={teacher.teacher_email} mb={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6">
                {teacher.teacher_name}
              </Typography>
              <IconButton
                onClick={() => handleToggleTeacher(teacher.teacher_name)}
              >
                <ExpandMoreIcon
                  sx={{
                    transform: openTeacher[teacher.teacher_name] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </IconButton>
            </Box>
            <Collapse in={openTeacher[teacher.teacher_name]}>
              <Box mt={2}>
                {teacher.academic_periods.map((period) => (
                  <Card key={period.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {period.name}
                      </Typography>
                      <Typography color="text.secondary">
                        Fecha de Inicio: {formatDate(period.start_date)}
                      </Typography>
                      <Typography color="text.secondary">
                        Fecha de Fin: {formatDate(period.end_date)}
                      </Typography>
                      {period.description && (
                        <Typography color="text.secondary">
                          Descripción: {period.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default AcademicPeriodListStudent;
