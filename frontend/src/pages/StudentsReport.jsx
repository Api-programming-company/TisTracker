import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Container, CircularProgress, Typography } from "@mui/material";
import GridComponent from "../components/GridComponent";
import { downloadCsv } from "../utils/toCsv";
import { useGetGradesQuery } from "../api/userApi";
import { useParams } from "react-router-dom";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import ReportTemplate from "../components/ReportTemplate";


const formatGradesData = (grades) => {
    return grades.map((grade) => {
      const autoevaluacion = grade.company.auto_evaluation_score;
      const cruzada = grade.company.cross_evaluation_score;
      const pares = grade.pares;                         
      const planificacion = grade.company.planning_evaluation_score || Math.floor(Math.random() * 101);

      const totalEvaluations = Math.round(
        (autoevaluacion + pares + cruzada) / 3
      );
      const total = Math.round(
        (totalEvaluations * 40) / 100 + (planificacion * 60) / 100
      );
  
      return {
        id: grade.id,
        nombre: grade.nombre,
        apellidos: grade.apellidos,
        autoevaluacion,
        cruzada,
        pares,
        planificacion,
        evaluaciones: totalEvaluations,
        total,
      };
    });
  };

const StudentsReport = () => {

    const targetRef = useRef();
    const { id } = useParams();
  const {
    data: grades,
    error: gradesError,
    isFetching: isGradesFetching,
    isSuccess: isGradesSucess,
    isError: isGradesError,
  } = useGetGradesQuery({academic_period_id:id, limit:5});

  useEffect(() => {
    if (isGradesSucess) {
      console.log(grades);
      const formattedData = formatGradesData(grades.grades); // Formatear los datos
      setFinalData(formattedData); // Establecer los datos formateados
      console.log(formattedData);
    }
    if (isGradesError) {
      console.error(gradesError);
    }
  }, [grades, gradesError, isGradesSucess, isGradesError]);

  //booleano para ver si los datos estan listos para mostrarse
  const [finalData, setFinalData] = useState([]);

  if (isGradesFetching) {
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
    <ReportTemplate data={finalData} title={"Reporte de calificaciones de estudiante"} filename={"calificaciones_de_estudiantes"}/>
  );
};

export default StudentsReport;
