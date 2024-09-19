import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetAcademicPeriodsGroupedByTeacherQuery } from "../api/academicPeriodApi";
import { TeacherCard } from "./";

const AcademicPeriodListStudent = () => {
  const navigate = useNavigate();
  const {
    data: groupedPeriods = [],
    error,
    isLoading,
  } = useGetAcademicPeriodsGroupedByTeacherQuery();
  const [openTeacher, setOpenTeacher] = useState({});

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
      {groupedPeriods.map((teacher) => (
        <TeacherCard
          key={teacher.teacher_email}
          teacher={teacher}
          isOpen={openTeacher[teacher.teacher_name]}
          onToggle={() => handleToggleTeacher(teacher.teacher_name)}
        />
      ))}
    </Container>
  );
};

export default AcademicPeriodListStudent;
